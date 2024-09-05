import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Staking = () => {
  // Existing states
  const [stakeAmount, setStakeAmount] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [stakingPlans, setStakingPlans] = useState([]);
  const [userId, setUserId] = useState('');
  const [userStakingDetails, setUserStakingDetails] = useState([]);
  const [selectedStakeId, setSelectedStakeId] = useState('');
  const [earnedRewards, setEarnedRewards] = useState({});

  // New states for plan creation
  const [planName, setPlanName] = useState('');
  const [duration, setDuration] = useState('');
  const [minimumAmount, setMinimumAmount] = useState('');
  const [rewardPercentage, setRewardPercentage] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    planList();
    fetchUserStakingDetails();

    const id = localStorage.getItem('userId');
    if (id) {
      setUserId(id);
    } else {
      console.error('User ID is not found in localStorage.');
    }
  }, []);

  const planList = async () => {
    try {
      const res = await axios.get('http://localhost:3000/plans');
      if (res.data.success) {
        setStakingPlans(res.data.data);
      } else {
        console.error('Error fetching staking plans:', res.data.message);
      }
    } catch (error) {
      console.error('Error fetching staking plans:', error.message);
    }
  };

  const fetchUserStakingDetails = async () => {
    try {
      let id = localStorage.getItem('userId');
      if (!id) {
        console.error('User ID is missing.');
        return;
      }

      const response = await axios.get(`http://localhost:3000/stake/${id}`);
      if (response.data.message === 'Staking details retrieved successfully') {
        setUserStakingDetails(response.data.stakedData);
      } else {
        console.error('Error fetching user staking details:', response.data.message);
      }
    } catch (error) {
      console.error('Error fetching user staking details:', error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!userId || !selectedPlan || !stakeAmount) {
        console.error('User ID, staking plan, or stake amount is missing.');
        return;
      }

      const response = await axios.post('http://localhost:3000/stake', {
        userId: userId,
        planid: selectedPlan,
        amount: stakeAmount,
      });

      if (response.data.message === 'Staking successful') {
        fetchUserStakingDetails(); // Refresh user staking details after successful staking
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error during staking:', error.response ? error.response.data : error.message);
    }
  };

  const handleStakeAmountChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) && value >= 0) {
      setStakeAmount(value);
    }
  };

  const handleUnstake = async (stakeId, planDuration, createdAt) => {
    console.log("Stake ID:", stakeId); // Debugging: Log the stakeId

    try {
      const createdDate = new Date(createdAt);
      const endDate = new Date(createdDate.getTime() + planDuration * 60 * 1000);
      const now = new Date();

      if (now < endDate) {
        console.error('Unstaking is only allowed after the staking duration has ended.');
        return;
      }

      const response = await axios.post('http://localhost:3000/update-stake', {
        stakingId: stakeId,
        amount: 'full',
      });

      if (response.data.message === 'Staking details updated successfully') {
        fetchUserStakingDetails(); // Refresh user staking details after successful unstaking
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error during unstaking:', error.response ? error.response.data : error.message);
    }
  };

  const handleClaimRewards = async (stakeId, planDuration, createdAt) => {
    try {
      const createdDate = new Date(createdAt);
      const endDate = new Date(createdDate.getTime() + planDuration * 60 * 1000);
      const now = new Date();

      if (now < endDate) {
        console.error('Rewards can only be claimed after the staking duration has ended.');
        return;
      }

      const response = await axios.post('http://localhost:3000/claim-rewards', { stakeId });

      if (response.data.message === 'Rewards claimed successfully') {
        setEarnedRewards((prev) => ({
          ...prev,
          [stakeId]: response.data.claimedAmount,
        }));
        fetchUserStakingDetails(); // Refresh staking details after claiming rewards
      } else {
        console.log('Error:', response.data.message);
      }
    } catch (error) {
      console.error('Error claiming rewards:', error.response ? error.response.data : error.message);
    }
  };

  const handlePlanChange = (e) => {
    setSelectedPlan(e.target.value);
  };

  const handlePlanCreation = async (e) => {
    e.preventDefault();

    if (planName.trim() === '') {
      setError('Plan Name is required.');
      return;
    }
    if (duration < 0 || minimumAmount < 0 || rewardPercentage < 0) {
      setError('Duration, Minimum Amount, and Reward Percentage must be non-negative.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/plans', {
        planName,
        duration: Number(duration),
        minimumAmount: Number(minimumAmount),
        rewardPercentage: Number(rewardPercentage)
      });

      if (response.data.message === 'Plan created successfully') {
        setSuccess(response.data.message);
        setError(null);
        setPlanName('');
        setDuration('');
        setMinimumAmount('');
        setRewardPercentage('');
        planList(); // Refresh the list of plans
      } else {
        setError('Error creating plan.');
      }
    } catch (error) {
      setError(error.response?.data?.message || 'An error occurred while creating the plan.');
      setSuccess(null);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.sectionTitle}>Available Staking Plans</h3>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Plan Name</th>
            <th>Duration</th>
            <th>Minimum Amount</th>
            <th>Reward Percentage</th>
          </tr>
        </thead>
        <tbody>
          {stakingPlans.map((plan) => (
            <tr key={plan._id}>
              <td>{plan.planName}</td>
              <td>{plan.duration} minutes</td>
              <td>${plan.minimumAmount}</td>
              <td>{plan.rewardPercentage}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={styles.sectionTitle}>Create a New Plan</h3>
      <form onSubmit={handlePlanCreation}>
        <div>
          <label>
            Plan Name:
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Duration (minutes):
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              min="0"
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Minimum Amount:
            <input
              type="number"
              value={minimumAmount}
              onChange={(e) => setMinimumAmount(e.target.value)}
              min="0"
              style={styles.input}
            />
          </label>
        </div>
        <div>
          <label>
            Reward Percentage:
            <input
              type="number"
              value={rewardPercentage}
              onChange={(e) => setRewardPercentage(e.target.value)}
              min="0"
              step="0.01"
              style={styles.input}
            />
          </label>
        </div>
        <button type="submit" style={styles.stakeButton}>Create Plan</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    marginLeft: '250px',
    backgroundColor: '#f0f4f8',
    minHeight: '100vh',
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #d0d6dd',
    boxSizing: 'border-box',
  },
  stakeButton: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(90deg, #1e90ff 0%, #4682b4 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginBottom: '20px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
};

export default Staking;
