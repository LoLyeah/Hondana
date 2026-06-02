'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  // Initialize value from localStorage on client side mount
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed === null || parsed === undefined) {
          setStoredValue(initialValue);
        } else if (typeof initialValue === 'object' && typeof parsed === 'object') {
          if (Array.isArray(initialValue) && Array.isArray(parsed)) {
            setStoredValue(parsed as unknown as T);
          } else if (!Array.isArray(initialValue) && !Array.isArray(parsed)) {
            // Merge settings/stats schemas to prevent missing properties crash
            setStoredValue({ ...initialValue, ...parsed });
          } else {
            setStoredValue(parsed);
          }
        } else {
          setStoredValue(parsed);
        }
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      setStoredValue(initialValue);
    }
  }, [key]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      setStoredValue((prevVal) => {
        const valueToStore = value instanceof Function ? value(prevVal) : value;
        if (typeof window !== 'undefined') {
          window.localStorage.setItem(key, JSON.stringify(valueToStore));
        }
        return valueToStore;
      });
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
