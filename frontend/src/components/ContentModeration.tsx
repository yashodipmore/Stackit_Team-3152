import React, { useState } from 'react';
import {
  FaFlag,
  FaEye,
  FaCheck,
  FaTimes,
  FaTrash,
  FaEdit,
  FaUser,
  FaComments,
  FaQuestionCircle,
  FaClock,
  FaFilter,
  FaSearch,
  FaExclamationTriangle
} from './Icons';

export interface ContentReport {
  id: string;
  type: 'question' | 'answer' | 'comment';
  contentId: string;
  content: {
    title?: string;
    text: string;
    author: {
      id: string;
      username: string;
      avatar?: string;
    };
    createdAt: string;
  };
  reporter: {
    id: string;
    username: string;
  };
  reason: string;
  category: 'spam' | 'inappropriate' | 'harassment' | 'misinformation' | 'copyright' | 'other';
  status: 'pending' | 'reviewing' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignedModerator?: string;
  reportedAt: string;
  resolvedAt?: string;
  moderatorNotes?: string;
}

interface ContentModerationProps {
  reports: ContentReport[];
  onResolveReport: (reportId: string, action: 'approve' | 'remove' | 'warn', notes?: string) => void;
  onDismissReport: (reportId: string, notes?: string) => void;
  onAssignModerator: (reportId: string, moderatorId: string) => void;
}

