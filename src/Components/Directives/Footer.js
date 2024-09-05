import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p style={styles.text}>&copy; 2024 Staking Platform. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    textAlign: 'center',
    padding: '20px', // Increased padding for a more spacious footer
    backgroundColor: '#2c3e50', // Darker background to match the header
    color: '#ecf0f1', // Light text for better contrast
    position: 'fixed',
    bottom: 0,
    width: '100%',
    boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
  },
  text: {
    margin: 0,
    fontSize: '14px', // Adjusted font size for better readability
    fontWeight: '400',
  },
};

export default Footer;
