import React, { createContext, useContext, useState } from 'react';
import Notification from '../components/Notification';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = 'info', duration = 3000) => {
    const id = Date.now() + Math.random();
    const notification = { id, message, type, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto-remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
    
    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const showError = (message, duration = 5000) => {
    return showNotification(message, 'error', duration);
  };

  const showSuccess = (message, duration = 3000) => {
    return showNotification(message, 'success', duration);
  };

  const showWarning = (message, duration = 4000) => {
    return showNotification(message, 'warning', duration);
  };

  const showInfo = (message, duration = 3000) => {
    return showNotification(message, 'info', duration);
  };

  const value = {
    showNotification,
    removeNotification,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      {notifications.map(notification => (
        <Notification
          key={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </NotificationContext.Provider>
  );
};
