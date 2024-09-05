import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Home from './Home';
import SetPlan from './SetPlan';
import StakingDetails from './StakingDetails';

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState('home');
  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'setplan':
        return <SetPlan />;
      case 'stakingdetails':
        return <StakingDetails/>
      default:
        return <Home />;
    }
  };
 
  return (
    <div style={styles.dashboard}>
      <Header />
      <Sidebar setActiveSection={setActiveSection} />
      <main style={styles.mainContent}>
        {renderSection()}
      </main>
      <Footer />
    </div>
  );
};
    
const styles = {
  dashboard: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    fontFamily: 'Arial, sans-serif', // Use a clean font for better readability
    color: '#333', // Dark text for better contrast
    backgroundColor: '#f4f4f4' // Light background for a modern look
  },
  mainContent: {
    flexGrow: 1,
    marginLeft: '220px', // Adjust according to your sidebar width
    padding: '20px',
    backgroundColor: '#fff', // White background for the main content
    borderRadius: '8px', // Rounded corners for a modern touch
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' // Subtle shadow for depth
  }
};

export default Dashboard;















