const ContentModeration: React.FC<ContentModerationProps> = ({
  reports,
  onResolveReport,
  onDismissReport,
  onAssignModerator
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedReport, setSelectedReport] = useState<ContentReport | null>(null);
  const [moderatorNotes, setModeratorNotes] = useState('');
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [selectedAction, setSelectedAction] = useState<'approve' | 'remove' | 'warn' | 'dismiss' | null>(null);

  const getContentIcon = (type: string) => {
    switch (type) {
      case 'question': return <FaQuestionCircle style={{ color: '#007bff' }} />;
      case 'answer': return <FaComments style={{ color: '#28a745' }} />;
      case 'comment': return <FaComments style={{ color: '#6f42c1' }} />;
      default: return <FaFlag />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return '#dc3545';
      case 'high': return '#fd7e14';
      case 'medium': return '#ffc107';
      case 'low': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'reviewing': return '#17a2b8';
      case 'resolved': return '#28a745';
      case 'dismissed': return '#6c757d';
      default: return '#6c757d';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'spam': return '🚫';
      case 'inappropriate': return '⚠️';
      case 'harassment': return '👮';
      case 'misinformation': return '❌';
      case 'copyright': return '©️';
      default: return '❓';
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.content.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.content.author.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || report.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || report.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || report.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const handleAction = () => {
    if (selectedReport && selectedAction) {
      if (selectedAction === 'dismiss') {
        onDismissReport(selectedReport.id, moderatorNotes);
      } else {
        onResolveReport(selectedReport.id, selectedAction, moderatorNotes);
      }
      setShowActionDialog(false);
      setSelectedReport(null);
      setSelectedAction(null);
      setModeratorNotes('');
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Less than an hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} days ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <FaFlag style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
        <h2 style={{ margin: 0, fontWeight: '600' }}>Content Moderation</h2>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Review reported content and take appropriate actions
        </p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '1rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderBottom: '1px solid #e9ecef'
      }}>
        {[
          { label: 'Pending', value: reports.filter(r => r.status === 'pending').length, color: '#ffc107' },
          { label: 'Reviewing', value: reports.filter(r => r.status === 'reviewing').length, color: '#17a2b8' },
          { label: 'Critical', value: reports.filter(r => r.priority === 'critical').length, color: '#dc3545' },
          { label: 'Today', value: reports.filter(r => new Date(r.reportedAt).toDateString() === new Date().toDateString()).length, color: '#28a745' }
        ].map((stat, index) => (
          <div
            key={index}
            style={{
              background: 'white',
              padding: '1rem',
              borderRadius: '8px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: stat.color,
              marginBottom: '0.5rem'
            }}>
              {stat.value}
            </div>
            <div style={{
              color: '#6c757d',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e9ecef'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Search Reports
            </label>
            <div style={{ position: 'relative' }}>
              <FaSearch style={{
                position: 'absolute',
                left: '0.75rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6c757d'
              }} />
              <input
                type="text"
                placeholder="Search content, users, or reasons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #ced4da',
                  borderRadius: '8px',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="reviewing">Reviewing</option>
              <option value="resolved">Resolved</option>
              <option value="dismissed">Dismissed</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Category
            </label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Categories</option>
              <option value="spam">Spam</option>
              <option value="inappropriate">Inappropriate</option>
              <option value="harassment">Harassment</option>
              <option value="misinformation">Misinformation</option>
              <option value="copyright">Copyright</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Priority
            </label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem'
              }}
            >
              <option value="all">All Priorities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {filteredReports.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#6c757d'
          }}>
            <FaFlag style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }} />
            <h4 style={{ marginBottom: '0.5rem' }}>No reports found</h4>
            <p style={{ margin: 0 }}>
              {statusFilter === 'pending' ? 'All reports have been reviewed!' : 'No reports match your filters.'}
            </p>
          </div>
        ) : (
          <div style={{ padding: '0.5rem' }}>
            {filteredReports.map((report) => (
              <div
                key={report.id}
                style={{
                  border: '1px solid #e9ecef',
                  borderLeft: `4px solid ${getPriorityColor(report.priority)}`,
                  borderRadius: '8px',
                  margin: '0.5rem',
                  padding: '1.5rem',
                  background: report.status === 'pending' ? '#fff9e6' : 'white',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '1rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {getContentIcon(report.type)}
                    <div>
                      <h4 style={{
                        margin: 0,
                        fontSize: '1.1rem',
                        color: '#2c3e50'
                      }}>
                        {report.content.title || `${report.type.charAt(0).toUpperCase() + report.type.slice(1)} Report`}
                      </h4>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginTop: '0.25rem'
                      }}>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.85rem',
                          color: '#6c757d'
                        }}>
                          <FaUser />
                          {report.content.author.username}
                        </span>
                        <span style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          fontSize: '0.85rem',
                          color: '#6c757d'
                        }}>
                          <FaClock />
                          {getTimeAgo(report.reportedAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: getPriorityColor(report.priority),
                      color: 'white'
                    }}>
                      {report.priority.toUpperCase()}
                    </span>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '500',
                      background: getStatusColor(report.status),
                      color: 'white'
                    }}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div style={{
                  background: '#f8f9fa',
                  padding: '1rem',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div style={{
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    color: '#2c3e50',
                    marginBottom: '0.75rem'
                  }}>
                    {report.content.text}
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  background: '#fff3cd',
                  borderRadius: '8px',
                  marginBottom: '1rem'
                }}>
                  <div>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.25rem'
                    }}>
                      <span style={{ fontSize: '1.2rem' }}>{getCategoryIcon(report.category)}</span>
                      <strong style={{ color: '#856404' }}>
                        {report.category.charAt(0).toUpperCase() + report.category.slice(1)}
                      </strong>
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#856404' }}>
                      <strong>Reported by:</strong> {report.reporter.username}
                    </div>
                    <div style={{ fontSize: '0.9rem', color: '#856404', marginTop: '0.25rem' }}>
                      <strong>Reason:</strong> {report.reason}
                    </div>
                  </div>
                </div>

                {report.status === 'pending' && (
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    justifyContent: 'flex-end'
                  }}>
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setSelectedAction('approve');
                        setShowActionDialog(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#28a745',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FaCheck />
                      Approve
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setSelectedAction('warn');
                        setShowActionDialog(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#ffc107',
                        color: '#212529',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FaExclamationTriangle />
                      Warn
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setSelectedAction('remove');
                        setShowActionDialog(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        border: 'none',
                        borderRadius: '6px',
                        background: '#dc3545',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FaTrash />
                      Remove
                    </button>
                    
                    <button
                      onClick={() => {
                        setSelectedReport(report);
                        setSelectedAction('dismiss');
                        setShowActionDialog(true);
                      }}
                      style={{
                        padding: '0.5rem 1rem',
                        border: '1px solid #6c757d',
                        borderRadius: '6px',
                        background: 'white',
                        color: '#6c757d',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.25rem'
                      }}
                    >
                      <FaTimes />
                      Dismiss
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Dialog */}
      {showActionDialog && selectedReport && selectedAction && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
          }}>
            <h3 style={{ margin: '0 0 1rem 0', color: '#2c3e50' }}>
              {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)} Content
            </h3>
            <p style={{ margin: '0 0 1rem 0', color: '#6c757d' }}>
              {selectedAction === 'approve' && 'Content will be marked as approved and no action will be taken.'}
              {selectedAction === 'warn' && 'A warning will be sent to the content author.'}
              {selectedAction === 'remove' && 'Content will be permanently removed from the platform.'}
              {selectedAction === 'dismiss' && 'Report will be dismissed with no action taken.'}
            </p>
            <textarea
              value={moderatorNotes}
              onChange={(e) => setModeratorNotes(e.target.value)}
              placeholder="Add moderator notes (optional)..."
              style={{
                width: '100%',
                minHeight: '100px',
                padding: '0.75rem',
                border: '1px solid #ced4da',
                borderRadius: '8px',
                fontSize: '0.9rem',
                resize: 'vertical'
              }}
            />
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem',
              justifyContent: 'flex-end'
            }}>
              <button
                onClick={() => {
                  setShowActionDialog(false);
                  setSelectedReport(null);
                  setSelectedAction(null);
                  setModeratorNotes('');
                }}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #6c757d',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#6c757d',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAction}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: selectedAction === 'remove' ? '#dc3545' : 
                            selectedAction === 'warn' ? '#ffc107' : 
                            selectedAction === 'approve' ? '#28a745' : '#6c757d',
                  color: selectedAction === 'warn' ? '#212529' : 'white',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Confirm {selectedAction.charAt(0).toUpperCase() + selectedAction.slice(1)}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentModeration;
