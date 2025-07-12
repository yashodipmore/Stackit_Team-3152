import React, { useState } from 'react';
import { Search, Filter, MapPin, Star, MessageSquare, User } from 'lucide-react';
import { User as UserType } from '../types';

const SkillExchange = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const skills = ['React', 'Python', 'UI/UX', 'JavaScript', 'TypeScript', 'Node.js', 'Machine Learning', 'Photography'];

  const mockUsers: UserType[] = [
    {
      id: '2',
      name: 'Sarah Chen',
      location: 'San Francisco, CA',
      rating: 4.9,
      reputation: 2150,
      skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
      skillsWanted: ['React', 'JavaScript', 'Frontend Development'],
      questionsAsked: 8,
      skillsSwapped: 12,
      joinedDate: '2024-01-01',
      currentStreak: 25,
      longestStreak: 42,
      dailyActivity: []
    },
    {
      id: '3',
      name: 'Mike Rodriguez',
      location: 'New York, NY',
      rating: 4.7,
      reputation: 1890,
      skillsOffered: ['Python', 'Django', 'Data Science', 'Machine Learning'],
      skillsWanted: ['JavaScript', 'React', 'Mobile Development'],
      questionsAsked: 15,
      skillsSwapped: 8,
      joinedDate: '2024-01-05',
      currentStreak: 18,
      longestStreak: 35,
      dailyActivity: []
    },
    {
      id: '4',
      name: 'Emma Wilson',
      location: 'Austin, TX',
      rating: 4.8,
      reputation: 1650,
      skillsOffered: ['Photography', 'Photo Editing', 'Lightroom', 'Photoshop'],
      skillsWanted: ['Web Design', 'WordPress', 'Business Strategy'],
      questionsAsked: 6,
      skillsSwapped: 10,
      joinedDate: '2024-01-10',
      currentStreak: 12,
      longestStreak: 28,
      dailyActivity: []
    },
    {
      id: '5',
      name: 'David Kim',
      location: 'Seattle, WA',
      rating: 4.6,
      reputation: 1420,
      skillsOffered: ['Node.js', 'Express', 'MongoDB', 'AWS'],
      skillsWanted: ['React Native', 'Flutter', 'Mobile UI'],
      questionsAsked: 20,
      skillsSwapped: 6,
      joinedDate: '2023-12-20',
      currentStreak: 8,
      longestStreak: 22,
      dailyActivity: []
    },
    {
      id: '6',
      name: 'Lisa Park',
      location: 'Los Angeles, CA',
      rating: 4.9,
      reputation: 2340,
      skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      skillsWanted: ['Web Development', 'UI/UX', 'Graphic Design'],
      questionsAsked: 12,
      skillsSwapped: 15,
      joinedDate: '2023-11-15',
      currentStreak: 30,
      longestStreak: 45,
      dailyActivity: []
    },
    {
      id: '7',
      name: 'James Thompson',
      location: 'Chicago, IL',
      rating: 4.5,
      reputation: 1280,
      skillsOffered: ['TypeScript', 'Angular', 'Testing', 'DevOps'],
      skillsWanted: ['Vue.js', 'Nuxt.js', 'GraphQL'],
      questionsAsked: 18,
      skillsSwapped: 7,
      joinedDate: '2024-01-08',
      currentStreak: 14,
      longestStreak: 31,
      dailyActivity: []
    }
  ];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.skillsWanted.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesSkill = !skillFilter || 
                        user.skillsOffered.some(skill => skill.includes(skillFilter)) ||
                        user.skillsWanted.some(skill => skill.includes(skillFilter));
    
    const matchesLocation = !locationFilter || user.location.toLowerCase().includes(locationFilter.toLowerCase());
    
    return matchesSearch && matchesSkill && matchesLocation;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Skill Exchange
        </h1>
        <p className="text-gray-600">
          Connect with professionals to exchange skills and grow together.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Skill Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={skillFilter}
              onChange={(e) => setSkillFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Users Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((user) => (
          <div
            key={user.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            {/* User Header */}
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                <User className="w-6 h-6" />
              </div>
              <div className="ml-3 flex-1">
                <h3 className="font-semibold text-gray-900">
                  {user.name}
                </h3>
                <div className="flex items-center text-sm text-gray-600">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{user.rating}</span>
                  <span className="mx-2">•</span>
                  <span>{user.skillsSwapped} swaps</span>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center text-sm text-gray-600 mb-3">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{user.location}</span>
            </div>

            {/* Skills Offered */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Offers
              </h4>
              <div className="flex flex-wrap gap-1">
                {user.skillsOffered.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {user.skillsOffered.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{user.skillsOffered.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Skills Wanted */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Wants
              </h4>
              <div className="flex flex-wrap gap-1">
                {user.skillsWanted.slice(0, 3).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {skill}
                  </span>
                ))}
                {user.skillsWanted.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{user.skillsWanted.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors text-sm">
                Request Swap
              </button>
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <MessageSquare className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">
            No users found
          </h3>
          <p className="text-gray-600">
            Try adjusting your search or filters to find more skill exchange opportunities.
          </p>
        </div>
      )}
    </div>
  );
};

export default SkillExchange;