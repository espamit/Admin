import React from 'react';

const Sidebar = ({ setActiveSection }) => {
  return (
    <aside style={styles.sidebar}>
      <ul style={styles.list}>
        <li style={styles.listItem} onClick={() => setActiveSection('home')}>
          Home
        </li>
        <li style={styles.listItem} onClick={() => setActiveSection('setplan')}>
          Set Plan
        </li>
        <li style={styles.listItem} onClick={() => setActiveSection('stakingdetails')}>
          Staking Details
        </li>
      </ul>
    </aside>
  );
};

const styles = {
  sidebar: {
    width: '150px', // Slightly wider for better readability
    backgroundColor: '#34495e', // Slightly lighter than header for contrast
    color: '#ecf0f1',
    padding: '20px',
    height: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  listItem: {
    margin: '15px 0',
    cursor: 'pointer',
    fontSize: '18px', // Larger font size for better readability
    fontWeight: '500',
    transition: 'background-color 0.3s ease', // Smooth transition for hover effect
  },
  listItemHover: {
    backgroundColor: '#2c3e50', // Darker background on hover
    borderRadius: '5px',
    padding: '10px',
  },
};

export default Sidebar;
