
import React, { useState, useEffect } from 'react';
import { ArrowDownUp, Search } from 'lucide-react';
import LeaderboardCard from './LeaderboardCard';
import LoadingSpinner from './LoadingSpinner';
import { UserStats } from './UserStatsCard';
import { toast } from 'sonner';

interface LeaderboardProps {
  users: UserStats[];
  isLoading: boolean;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ users, isLoading }) => {
  const [sortedUsers, setSortedUsers] = useState<UserStats[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const currentUser = localStorage.getItem('leetcodeUsername') || '';

  useEffect(() => {
    if (users.length) {
      try {
        const sorted = [...users].sort((a, b) => {
          return sortOrder === 'desc' 
            ? b.totalSolved - a.totalSolved 
            : a.totalSolved - b.totalSolved;
        });
        
        const filtered = sorted.filter(user => 
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        setSortedUsers(filtered);
      } catch (error) {
        console.error('Error processing user data:', error);
        toast.error('Failed to process user data');
      }
    }
  }, [users, searchTerm, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center">
        <div className="w-full sm:w-64 relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <button
          onClick={toggleSortOrder}
          className="flex items-center space-x-1 px-3 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/70 transition-colors"
        >
          <ArrowDownUp size={16} />
          <span className="text-sm">Sort {sortOrder === 'desc' ? 'Highest' : 'Lowest'}</span>
        </button>
      </div>

      <div className="space-y-3 animate-fade-in">
        {sortedUsers.length > 0 ? (
          sortedUsers.map((user, index) => (
            <LeaderboardCard
              key={user.username}
              user={user}
              rank={index + 1}
              isCurrentUser={user.username === currentUser}
            />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No users found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
