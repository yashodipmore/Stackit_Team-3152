import React, { useState } from 'react';
import {
  FaBell,
  FaEnvelope,
  FaMobile,
  FaComments,
  FaThumbsUp,
  FaCheck,
  FaUser,
  FaCog,
  FaSave,
  FaReset
} from './Icons';

export interface NotificationPreference {
  id: string;
  label: string;
  description: string;
  type: 'answer' | 'vote' | 'accept' | 'comment' | 'mention' | 'newsletter';
  channels: {
    web: boolean;
    email: boolean;
    push: boolean;
  };
  frequency: 'instant' | 'daily' | 'weekly' | 'disabled';
}

interface NotificationPreferencesProps {
  preferences: NotificationPreference[];
  onUpdatePreferences: (preferences: NotificationPreference[]) => void;
  onSave: () => void;
}

const NotificationPreferences: React.FC<NotificationPreferencesProps> = ({
  preferences,
  onUpdatePreferences,
  onSave
}) => {
  const [localPreferences, setLocalPreferences] = useState<NotificationPreference[]>(preferences);
  const [hasChanges, setHasChanges] = useState(false);

  const getIcon = (type: NotificationPreference['type']) => {
    switch (type) {
      case 'answer':
        return <FaComments style={{ color: '#007bff' }} />;
      case 'vote':
        return <FaThumbsUp style={{ color: '#28a745' }} />;
      case 'accept':
        return <FaCheck style={{ color: '#28a745' }} />;
      case 'comment':
        return <FaComments style={{ color: '#6f42c1' }} />;
      case 'mention':
        return <FaUser style={{ color: '#fd7e14' }} />;
      case 'newsletter':
        return <FaEnvelope style={{ color: '#17a2b8' }} />;
      default:
        return <FaBell style={{ color: '#6c757d' }} />;
    }
  };

  const updatePreference = (id: string, field: keyof NotificationPreference, value: any) => {
    const updated = localPreferences.map(pref => {
      if (pref.id === id) {
        return { ...pref, [field]: value };
      }
      return pref;
    });
    setLocalPreferences(updated);
    setHasChanges(true);
  };

  const updateChannel = (id: string, channel: keyof NotificationPreference['channels'], value: boolean) => {
    const updated = localPreferences.map(pref => {
      if (pref.id === id) {
        return {
          ...pref,
          channels: { ...pref.channels, [channel]: value }
        };
      }
      return pref;
    });
    setLocalPreferences(updated);
    setHasChanges(true);
  };

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
    onSave();
    setHasChanges(false);
  };

  const handleReset = () => {
    setLocalPreferences(preferences);
    setHasChanges(false);
  };

  const handleQuickToggle = (enabled: boolean) => {
    const updated = localPreferences.map(pref => ({
      ...pref,
      channels: {
        web: enabled,
        email: enabled,
        push: enabled
      },
      frequency: enabled ? 'instant' as const : 'disabled' as const
    }));
    setLocalPreferences(updated);
    setHasChanges(true);
  };

  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <FaCog style={{ fontSize: '2.5rem', marginBottom: '1rem' }} />
        <h2 style={{ margin: 0, fontWeight: '600' }}>Notification Preferences</h2>
        <p style={{ margin: '0.5rem 0 0 0', opacity: 0.9 }}>
          Customize how and when you receive notifications
        </p>
      </div>

      {/* Quick Actions */}
      <div style={{
        padding: '1.5rem',
        borderBottom: '1px solid #e9ecef',
        background: '#f8f9fa'
      }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#495057' }}>Quick Actions</h4>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={() => handleQuickToggle(true)}
            style={{
              padding: '0.75rem 1.5rem',
              border: 'none',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
              color: 'white',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FaBell />
            Enable All Notifications
          </button>
          <button
            onClick={() => handleQuickToggle(false)}
            style={{
              padding: '0.75rem 1.5rem',
              border: '1px solid #dc3545',
              borderRadius: '8px',
              background: 'white',
              color: '#dc3545',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <FaBell />
            Disable All Notifications
          </button>
        </div>
      </div>

      {/* Preferences List */}
      <div style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {localPreferences.map((preference) => (
            <div
              key={preference.id}
              style={{
                border: '1px solid #e9ecef',
                borderRadius: '12px',
                padding: '1.5rem',
                background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '1rem',
                marginBottom: '1.5rem'
              }}>
                <div style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                }}>
                  {getIcon(preference.type)}
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c3e50' }}>
                    {preference.label}
                  </h4>
                  <p style={{ margin: 0, color: '#6c757d', fontSize: '0.9rem' }}>
                    {preference.description}
                  </p>
                </div>
              </div>

              {/* Frequency Setting */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: '500',
                  color: '#495057'
                }}>
                  Frequency
                </label>
                <select
                  value={preference.frequency}
                  onChange={(e) => updatePreference(preference.id, 'frequency', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #ced4da',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: 'white'
                  }}
                >
                  <option value="instant">Instant</option>
                  <option value="daily">Daily digest</option>
                  <option value="weekly">Weekly digest</option>
                  <option value="disabled">Disabled</option>
                </select>
              </div>

              {/* Channel Settings */}
              {preference.frequency !== 'disabled' && (
                <div>
                  <label style={{
                    display: 'block',
                    marginBottom: '1rem',
                    fontWeight: '500',
                    color: '#495057'
                  }}>
                    Delivery Channels
                  </label>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: preference.channels.web ? '#e3f2fd' : 'white',
                      border: `2px solid ${preference.channels.web ? '#2196f3' : '#e9ecef'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      <input
                        type="checkbox"
                        checked={preference.channels.web}
                        onChange={(e) => updateChannel(preference.id, 'web', e.target.checked)}
                        style={{ margin: 0 }}
                      />
                      <FaBell style={{ color: preference.channels.web ? '#2196f3' : '#6c757d' }} />
                      <span style={{ 
                        fontWeight: preference.channels.web ? '600' : '400',
                        color: preference.channels.web ? '#2196f3' : '#6c757d'
                      }}>
                        Web Notifications
                      </span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: preference.channels.email ? '#e8f5e8' : 'white',
                      border: `2px solid ${preference.channels.email ? '#4caf50' : '#e9ecef'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      <input
                        type="checkbox"
                        checked={preference.channels.email}
                        onChange={(e) => updateChannel(preference.id, 'email', e.target.checked)}
                        style={{ margin: 0 }}
                      />
                      <FaEnvelope style={{ color: preference.channels.email ? '#4caf50' : '#6c757d' }} />
                      <span style={{ 
                        fontWeight: preference.channels.email ? '600' : '400',
                        color: preference.channels.email ? '#4caf50' : '#6c757d'
                      }}>
                        Email Notifications
                      </span>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem',
                      background: preference.channels.push ? '#fff3e0' : 'white',
                      border: `2px solid ${preference.channels.push ? '#ff9800' : '#e9ecef'}`,
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      <input
                        type="checkbox"
                        checked={preference.channels.push}
                        onChange={(e) => updateChannel(preference.id, 'push', e.target.checked)}
                        style={{ margin: 0 }}
                      />
                      <FaMobile style={{ color: preference.channels.push ? '#ff9800' : '#6c757d' }} />
                      <span style={{ 
                        fontWeight: preference.channels.push ? '600' : '400',
                        color: preference.channels.push ? '#ff9800' : '#6c757d'
                      }}>
                        Push Notifications
                      </span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        {hasChanges && (
          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: '#f8f9fa',
            borderRadius: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <p style={{ margin: 0, color: '#6c757d' }}>
              You have unsaved changes
            </p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                onClick={handleReset}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: '1px solid #6c757d',
                  borderRadius: '8px',
                  background: 'white',
                  color: '#6c757d',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FaReset />
                Reset
              </button>
              <button
                onClick={handleSave}
                style={{
                  padding: '0.75rem 1.5rem',
                  border: 'none',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <FaSave />
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPreferences;
