import React, { useState } from 'react';
import { Search, Filter, Users, Star, MapPin, MessageSquare } from 'lucide-react';
import { User } from '../types';

const SkillSwapPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const skills = ['React', 'Python', 'UI/UX', 'JavaScript', 'TypeScript', 'Node.js', 'GraphQL', 'Photography', 'Marketing', 'Finance'];

  const mockUsers: User[] = [
    {
      id: '2',
      username: 'sarah_designer',
      email: 'sarah@example.com',
      skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      skillsWanted: ['React', 'JavaScript', 'Frontend Development'],
      rating: 4.9,
      swapCount: 12,
      joinedDate: '2024-01-01',
      location: 'San Francisco, CA',
      bio: 'Senior UX/UI Designer with 5+ years of experience. Love creating beautiful and functional interfaces!'
    },
    {
      id: '3',
      username: 'mike_python',
      email: 'mike@example.com',
      skillsOffered: ['Python', 'Django', 'Data Science', 'Machine Learning'],
      skillsWanted: ['JavaScript', 'React', 'Mobile Development'],
      rating: 4.7,
      swapCount: 8,
      joinedDate: '2024-01-05',
      location: 'New York, NY',
      bio: 'Full-stack developer and data scientist. Always excited to learn new technologies and share knowledge.'
    },
    {
      id: '4',
      username: 'alex_marketer',
      email: 'alex@example.com',
      skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      skillsWanted: ['Web Development', 'UI/UX', 'Graphic Design'],
      rating: 4.6,
      swapCount: 15,
      joinedDate: '2023-12-20',
      location: 'Los Angeles, CA',
      bio: 'Marketing professional helping businesses grow online. Looking to expand into tech skills.'
    },
    {
      id: '5',
      username: 'emma_photographer',
      email: 'emma@example.com',
      skillsOffered: ['Photography', 'Photo Editing', 'Lightroom', 'Photoshop'],
      skillsWanted: ['Web Design', 'WordPress', 'Business Strategy'],
      rating: 4.8,
      swapCount: 6,
      joinedDate: '2024-01-10',
      location: 'Austin, TX',
      bio: 'Professional photographer specializing in portraits and events. Want to build my own website and grow my business.'
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !skillFilter || 
                        user.skillsOffered.some(skill => skill.includes(skillFilter)) ||
                        user.skillsWanted.some(skill => skill.includes(skillFilter));
    
    const matchesLocation = !locationFilter || (user.location && user.location.toLowerCase().includes(locationFilter.toLowerCase()));
    
    return matchesSearch && matchesSkill && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill Swap Explorer
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Find professionals to exchange skills with and grow together.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search users or skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Skill Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={skillFilter}
                onChange={(e) => setSkillFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>

            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Filter by location..."
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Users Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              {/* User Header */}
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {user.username[0].toUpperCase()}
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {user.username}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{user.rating}</span>
                    <span className="mx-2">•</span>
                    <span>{user.swapCount} swaps</span>
                  </div>
                </div>
              </div>

              {/* Location */}
              {user.location && (
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{user.location}</span>
                </div>
              )}

              {/* Bio */}
              {user.bio && (
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                  {user.bio}
                </p>
              )}

              {/* Skills Offered */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Offers
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsOffered.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skillsOffered.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{user.skillsOffered.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Wants
                </h4>
                <div className="flex flex-wrap gap-1">
                  {user.skillsWanted.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {user.skillsWanted.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{user.skillsWanted.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-sm">
                  Request Swap
                </button>
                <button className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
              No users found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filters to find more skill swap opportunities.
            </p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">
            Ready to Start Swapping Skills?
          </h2>
          <p className="text-lg mb-6 opacity-90">
            Update your profile with the skills you offer and want to learn.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Update My Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillSwapPage;