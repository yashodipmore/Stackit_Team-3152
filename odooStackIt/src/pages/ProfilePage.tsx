import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Calendar, Edit3, Plus, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newSkillOffered, setNewSkillOffered] = useState('');
  const [newSkillWanted, setNewSkillWanted] = useState('');

  const isOwnProfile = user?.id === id;

  // Mock profile data - in real app, fetch based on ID
  const profileUser = user || {
    id: '1',
    username: 'demo_user',
    email: 'demo@example.com',
    skillsOffered: ['React', 'TypeScript'],
    skillsWanted: ['Python', 'UI/UX'],
    rating: 4.8,
    swapCount: 15,
    joinedDate: '2024-01-15',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about creating amazing user experiences. Always eager to learn new technologies and share knowledge with the community.'
  };

  const addSkillOffered = () => {
    if (newSkillOffered.trim()) {
      // In real app, update user profile
      setNewSkillOffered('');
    }
  };

  const addSkillWanted = () => {
    if (newSkillWanted.trim()) {
      // In real app, update user profile
      setNewSkillWanted('');
    }
  };

  const removeSkillOffered = (skill: string) => {
    // In real app, update user profile
  };

  const removeSkillWanted = (skill: string) => {
    // In real app, update user profile
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            {/* Avatar */}
            <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
              {profileUser.username[0].toUpperCase()}
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex items-center space-x-4 mb-2">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {profileUser.username}
                </h1>
                {isOwnProfile && (
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-4 text-gray-600 dark:text-gray-400 mb-4">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{profileUser.rating} rating</span>
                </div>
                <span>•</span>
                <span>{profileUser.swapCount} swaps completed</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(profileUser.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              {profileUser.location && (
                <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{profileUser.location}</span>
                </div>
              )}

              {profileUser.bio && (
                <p className="text-gray-700 dark:text-gray-300">
                  {profileUser.bio}
                </p>
              )}
            </div>

            {/* Action Button */}
            {!isOwnProfile && (
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                Request Swap
              </button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Skills Offered */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Skills I Offer
              </h2>
              {isOwnProfile && isEditing && (
                <button
                  onClick={() => {/* Add skill modal */}}
                  className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {profileUser.skillsOffered.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                >
                  <span className="font-medium text-green-800 dark:text-green-300">
                    {skill}
                  </span>
                  {isOwnProfile && isEditing && (
                    <button
                      onClick={() => removeSkillOffered(skill)}
                      className="p-1 text-green-600 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-800 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {isOwnProfile && isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillOffered}
                    onChange={(e) => setNewSkillOffered(e.target.value)}
                    placeholder="Add a skill you offer..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={addSkillOffered}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              )}

              {profileUser.skillsOffered.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No skills listed yet
                </p>
              )}
            </div>
          </div>

          {/* Skills Wanted */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Skills I Want to Learn
              </h2>
              {isOwnProfile && isEditing && (
                <button
                  onClick={() => {/* Add skill modal */}}
                  className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="space-y-3">
              {profileUser.skillsWanted.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                >
                  <span className="font-medium text-blue-800 dark:text-blue-300">
                    {skill}
                  </span>
                  {isOwnProfile && isEditing && (
                    <button
                      onClick={() => removeSkillWanted(skill)}
                      className="p-1 text-blue-600 dark:text-blue-400 hover:bg-blue-200 dark:hover:bg-blue-800 rounded transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}

              {isOwnProfile && isEditing && (
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newSkillWanted}
                    onChange={(e) => setNewSkillWanted(e.target.value)}
                    placeholder="Add a skill you want to learn..."
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                  <button
                    onClick={addSkillWanted}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    Add
                  </button>
                </div>
              )}

              {profileUser.skillsWanted.length === 0 && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                  No skills listed yet
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Recent Activity
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Completed skill swap with <strong>sarah_designer</strong> - exchanged React knowledge for UI/UX guidance
              </span>
              <span className="text-xs text-gray-400 ml-auto">2 days ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Answered question about TypeScript best practices
              </span>
              <span className="text-xs text-gray-400 ml-auto">5 days ago</span>
            </div>
            
            <div className="flex items-center space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Asked question about Python data structures
              </span>
              <span className="text-xs text-gray-400 ml-auto">1 week ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;