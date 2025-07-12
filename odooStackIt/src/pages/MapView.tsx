import React, { useState } from 'react';
import { MapPin, Users, Search, Filter } from 'lucide-react';

const MapView = () => {
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const skills = ['React', 'Python', 'UI/UX', 'JavaScript', 'Photography', 'Marketing'];

  const mockMapUsers = [
    {
      id: '1',
      username: 'sarah_designer',
      skillsOffered: ['UI/UX Design', 'Figma'],
      skillsWanted: ['React', 'JavaScript'],
      location: 'San Francisco, CA',
      lat: 37.7749,
      lng: -122.4194,
      rating: 4.9
    },
    {
      id: '2',
      username: 'mike_python',
      skillsOffered: ['Python', 'Django'],
      skillsWanted: ['JavaScript', 'React'],
      location: 'New York, NY',
      lat: 40.7128,
      lng: -74.0060,
      rating: 4.7
    },
    {
      id: '3',
      username: 'alex_marketer',
      skillsOffered: ['Digital Marketing', 'SEO'],
      skillsWanted: ['Web Development', 'UI/UX'],
      location: 'Los Angeles, CA',
      lat: 34.0522,
      lng: -118.2437,
      rating: 4.6
    }
  ];

  const filteredUsers = selectedSkill 
    ? mockMapUsers.filter(user => 
        user.skillsOffered.some(skill => skill.includes(selectedSkill)) ||
        user.skillsWanted.some(skill => skill.includes(selectedSkill))
      )
    : mockMapUsers;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Skill Map
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Discover skilled professionals in your area for in-person collaboration.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedSkill}
                onChange={(e) => setSelectedSkill(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Skills</option>
                {skills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {filteredUsers.length} users found
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Placeholder */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-6 h-96 lg:h-[600px]">
              <div className="w-full h-full bg-gradient-to-br from-blue-100 to-teal-100 dark:from-gray-700 dark:to-gray-600 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Simulated map with pins */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-700">
                  {/* Mock map pins */}
                  {filteredUsers.map((user, index) => (
                    <div
                      key={user.id}
                      className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-full transition-all duration-200 hover:scale-110 ${
                        selectedUser === user.id ? 'z-10 scale-110' : ''
                      }`}
                      style={{
                        left: `${20 + index * 25}%`,
                        top: `${30 + index * 15}%`
                      }}
                      onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                    >
                      <div className="bg-red-500 text-white p-2 rounded-full shadow-lg">
                        <MapPin className="w-4 h-4" />
                      </div>
                      {selectedUser === user.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 min-w-48">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {user.username}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {user.location}
                          </p>
                          <div className="text-xs">
                            <span className="text-green-600 dark:text-green-400">Offers:</span>
                            <span className="ml-1">{user.skillsOffered.join(', ')}</span>
                          </div>
                          <button className="w-full mt-2 bg-blue-600 text-white py-1 px-2 rounded text-xs hover:bg-blue-700 transition-colors">
                            Request Swap
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <MapPin className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium mb-2">Interactive Map View</p>
                  <p className="text-sm">Click on pins to see user details and request skill swaps</p>
                  <div className="mt-4 text-xs opacity-75">
                    This is a demo interface. In production, this would integrate with Google Maps or MapBox
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* User List */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Nearby Users
            </h3>
            
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 p-4 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedUser === user.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
                }`}
                onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
              >
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {user.username}
                    </h4>
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mb-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>{user.location}</span>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs">
                        <span className="text-green-600 dark:text-green-400 font-medium">Offers:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skillsOffered.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="text-xs">
                        <span className="text-blue-600 dark:text-blue-400 font-medium">Wants:</span>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {user.skillsWanted.slice(0, 2).map((skill, index) => (
                            <span
                              key={index}
                              className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <button className="w-full mt-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-1.5 px-3 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 text-xs">
                      Request Swap
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  No users found with the selected skill filter.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;