import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, className }) => {
  const handleSearchInput = (e) => {
    console.log("Input Value:", e.target.value); // Log input value to check if it's captured
    onSearch(e.target.value);
  };

  return (
    <div className={`${styles.searchContainer} ${className}`}>
      <input
        type="text"
        className={styles.searchBar}
        placeholder="Search by Artist"
        onChange={handleSearchInput} // Trigger handleSearchInput on change
      />
    </div>
  );
};

export default SearchBar;
