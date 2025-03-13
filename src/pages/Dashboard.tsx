
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { RefreshCw, Settings } from 'lucide-react';
import UserStatsCard from '../components/UserStatsCard';
import Footer from '../components/Footer';
import { fetchLeetCodeStats } from '../utils/leetcode-api';

const Dashboard = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem('leetcodeUsername');

  // Redirect if no username is found
  useEffect(() => {
    if (!username) {
      toast.error('Please register to view your dashboard');
      navigate('/');
    }
  }, [username, navigate]);

  const { 
    data: stats, 
    isLoading, 
    error, 
    refetch, 
    dataUpdatedAt 
  } = useQuery({
    queryKey: ['userStats', username],
    queryFn: () => fetchLeetCodeStats(username || ''),
    enabled: !!username,
    staleTime: 300000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Show error toast if data fetching fails
  useEffect(() => {
    if (error) {
      toast.error('Failed to load your stats. Please try again later.');
      console.error('Error fetching user stats:', error);
    }
  }, [error]);

  const handleRefresh = () => {
    toast.info('Refreshing your stats...');
    refetch();
  };

  const lastUpdated = dataUpdatedAt ? new Date(dataUpdatedAt) : null;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold">Your Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Track your LeetCode progress and statistics
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex items-center space-x-2">
              <button
                onClick={handleRefresh}
                className="flex items-center px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors"
              >
                <RefreshCw size={16} className="mr-2" />
                <span className="text-sm">Refresh</span>
              </button>
              <button className="flex items-center px-3 py-2 rounded-lg bg-secondary hover:bg-secondary/70 transition-colors">
                <Settings size={16} className="mr-2" />
                <span className="text-sm">Settings</span>
              </button>
            </div>
          </div>

          {lastUpdated && (
            <p className="text-sm text-muted-foreground mb-6">
              Last updated: {lastUpdated.toLocaleString()}
            </p>
          )}

          {stats ? (
            <UserStatsCard stats={stats} isLoading={isLoading} />
          ) : isLoading ? (
            <UserStatsCard 
              stats={{
                username: '',
                totalSolved: 0,
                easySolved: 0,
                mediumSolved: 0,
                hardSolved: 0,
                ranking: 0
              }} 
              isLoading={true}
            />
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No data available</p>
            </div>
          )}

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <p className="text-muted-foreground text-center py-8">
                Coming soon...
              </p>
            </div>
            <div className="p-6 rounded-2xl border border-border bg-card/50">
              <h2 className="text-xl font-semibold mb-4">Progress Goals</h2>
              <p className="text-muted-foreground text-center py-8">
                Coming soon...
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
