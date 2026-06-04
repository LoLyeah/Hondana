'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const isInitialized = useRef(false);

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
    } finally {
      isInitialized.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

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
