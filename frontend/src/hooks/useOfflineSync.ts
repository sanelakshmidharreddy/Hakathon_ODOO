import { useState, useEffect, useCallback } from 'react';

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Read pending queue from localStorage if exists
    try {
      const queue = JSON.parse(localStorage.getItem('sunpower_offline_queue') || '[]');
      setPendingSyncCount(queue.length);
    } catch {
      setPendingSyncCount(0);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const queueAction = useCallback((action: { type: string; payload: unknown }) => {
    try {
      const queue = JSON.parse(localStorage.getItem('sunpower_offline_queue') || '[]');
      queue.push({ ...action, timestamp: new Date().toISOString() });
      localStorage.setItem('sunpower_offline_queue', JSON.stringify(queue));
      setPendingSyncCount(queue.length);
    } catch (err) {
      console.error('Failed to queue offline action:', err);
    }
  }, []);

  const clearQueue = useCallback(() => {
    localStorage.removeItem('sunpower_offline_queue');
    setPendingSyncCount(0);
  }, []);

  return { isOnline, pendingSyncCount, queueAction, clearQueue };
}
