
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import Footer from '../components/Footer';
import LeaderboardComponent from '../components/Leaderboard';
import { fetchAllUsers } from '../utils/leetcode-api';

const LeaderboardPage = () => {
  const { data: users, isLoading, error } = useQuery({
    queryKey: ['leaderboard'],
    queryFn: fetchAllUsers,
    staleTime: 60000, // 1 minute
    retry: 1,
    refetchOnWindowFocus: false,
  });

  // Show error toast if data fetching fails
  React.useEffect(() => {
    if (error) {
      toast.error('Failed to load leaderboard data. Please try again later.');
      console.error('Error fetching leaderboard data:', error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Leaderboard</h1>
            <p className="text-muted-foreground mt-1">
              See how you stack up against other LeetCoders
            </p>
          </div>

          <LeaderboardComponent users={users || []} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LeaderboardPage;
