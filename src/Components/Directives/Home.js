import React from 'react';

const Home = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Home</h2>
      <div style={styles.card}>Total Staked Amount: $100,000</div>
      <div style={styles.card}>Total Users Staked: 500</div>
      <div style={styles.card}>Total Generated Rewards: $5,000</div>
    </div>
  );
};

const styles = {
  container: {
    padding: '30px', // Increased padding for more space
    marginLeft: '250px', // Adjusted to match the sidebar width
    display: 'flex',
    flexDirection: 'column',
    gap: '20px', // Added gap between cards
  },
  heading: {
    fontSize: '28px', // Larger font size for headings
    marginBottom: '20px', // Spacing below the heading
    color: '#2c3e50', // Darker color for the heading
  },
  card: {
    padding: '20px',
    backgroundColor: '#fff', // White background for the cards
    borderRadius: '8px', // Slightly larger border radius for a modern look
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Added shadow for depth
    fontSize: '18px', // Increased font size for readability
    color: '#333', // Dark text color for contrast
  }
};

export default Home;
