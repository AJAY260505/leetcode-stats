
import { UserStats } from '../components/UserStatsCard';

// API endpoint for LeetCode stats
const API_URL = 'http://127.0.0.1:5000/leetcode_stats';

// Convert API response format to our UserStats format
const mapApiResponseToUserStats = (apiData: any): UserStats => {
  return {
    username: apiData.username,
    totalSolved: apiData.total_solved,
    easySolved: apiData.easy,
    mediumSolved: apiData.medium,
    hardSolved: apiData.hard,
    ranking: apiData.rank,
    // No streak info in the API, so we leave it undefined
  };
};

// Fetch stats for a specific user
export const fetchLeetCodeStats = async (username: string): Promise<UserStats> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    const userStats = data.find((user: any) => 
      user.username.toLowerCase() === username.toLowerCase()
    );
    
    if (!userStats) {
      throw new Error(`User ${username} not found`);
    }
    
    return mapApiResponseToUserStats(userStats);
  } catch (error) {
    console.error('Error fetching LeetCode stats:', error);
    throw error;
  }
};

// Fetch stats for all users
export const fetchAllUsers = async (): Promise<UserStats[]> => {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }
    
    const data = await response.json();
    return data.map(mapApiResponseToUserStats);
  } catch (error) {
    console.error('Error fetching all users:', error);
    throw error;
  }
};
