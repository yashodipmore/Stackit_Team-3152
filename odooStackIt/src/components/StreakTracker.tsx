import React, { useState } from 'react';
import { Flame, Calendar, TrendingUp } from 'lucide-react';
import { User } from '../types';

interface StreakTrackerProps {
  user: User;
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ user }) => {
  const [viewMode, setViewMode] = useState<'year' | 'month'>('year');
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number } | null>(null);

  const getActivityColor = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count <= 2) return 'bg-green-200';
    if (count <= 5) return 'bg-green-400';
    return 'bg-green-600';
  };

  const getActivityLevel = (count: number) => {
    if (count === 0) return 'No activity';
    if (count <= 2) return 'Light activity';
    if (count <= 5) return 'Moderate activity';
    return 'High activity';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getWeeksInYear = () => {
    const weeks = [];
    const activities = user.dailyActivity;
    
    for (let i = 0; i < activities.length; i += 7) {
      weeks.push(activities.slice(i, i + 7));
    }
    
    return weeks;
  };

  const weeks = getWeeksInYear();
  const today = new Date().toISOString().split('T')[0];
  const todayActivity = user.dailyActivity.find(day => day.date === today);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Flame className="w-5 h-5 text-orange-500 mr-2" />
          Daily Streak
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setViewMode('month')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'month'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setViewMode('year')}
            className={`px-3 py-1 text-sm rounded-md transition-colors ${
              viewMode === 'year'
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Streak Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Flame className="w-4 h-4 text-orange-500 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{user.currentStreak}</span>
          </div>
          <p className="text-sm text-gray-600">Current Streak</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{user.longestStreak}</span>
          </div>
          <p className="text-sm text-gray-600">Longest Streak</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Calendar className="w-4 h-4 text-blue-500 mr-1" />
            <span className="text-2xl font-bold text-gray-900">{todayActivity?.count || 0}</span>
          </div>
          <p className="text-sm text-gray-600">Today</p>
        </div>
      </div>

      {/* Activity Calendar */}
      <div className="relative">
        <div className="text-xs text-gray-500 mb-2">
          {viewMode === 'year' ? 'Past 12 months' : 'This month'}
        </div>
        
        {/* Day labels */}
        <div className="flex mb-2">
          <div className="w-8"></div>
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="w-3 h-3 text-xs text-gray-500 flex items-center justify-center mr-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="flex flex-wrap gap-1">
          {weeks.map((week, weekIndex) => (
            <div key={weekIndex} className="flex flex-col gap-1">
              {week.map((day, dayIndex) => (
                <div
                  key={day.date}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-all duration-200 hover:ring-2 hover:ring-blue-300 ${getActivityColor(day.count)}`}
                  onMouseEnter={() => setHoveredDay(day)}
                  onMouseLeave={() => setHoveredDay(null)}
                  title={`${formatDate(day.date)}: ${day.count} activities`}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {hoveredDay && (
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap z-10">
            <div className="font-medium">{formatDate(hoveredDay.date)}</div>
            <div>{hoveredDay.count} activities - {getActivityLevel(hoveredDay.count)}</div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
        <span>Less</span>
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
          <div className="w-3 h-3 bg-green-600 rounded-sm"></div>
        </div>
        <span>More</span>
      </div>

      {/* Streak Warning */}
      {user.currentStreak > 0 && todayActivity?.count === 0 && (
        <div className="mt-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
          <div className="flex items-center">
            <Flame className="w-4 h-4 text-orange-500 mr-2" />
            <span className="text-sm text-orange-800">
              Complete an activity today to maintain your {user.currentStreak}-day streak!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StreakTracker;