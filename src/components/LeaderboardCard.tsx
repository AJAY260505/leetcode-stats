
import React from 'react';
import { Trophy, Medal } from 'lucide-react';
import { UserStats } from './UserStatsCard';

interface LeaderboardCardProps {
  user: UserStats;
  rank: number;
  isCurrentUser?: boolean;
}

const LeaderboardCard: React.FC<LeaderboardCardProps> = ({ user, rank, isCurrentUser = false }) => {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold">{rank}</span>;
    }
  };

  return (
    <div 
      className={`relative p-4 rounded-xl border transition-all card-hover ${
        isCurrentUser 
          ? 'border-primary/50 bg-primary/5 shadow-sm' 
          : 'border-border bg-card/50'
      }`}
    >
      <div className="flex items-center">
        <div className={`flex items-center justify-center h-8 w-8 rounded-full ${
          rank <= 3 ? 'bg-primary/10' : 'bg-secondary'
        } mr-4`}>
          {getRankIcon()}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center">
            <h3 className="font-medium">
              {user.username}
              {isCurrentUser && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded-full">You</span>
              )}
            </h3>
          </div>
          <div className="text-sm text-muted-foreground mt-0.5">
            {user.totalSolved} problems solved
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="hidden sm:block">
            <div className="flex space-x-3">
              <StatPill label="Easy" count={user.easySolved} color="bg-green-500" />
              <StatPill label="Medium" count={user.mediumSolved} color="bg-yellow-500" />
              <StatPill label="Hard" count={user.hardSolved} color="bg-red-500" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile stats display */}
      <div className="mt-3 sm:hidden">
        <div className="flex justify-between space-x-2">
          <StatPill label="Easy" count={user.easySolved} color="bg-green-500" />
          <StatPill label="Medium" count={user.mediumSolved} color="bg-yellow-500" />
          <StatPill label="Hard" count={user.hardSolved} color="bg-red-500" />
        </div>
      </div>
    </div>
  );
};

interface StatPillProps {
  label: string;
  count: number;
  color: string;
}

const StatPill: React.FC<StatPillProps> = ({ label, count, color }) => (
  <div className="flex items-center bg-secondary/80 px-2 py-1 rounded-lg">
    <div className={`h-2 w-2 rounded-full ${color} mr-1.5`}></div>
    <span className="text-xs font-medium">{count}</span>
  </div>
);

export default LeaderboardCard;
