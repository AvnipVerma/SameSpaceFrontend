import React from 'react';
import styles from './Tabs.module.css';

const Tabs = ({ activeTab, onTabChange, className }) => {
  const tabs = ['For You', 'Top Tracks'];

  return (
    <div className={`${styles.tabs} ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tabButton} ${
            activeTab === tab ? styles.active : ''
          }`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
