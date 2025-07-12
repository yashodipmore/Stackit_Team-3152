import React from 'react';
import { BookOpen, Target, Award, TrendingUp, Clock, CheckCircle, Circle } from 'lucide-react';
import { LearningPath as LearningPathType, Achievement } from '../types';

const LearningPath = () => {
  const learningPaths: LearningPathType[] = [
    {
      id: '1',
      skill: 'React Development',
      progress: 75,
      totalLessons: 20,
      completedLessons: 15,
      nextMilestone: 'Advanced Hooks',
      estimatedTime: '2 weeks'
    },
    {
      id: '2',
      skill: 'Python Fundamentals',
      progress: 40,
      totalLessons: 25,
      completedLessons: 10,
      nextMilestone: 'Object-Oriented Programming',
      estimatedTime: '3 weeks'
    },
    {
      id: '3',
      skill: 'UI/UX Design',
      progress: 60,
      totalLessons: 18,
      completedLessons: 11,
      nextMilestone: 'User Research Methods',
      estimatedTime: '1 week'
    },
    {
      id: '4',
      skill: 'TypeScript',
      progress: 90,
      totalLessons: 15,
      completedLessons: 14,
      nextMilestone: 'Advanced Types',
      estimatedTime: '3 days'
    }
  ];

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'First Steps',
      description: 'Complete your first lesson',
      icon: '🎯',
      unlocked: true,
      unlockedDate: '2024-01-15'
    },
    {
      id: '2',
      title: 'Consistent Learner',
      description: '7-day learning streak',
      icon: '🔥',
      unlocked: true,
      unlockedDate: '2024-01-18'
    },
    {
      id: '3',
      title: 'Knowledge Sharer',
      description: 'Help 5 community members',
      icon: '🤝',
      unlocked: true,
      unlockedDate: '2024-01-20'
    },
    {
      id: '4',
      title: 'Skill Master',
      description: 'Complete a full learning path',
      icon: '🏆',
      unlocked: false
    },
    {
      id: '5',
      title: 'Community Leader',
      description: 'Reach 1000 reputation points',
      icon: '👑',
      unlocked: false
    },
    {
      id: '6',
      title: 'Mentor',
      description: 'Successfully mentor 10 learners',
      icon: '🌟',
      unlocked: false
    }
  ];

  const weeklyGoals = [
    { task: 'Complete 3 React lessons', completed: true },
    { task: 'Answer 2 community questions', completed: true },
    { task: 'Practice TypeScript exercises', completed: false },
    { task: 'Review UI/UX principles', completed: false },
    { task: 'Join a skill swap session', completed: false }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Learning Path Tracker
        </h1>
        <p className="text-gray-600">
          Track your progress, achieve milestones, and unlock new skills.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Learning Paths */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Your Learning Paths
            </h2>
            
            <div className="space-y-6">
              {learningPaths.map((path) => (
                <div key={path.id} className="border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {path.skill}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {path.completedLessons}/{path.totalLessons} lessons
                    </span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Progress</span>
                      <span className="text-sm font-medium text-blue-600">{path.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${path.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        <span>Next: {path.nextMilestone}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{path.estimatedTime} remaining</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weekly Goals */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Weekly Goals
            </h2>
            
            <div className="space-y-3">
              {weeklyGoals.map((goal, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {goal.completed ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Circle className="w-5 h-5 text-gray-400" />
                  )}
                  <span className={`${goal.completed ? 'text-gray-900 line-through' : 'text-gray-700'}`}>
                    {goal.task}
                  </span>
                </div>
              ))}
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-blue-900">Weekly Progress</span>
                <span className="text-sm font-medium text-blue-600">
                  {weeklyGoals.filter(g => g.completed).length}/{weeklyGoals.length} completed
                </span>
              </div>
              <div className="mt-2 w-full bg-blue-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(weeklyGoals.filter(g => g.completed).length / weeklyGoals.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Study Streak */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Streak</h3>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">15</div>
              <p className="text-sm text-gray-600">days in a row</p>
              <p className="text-xs text-gray-500 mt-2">Keep it up! 🔥</p>
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Achievements
            </h3>
            
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`p-3 rounded-lg border ${
                    achievement.unlocked
                      ? 'bg-yellow-50 border-yellow-200'
                      : 'bg-gray-50 border-gray-200 opacity-60'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 text-sm">
                        {achievement.title}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {achievement.description}
                      </p>
                      {achievement.unlocked && achievement.unlockedDate && (
                        <p className="text-xs text-green-600 mt-1">
                          Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Courses */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Recommended for You
            </h3>
            
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 text-sm mb-1">
                  Advanced React Patterns
                </h4>
                <p className="text-xs text-blue-700">
                  Based on your React progress
                </p>
              </div>
              
              <div className="p-3 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900 text-sm mb-1">
                  Python for Data Science
                </h4>
                <p className="text-xs text-green-700">
                  Next step in your Python journey
                </p>
              </div>
              
              <div className="p-3 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900 text-sm mb-1">
                  Design Systems
                </h4>
                <p className="text-xs text-purple-700">
                  Complement your UI/UX skills
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningPath;