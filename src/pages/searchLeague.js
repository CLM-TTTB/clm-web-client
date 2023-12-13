// SearchLeague.jsx
import React, { useState } from 'react';
import styles from '../styles/searchLeague.module.css';
import Layout from '~/components/layout';
import LeagueCard from '~/components/leagueCard';
import Input from '~/components/input';
import DropDown from '~/components/dropDown'; // Import the Dropdown component
import search from '~/images/leagueCard/search.png';

const SearchLeague = () => {
  // Number of leagues per page
  const pageSize = 12;

  // For testing
  const generateLeagues = (count) => {
    const leagues = [];

    for (let i = 1; i <= count; i++) {
      leagues.push({
        leagueName: `League ${i}`,
        competitionFormat: `Format ${i}`,
        location: `Location ${i}`,
        profileSrc: `~/images/leagueCard/avatar${i}.png`,
        status: 'closed'
      });
    }

    return leagues;
  };

  // Set initial league array
  const initialLeagues = generateLeagues(14);

  // State for managing leagues, search term, current page, and filters
  const [leagues, setLeagues] = useState(initialLeagues);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [formatFilter, setFormatFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  // Function to handle search input changes
  const handleSearch = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Function to handle page changes
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Function to handle Format filter changes
  const handleFormatChange = (selectedFormat) => {
    setFormatFilter(selectedFormat);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Function to handle Status filter changes
  const handleStatusChange = (selectedStatus) => {
    setStatusFilter(selectedStatus);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Function to handle Sort by changes
  const handleSortByChange = (selectedSortBy) => {
    setSortBy(selectedSortBy);
    setCurrentPage(1); // Reset to the first page when changing filters
  };

  // Filtering logic based on search term, Format, and Status
  const filteredLeagues = leagues.filter((league) => {
    const formatFilterMatch =
      formatFilter === '' || league.competitionFormat.toLowerCase() === formatFilter.toLowerCase();
  
    const statusFilterMatch =
      statusFilter === '' || league.status.toLowerCase() === statusFilter.toLowerCase();
  
    return (
      (league.leagueName.toLowerCase().includes(searchTerm) ||
        league.location.toLowerCase().includes(searchTerm)) &&
      formatFilterMatch &&
      statusFilterMatch
    );
  });

  // Sorting logic based on Sort by option
  const sortedLeagues = [...filteredLeagues].sort((a, b) => {
    if (sortBy === 'League Name') {
      return a.leagueName.localeCompare(b.leagueName);
    } else if (sortBy === 'Latest Date') {
      // Implement sorting by date logic if your league objects have a 'date' property
      // return new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'Oldest Date') {
      // Implement sorting by date logic if your league objects have a 'date' property
      // return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });

  // Total number of leagues after filtering
  const totalLeagues = sortedLeagues.length;

  // Total number of pages based on page size
  const totalPages = Math.ceil(totalLeagues / pageSize);

  // Get the leagues for the current page
  const paginatedLeagues = sortedLeagues.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // JSX for rendering the component
  return (
    <>
      <Layout>
        <hr className={styles.horizontalLine} />
        <div className={styles.createLeagueForm}>
          <h1 className={styles.title}>Create League</h1>
          <div className={styles.container}>
            <div className={styles.filterContainer}>
            <div className={styles.searchBar}>
              {/* Search Input */}
              <Input
                type="text"
                placeholder="Search by League Name or Location"
                value={searchTerm}
                onChange={handleSearch}
              />
              <img className={styles.searchIcon} src={search} alt="Search Icon" />

            </div>

            {/* Dropdowns for Format, Status, and Sort by */}
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


            {/* Displaying leagues on the grid */}
            <div className={styles.leagueGrid}>
              {paginatedLeagues.map((league, index) => (
                <LeagueCard
                  key={index}
                  leagueName={league.leagueName}
                  competitionFormat={league.competitionFormat}
                  location={league.location}
                  profileSrc={league.profileSrc}
                />
              ))}
            </div>

            {/* Pagination */}
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
              <div><span>{`Page ${currentPage} of ${totalPages}`}</span></div>
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
