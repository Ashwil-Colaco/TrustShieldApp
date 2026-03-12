import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CYBER_TIPS from '@/constants/cyber-tips';

const STORAGE_KEY_DATE = '@trustshield:lastTipDate';
const STORAGE_KEY_READ = '@trustshield:tipRead';

/**
 * Returns today's date as a YYYY-MM-DD string (local time).
 */
function todayString(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Picks a tip for the current day so every user sees the same tip
 * on any given date. Uses day-of-year as the index seed.
 */
function getTipForToday(): string {
  const d = new Date();
  const start = new Date(d.getFullYear(), 0, 0);
  const diff = d.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return CYBER_TIPS[dayOfYear % CYBER_TIPS.length];
}

interface DailyTipResult {
  tip: string;
  hasUnread: boolean;
  markRead: () => Promise<void>;
}

export function useDailyTip(): DailyTipResult {
  const [tip] = useState<string>(getTipForToday);
  const [hasUnread, setHasUnread] = useState(false);

  useEffect(() => {
    (async () => {
      const today = todayString();
      const [savedDate, savedRead] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY_DATE),
        AsyncStorage.getItem(STORAGE_KEY_READ),
      ]);

      if (savedDate !== today) {
        // New day — fresh tip, mark as unread, save today's date
        await Promise.all([
          AsyncStorage.setItem(STORAGE_KEY_DATE, today),
          AsyncStorage.setItem(STORAGE_KEY_READ, 'false'),
        ]);
        setHasUnread(true);
      } else {
        // Same day — respect whether user already read it
        setHasUnread(savedRead !== 'true');
      }
    })();
  }, []);

  const markRead = useCallback(async () => {
    await AsyncStorage.setItem(STORAGE_KEY_READ, 'true');
    setHasUnread(false);
  }, []);

  return { tip, hasUnread, markRead };
}
