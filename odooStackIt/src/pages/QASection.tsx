import React, { useState } from 'react';
import { Search, Filter, Plus, ArrowUp, ArrowDown, MessageSquare, Check, X } from 'lucide-react';
import { Question } from '../types';

const QASection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showModal, setShowModal] = useState(false);

  const tags = ['React', 'JavaScript', 'Python', 'TypeScript', 'CSS', 'Node.js', 'Vue.js', 'Angular'];

  const mockQuestions: Question[] = [
    {
      id: '1',
      title: 'How to implement custom hooks in React for data fetching?',
      content: 'I\'m trying to create a reusable custom hook for API calls but struggling with error handling and loading states.',
      author: 'Sarah Chen',
      timestamp: '2024-01-20T10:30:00Z',
      answers: 5,
      votes: 12,
      tags: ['React', 'JavaScript', 'Hooks'],
      isResolved: false
    },
    {
      id: '2',
      title: 'Best practices for TypeScript interfaces vs types?',
      content: 'When should I use interfaces and when should I use type aliases in TypeScript? What are the performance implications?',
      author: 'Mike Rodriguez',
      timestamp: '2024-01-20T08:15:00Z',
      answers: 8,
      votes: 24,
      tags: ['TypeScript', 'JavaScript'],
      isResolved: true
    },
    {
      id: '3',
      title: 'Python async/await vs threading for I/O operations',
      content: 'I\'m confused about when to use async/await versus threading for handling multiple I/O operations in Python.',
      author: 'Emma Wilson',
      timestamp: '2024-01-19T16:45:00Z',
      answers: 3,
      votes: 8,
      tags: ['Python', 'Async'],
      isResolved: false
    },
    {
      id: '4',
      title: 'CSS Grid vs Flexbox - when to use which?',
      content: 'I understand both CSS Grid and Flexbox, but I\'m not sure when to choose one over the other for different layouts.',
      author: 'David Kim',
      timestamp: '2024-01-19T14:20:00Z',
      answers: 12,
      votes: 35,
      tags: ['CSS', 'Layout'],
      isResolved: true
    },
    {
      id: '5',
      title: 'Node.js memory leaks: How to debug and prevent them?',
      content: 'My Node.js application is experiencing memory leaks in production. What are the best tools and techniques to identify and fix them?',
      author: 'Alex Thompson',
      timestamp: '2024-01-18T11:30:00Z',
      answers: 6,
      votes: 18,
      tags: ['Node.js', 'Performance'],
      isResolved: false
    },
    {
      id: '6',
      title: 'Vue 3 Composition API vs Options API comparison',
      content: 'What are the main differences between Composition API and Options API in Vue 3? When should I use each approach?',
      author: 'Lisa Park',
      timestamp: '2024-01-17T09:15:00Z',
      answers: 4,
      votes: 14,
      tags: ['Vue.js', 'JavaScript'],
      isResolved: true
    }
  ];

  const filteredQuestions = mockQuestions.filter(question => {
    const matchesSearch = question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || question.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  const sortedQuestions = [...filteredQuestions].sort((a, b) => {
    switch (sortBy) {
      case 'votes':
        return b.votes - a.votes;
      case 'answers':
        return b.answers - a.answers;
      case 'recent':
      default:
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    }
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Questions & Answers
          </h1>
          <p className="text-gray-600">
            Ask questions, share knowledge, and help the community grow.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="mt-4 sm:mt-0 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Ask Question
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Sort */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="recent">Most Recent</option>
                <option value="votes">Most Votes</option>
                <option value="answers">Most Answers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTag('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              !selectedTag
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {sortedQuestions.map((question) => (
          <div
            key={question.id}
            className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex gap-4">
              {/* Vote buttons */}
              <div className="flex flex-col items-center space-y-2">
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ArrowUp className="w-5 h-5 text-gray-600" />
                </button>
                <span className="font-medium text-gray-900">
                  {question.votes}
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <ArrowDown className="w-5 h-5 text-gray-600" />
                </button>
                {question.isResolved && (
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                )}
              </div>

              {/* Question content */}
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer">
                  {question.title}
                </h3>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {question.content}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Meta info */}
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>by {question.author}</span>
                    <span>{new Date(question.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{question.answers} answers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Ask Question Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Ask a Question
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Title
                </label>
                <input
                  type="text"
                  placeholder="Be specific and imagine you're asking a question to another person"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Question Details
                </label>
                <textarea
                  rows={6}
                  placeholder="Include all the information someone would need to answer your question"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  placeholder="Add up to 5 tags to describe what your question is about"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Post Question
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-900 py-3 px-4 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QASection;