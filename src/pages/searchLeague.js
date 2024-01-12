import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '~/components/layout';
import LeagueCard from '~/components/leagueCard';
import Input from '~/components/input';
import DropDown from '~/components/dropDown';
import search from '~/images/leagueCard/search.png';
import styles from '~/styles/searchLeague.module.css';
import {
  getPublishLeagueByPage,
  searchLeagueByName,
  sortLeagueByName,
  sortLeague,
} from '~/apiServices/leagueService';
import HttpStatus from '~/constants/httpStatusCode';

const SearchLeague = () => {
  const navigate = useNavigate();

  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [leagues, setLeagues] = useState([]);
  const [searchTeam, setsearchTeam] = useState('');
  const [formatFilter, setFormatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const fetchLeagues = async (page) => {
    try {
      const response = await getPublishLeagueByPage(page - 1);
      if (response.status === HttpStatus.OK) {
        console.log('Get all publish league successfully!!');
        setLeagues(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        console.log('Unexpected server error!!');
      }
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  useEffect(() => {
    fetchLeagues(currentPage);
  }, []); //fetching first page of league when page loaded

  const sort = async (sortBy, isDESC) => {
    try {
      const response = await sortLeague(sortBy, isDESC);

      if (response.status === HttpStatus.OK) {
        setLeagues(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        console.log('Unexpected server error!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const searchLeague = async (searchTeam) => {
    try {
      const response = await searchLeagueByName(searchTeam);

      if (response.status === HttpStatus.OK) {
        setLeagues(response.data.content);
        setTotalPages(response.data.totalPages);
      } else {
        console.log('Unexpected server error!!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setsearchTeam(searchValue);
    searchLeague(searchValue);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    fetchLeagues(newPage); //because we have already minus 1 for the currentPage when calling it
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
    if (selectedSortBy === 'League Name') {
      sort('name', false);
      setCurrentPage(1);
    } else if (selectedSortBy === 'Latest Date') {
      sort('startTime', true);
      setCurrentPage(1);
    } else if (selectedSortBy === 'Oldest Date') {
      sort('startTime', false);
      setCurrentPage(1);
    } else {
      sort('');
      setCurrentPage(1);
    }
  };

  // const sortedLeagues = [...filteredLeagues].sort((a, b) => {
  //   if (sortBy === 'League Name') {
  //     return a.name.localeCompare(b.name);
  //   } else if(sortBy === 'Latest Date') {
  //     const dateA = new Date(a.startTime);
  //     const dateB = new Date(b.startTime);

  //     if (dateA < dateB) return -1;
  //     else if (dateA > dateB) return 1;
  //     else return 0;
  //   } else{
  //     const dateA = new Date(a.startTime);
  //     const dateB = new Date(b.startTime);

  //     if (dateA < dateB) return 1;
  //     else if (dateA > dateB) return -1;
  //     else return 0;
  //   }
  //   // // Add other sorting options if needed
  // });

  // const totalLeagues = sortedLeagues.length;
  // const totalPages = Math.ceil(totalLeagues / pageSize);
  // const paginatedLeagues = sortedLeagues.slice(
  //   (currentPage - 1) * pageSize,
  //   currentPage * pageSize,
  // );

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
                  placeholder="Search by League Name"
                  value={searchTeam}
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
                options={[
                  '',
                  'KNOCKOUT',
                  'ROUND_ROBIN',
                  'KNOCKOUT_WITH_ROUND_ROBIN',
                ]}
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
              {leagues.map((league, index) => (
                <LeagueCard
                  key={index}
                  leagueName={league.name}
                  competitionFormat={league.competitionType}
                  location={league.location}
                  profileSrc={league.image}
                  status={league.enrollmentOpen.toString()}
                  numOfTeams={league.maxTeams}
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
