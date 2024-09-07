import React from 'react';
import styles from './SongList.module.css';

const SongList = ({ songs, onSongSelect, className }) => {
  return (
    <div className={`${styles.songList} ${className}`}>
      {songs.length > 0 ? (
        songs.map((song) => (
          <div
            key={song.id}
            className={styles.songItem}
            onClick={() => onSongSelect(song)}
          >
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.title}
              className={styles.songCover}
            />
            <div className={styles.songInfo}>
              <div>{song.title}</div>
              <div>{song.artist}</div>
            </div>
            <div className={styles.songDuration}>{song.duration}</div>
          </div>
        ))
      ) : (
        <div className={styles.noResults}>No songs found</div>
      )}
    </div>
  );
};

export default SongList;
