'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // State to store our value, initialized lazily to avoid double-renders and perform O(1) initial reads
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed === null || parsed === undefined) {
          return initialValue;
        } else if (typeof initialValue === 'object' && typeof parsed === 'object') {
          if (Array.isArray(initialValue) && Array.isArray(parsed)) {
            return parsed as unknown as T;
          } else if (!Array.isArray(initialValue) && !Array.isArray(parsed)) {
            // Merge settings/stats schemas to prevent missing properties crash
            return { ...initialValue, ...parsed };
          } else {
            return parsed;
          }
        } else {
          return parsed;
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    return initialValue;
  });

  const isInitialized = useRef(true);

  // Sync to localStorage with debounce
  useEffect(() => {
    if (!isInitialized.current) return;

    const handler = setTimeout(() => {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [key, storedValue]);

  // Return a wrapped version of useState's setter function that triggers state update.
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prevVal) => {
        const valueToStore = value instanceof Function ? value(prevVal) : value;
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}
