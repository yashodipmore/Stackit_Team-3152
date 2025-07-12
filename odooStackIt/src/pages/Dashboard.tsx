import React from 'react';
import { MessageSquare, Users, Star, Trophy, TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import StreakTracker from '../components/StreakTracker';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) return null;

  const stats = [
    {
      title: 'Questions Asked',
      value: user.questionsAsked.toString(),
      icon: <MessageSquare className="w-6 h-6" />,
      color: 'bg-blue-500'
    },
    {
      title: 'Skills Swapped',
      value: user.skillsSwapped.toString(),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-500'
    },
    {
      title: 'Rating',
      value: user.rating.toFixed(1),
      icon: <Star className="w-6 h-6" />,
      color: 'bg-yellow-500'
    },
    {
      title: 'Reputation',
      value: user.reputation.toLocaleString(),
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-purple-500'
    }
  ];

  const recentActivity = [
    {
      id: '1',
      type: 'question',
      title: 'Asked about React hooks best practices',
      time: '2 hours ago',
      icon: <MessageSquare className="w-4 h-4" />
    },
    {
      id: '2',
      type: 'swap',
      title: 'Completed skill swap with Sarah Chen',
      time: '1 day ago',
      icon: <Users className="w-4 h-4" />
    },
    {
      id: '3',
      type: 'achievement',
      title: 'Earned "Helpful Contributor" badge',
      time: '3 days ago',
      icon: <Award className="w-4 h-4" />
    },
    {
      id: '4',
      type: 'answer',
      title: 'Answered question about TypeScript interfaces',
      time: '5 days ago',
      icon: <MessageSquare className="w-4 h-4" />
    }
  ];

  const achievements = [
    { title: 'First Question', unlocked: true, icon: '🎯' },
    { title: 'Helpful Contributor', unlocked: true, icon: '🌟' },
    { title: 'Streak Master', unlocked: true, icon: '🔥' },
    { title: 'Skill Master', unlocked: false, icon: '🏆' },
    { title: 'Community Leader', unlocked: false, icon: '👑' },
    { title: 'Mentor', unlocked: false, icon: '🎓' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}!
        </h1>
        <p className="text-gray-600">
          Here's what's happening in your learning journey today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-lg ${stat.color} text-white`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Streak Tracker */}
          <StreakTracker user={user} />

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-shrink-0 p-2 bg-white rounded-lg border border-gray-200">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {activity.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Your Skills */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Your Skills
            </h3>
            
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Skills You Offer
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.skillsOffered.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-600 mb-2">
                Skills You Want
              </h4>
              <div className="flex flex-wrap gap-2">
                {user.skillsWanted.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Achievements
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border text-center ${
                    achievement.unlocked
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-50'
                  }`}
                >
                  <div className="text-2xl mb-1">{achievement.icon}</div>
                  <p className="text-xs font-medium text-gray-700">
                    {achievement.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors">
                Ask a Question
              </button>
              <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-600 transition-colors">
                Find Skill Swap
              </button>
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-600 transition-colors">
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;