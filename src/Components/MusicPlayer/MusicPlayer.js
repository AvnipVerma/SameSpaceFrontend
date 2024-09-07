import React, { useRef, useState, useEffect } from 'react';
import styles from './MusicPlayer.module.css';
import previousIcon from "../../assets/previous.png";
import playIcon from "../../assets/play.png";
import pauseIcon from "../../assets/pause.png"; // Added pause icon
import nextIcon from "../../assets/next.png";
import speakerIcon from "../../assets/speaker.png";
import speakermute from "../../assets/speakermute.png"; // Mute icon
import dotss from "../../assets/dotss.png";

const MusicPlayer = ({ currentSong, songs, onSongSelect, className }) => {
  const audioRef = useRef(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Update audio source when currentSong changes
  useEffect(() => {
    if (currentSong && currentSong.url) {
      audioRef.current.src = currentSong.url;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }

      // Update background gradient
      document.body.style.background = `url(https://cms.samespace.com/assets/${currentSong.cover}) no-repeat center center fixed`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [currentSong, isPlaying]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      audioRef.current.pause();
    };
  }, []);

  // Update progress
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current.duration) {
        setProgress(
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        );
      }
    };
    audioRef.current.addEventListener('timeupdate', updateProgress);
    return () => {
      audioRef.current.removeEventListener('timeupdate', updateProgress);
    };
  }, []);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    onSongSelect(songs[nextIndex]);
  };

  const handlePrevious = () => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = (currentIndex - 1 + songs.length) % songs.length;
    onSongSelect(songs[prevIndex]);
  };

  const handleSeek = (e) => {
    const seekTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const handleMute = () => {
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <div className={`${styles.musicPlayer} ${className}`}>
      
      <div className={styles.artist}>{currentSong.artist}</div>
      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt="cover"
        className={styles.cover}
      />
      <div className={styles.title}>{currentSong.title}</div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        className={styles.seeker}
        onChange={handleSeek}
      />
      <div className={styles.controls}>
        <button className={styles.controlButton}>
          <img src={dotss} className={styles.dotss} />
        </button>
        <div className={styles.container222}>
          <button onClick={handlePrevious} className={styles.controlButton}>
            <img src={previousIcon} alt="Previous" className={styles.icon} />
          </button>
          <button onClick={handlePlayPause} className={styles.controlButton}>
            <img
              src={isPlaying ? pauseIcon : playIcon} // Toggle between play and pause icons
              alt={isPlaying ? 'Pause' : 'Play'}
              className={styles.pausee}
            />
          </button>
          <button onClick={handleNext} className={styles.controlButton}>
            <img src={nextIcon} alt="Next" className={styles.icon} />
          </button>
        </div>
        <button onClick={handleMute} className={styles.controlButton}>
          <img
            src={isMuted ? speakermute : speakerIcon} // Toggle between speaker and mute icons
            alt={isMuted ? 'Unmute' : 'Mute'}
            className={styles.muteeee}
          />
        </button>
      </div>
   
     

    </div>
  );
};

export default MusicPlayer;
