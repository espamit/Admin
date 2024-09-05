import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StakingTable = () => {
    const [stakingData, setStakingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch staking data from the API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/auth/stake'); // Update with correct URL
                if (response.data.success) {
                    setStakingData(response.data.staking);
                } else {
                    console.warn(response.data.message);
                }
            } catch (error) {
                setError('Error fetching staking data');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading staking data...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Staking Details</h2>
            {stakingData.length === 0 ? (
                <p style={styles.noDataText}>No staking data available</p>
            ) : (
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.th}>User ID</th>
                            <th style={styles.th}>Plan ID</th>
                            <th style={styles.th}>Amount Staked</th>
                            <th style={styles.th}>Is Reward Claimed</th>
                            <th style={styles.th}>Is Unstaked</th>
                            <th style={styles.th}>Total Claimed Rewards</th>
                            <th style={styles.th}>Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stakingData.map((stake) => (
                            <tr key={stake._id} style={styles.tr}>
                                <td style={styles.td}>{stake.userId}</td>
                                <td style={styles.td}>{stake.planId}</td>
                                <td style={styles.td}>{stake.amountStaked}</td>
                                <td style={styles.td}>{stake.isRewardClaimed ? 'Yes' : 'No'}</td>
                                <td style={styles.td}>{stake.isUnstaked ? 'Yes' : 'No'}</td>
                                <td style={styles.td}>{stake.totalClaimedRewards}</td>
                                <td style={styles.td}>{new Date(stake.createdAt).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        textAlign: 'center',
        color: '#333',
        marginBottom: '20px',
    },
    noDataText: {
        textAlign: 'center',
        color: '#999',
        fontSize: '16px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        backgroundColor: '#fff',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    th: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '12px 15px',
        textAlign: 'left',
    },
    td: {
        padding: '12px 15px',
        textAlign: 'left',
        borderBottom: '1px solid #ddd',
    },
    tr: {
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s ease',
    },
    trHover: {
        backgroundColor: '#f1f1f1',
    },
};

export default StakingTable;
