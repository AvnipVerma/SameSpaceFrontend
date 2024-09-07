import React, { useState, useEffect } from 'react';
import SongList from '../../Components/SongList/SongList';
import MusicPlayer from '../../Components/MusicPlayer/MusicPlayer';
import SearchBar from '../../Components/SearchBar/SearchBar';
import Tabs from '../../Components/Tabs/Tabs';
import { fetchSongs } from '../../Services/api';
import styles from "./Homepage.module.css";
import spotify from "../../assets/spotify.png";
import cross from "../../assets/cross.png";

const HomePage = () => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [activeTab, setActiveTab] = useState('For You');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // State for drawer

  // Fetch songs and auto-select the first song
  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongs();
      setSongs(data);
      setFilteredSongs(data);
      if (data.length > 0) {
        setCurrentSong(data[0]); // Auto-select the first song
      }
    };
    loadSongs();
  }, []);

  // Handle search functionality (by artist only)
  const handleSearch = (query) => {
    setSearchQuery(query); // Update the search query state
    console.log("Search Query:", query); // Log the search query to ensure it is captured
    if (query) {
      const filtered = songs.filter(song =>
        song.artist && song.artist.toLowerCase().includes(query.toLowerCase()) // Check if song.artist exists
      );
      console.log("Filtered Songs:", filtered); // Log filtered songs to check if filtering works
      setFilteredSongs(filtered);
    } else {
      setFilteredSongs(songs); // Reset to all songs if query is empty
    }
  };
  
  

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    filterSongs(searchQuery, tab);
  };

  // Filter songs based on active tab (and artist search)
  const filterSongs = (query, tab) => {
    let filtered = songs;

    if (tab === 'Top Tracks') {
      filtered = filtered.filter((song) => song.isTopTrack);
    }

    if (query) {
      filtered = filtered.filter((song) =>
        song.artist && song.artist.toLowerCase().includes(query.toLowerCase())
      );
    }

    setFilteredSongs(filtered);
  };

  // Handle song selection
  const handleSongSelect = (song) => {
    setCurrentSong(song);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.homePage}>
        <div className={styles.container2}>
          <img src={spotify} className={styles.spotify} alt="Spotify Logo" />
          <Tabs activeTab={activeTab} onTabChange={handleTabChange} className={styles.buttons} />
        </div>

        <button className={styles.upnext} onClick={toggleDrawer}>UP NEXT</button>

        <div className={`${styles.drawer} ${isDrawerOpen ? styles.open : ''}`}>
          <img src={cross} className={styles.cross} alt="Close Drawer" onClick={closeDrawer} />
          <SongList songs={filteredSongs} onSongSelect={handleSongSelect} />
        </div>

        <div className={styles.playlistWrapper}>
          <div className={styles.contain}>
            <SearchBar onSearch={handleSearch} className={styles.searchBar} />

            <SongList songs={filteredSongs} onSongSelect={handleSongSelect} className={styles.playlist} />
          </div>
          {currentSong && (
            <MusicPlayer
              currentSong={currentSong}
              songs={filteredSongs}
              onSongSelect={handleSongSelect}
              className={styles.musicplayer}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
