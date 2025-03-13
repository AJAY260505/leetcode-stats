
import React from 'react';
import { ArrowUp, Award, CheckCircle2 } from 'lucide-react';

export interface UserStats {
  username: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  streak?: number;
}

interface UserStatsCardProps {
  stats: UserStats;
  isLoading: boolean;
}

const UserStatsCard: React.FC<UserStatsCardProps> = ({ stats, isLoading }) => {
  if (isLoading) {
    return (
      <div className="w-full p-6 rounded-2xl bg-card border border-border animate-pulse">
        <div className="h-8 w-40 bg-muted rounded mb-4"></div>
        <div className="h-16 w-24 bg-muted rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-muted rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  const difficulty = [
    { label: 'Easy', count: stats.easySolved, color: 'bg-green-500' },
    { label: 'Medium', count: stats.mediumSolved, color: 'bg-yellow-500' },
    { label: 'Hard', count: stats.hardSolved, color: 'bg-red-500' },
  ];

  return (
    <div className="w-full backdrop-blur-lg bg-card/50 p-6 rounded-2xl border border-border/50 shadow-sm overflow-hidden card-hover">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <span className="text-sm font-medium text-muted-foreground">Welcome</span>
          <h2 className="text-2xl font-bold mt-1">{stats.username}</h2>
        </div>
        <div className="flex items-center mt-4 sm:mt-0">
          <div className="flex items-center bg-primary/5 px-3 py-1.5 rounded-full">
            <Award size={16} className="text-primary mr-2" />
            <span className="text-sm font-medium">Rank: #{stats.ranking}</span>
          </div>
          {stats.streak && (
            <div className="flex items-center bg-primary/5 px-3 py-1.5 rounded-full ml-2">
              <CheckCircle2 size={16} className="text-orange-500 mr-2" />
              <span className="text-sm font-medium">{stats.streak} day streak</span>
            </div>
          )}
        </div>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm font-medium text-muted-foreground">Total Problems Solved</span>
          <div className="flex items-center text-sm text-green-500">
            <ArrowUp size={14} className="mr-1" />
            <span>+5 since last week</span>
          </div>
        </div>
        <div className="flex items-baseline">
          <h3 className="text-3xl font-bold">{stats.totalSolved}</h3>
          <span className="text-muted-foreground ml-2 text-sm">problems</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulty.map((item) => (
          <div 
            key={item.label} 
            className="bg-card border border-border/50 rounded-xl p-4 flex flex-col transition-all hover:border-primary/50"
          >
            <div className="flex items-center mb-2">
              <div className={`h-3 w-3 rounded-full ${item.color} mr-2`}></div>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            <h4 className="text-2xl font-bold">{item.count}</h4>
            <div className="mt-2 w-full bg-secondary rounded-full h-1.5">
              <div 
                className={`${item.color} h-1.5 rounded-full`} 
                style={{ width: `${(item.count / stats.totalSolved) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStatsCard;
