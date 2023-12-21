import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '~/components/layout';
import LeagueCard from '~/components/leagueCard';
import Input from '~/components/input';
import DropDown from '~/components/dropDown';
import search from '~/images/leagueCard/search.png';
import styles from '~/styles/searchLeague.module.css';

const SearchLeague = () => {
  const navigate = useNavigate();
  const pageSize = 12;

  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        // Replace the following with your actual API call
        const response = await fetch(`/mockData/leagues.json`);
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the fetched data
        setLeagues(data);
      } catch (error) {
        console.error('Error fetching leagues:', error);
      }
    };

    fetchLeagues();
  }, []);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formatFilter, setFormatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFormatChange = (selectedFormat) => {
    setFormatFilter(selectedFormat);
    setCurrentPage(1);
  };

  const handleStatusChange = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    setCurrentPage(1);
  };

  const handleSortByChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
    setCurrentPage(1);
  };

  const filteredLeagues = leagues.filter((league) => {
    const formatFilterMatch =
      formatFilter === '' ||
      league.competitionFormat.toLowerCase() === formatFilter.toLowerCase();

    const statusFilterMatch =
      statusFilter === '' ||
      (league.status &&
        league.status.toLowerCase().includes(statusFilter.toLowerCase()));

    const searchTermMatch =
      league.leagueName.toLowerCase().includes(searchTerm) ||
      league.location.toLowerCase().includes(searchTerm);

    console.log('Format Filter Match:', formatFilterMatch);
    console.log('Status Filter Match:', statusFilterMatch);
    console.log('Search Term Match:', searchTermMatch);

    return searchTermMatch && formatFilterMatch && statusFilterMatch;
  });

  const sortedLeagues = [...filteredLeagues].sort((a, b) => {
    if (sortBy === 'League Name') {
      return a.leagueName.localeCompare(b.leagueName);
    }
    // Add other sorting options if needed
    return 0;
  });

  const totalLeagues = sortedLeagues.length;
  const totalPages = Math.ceil(totalLeagues / pageSize);
  const paginatedLeagues = sortedLeagues.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleDetail = (leagueId) => {
    navigate(`/league/${encodeURIComponent(leagueId)}`);
  };

  return (
    <>
      <Layout>
        <hr className={styles.horizontalLine} />
        <div className={styles.createLeagueForm}>
          <h1 className={styles.title}>Search League</h1>
          <div className={styles.container}>
            <div className={styles.filterContainer}>
              <div className={styles.searchBar}>
                <Input
                  type="text"
                  placeholder="Search by League Name or Location"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <img
                  className={styles.searchIcon}
                  src={search}
                  alt="Search Icon"
                />
              </div>

              <DropDown
                label="Format"
                options={['', 'Knock-out', 'Round Robin', 'Mixed']}
                onChange={handleFormatChange}
                value={formatFilter}
              />
              <DropDown
                label="Status"
                options={['', 'Opening', 'Closed']}
                onChange={handleStatusChange}
                value={statusFilter}
              />
              <DropDown
                label="Sort by"
                options={['', 'League Name', 'Latest Date', 'Oldest Date']}
                onChange={handleSortByChange}
                value={sortBy}
              />
            </div>

            <div className={styles.leagueGrid}>
              {paginatedLeagues.map((league, index) => (
                <LeagueCard
                  key={index}
                  leagueName={league.leagueName}
                  competitionFormat={league.competitionFormat}
                  location={league.location}
                  profileSrc={league.profileSrc}
                  status={league.status}
                  onDetailClick={() =>
                    handleDetail(league.id ? league.id.toString() : '')
                  }
                />
              ))}
            </div>

            <div className={styles.pagination}>
              <div>
                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Previous
                </button>
              </div>
              <div>
                <span>{`Page ${currentPage} of ${totalPages}`}</span>
              </div>
              <div>
                <button
                  className={styles.pageButton}
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default SearchLeague;
