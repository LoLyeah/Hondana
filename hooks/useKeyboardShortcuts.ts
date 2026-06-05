import { useEffect, useRef } from 'react';

type ShortcutMap = Record<string, (e: KeyboardEvent) => void>;

export function useKeyboardShortcuts(shortcuts: ShortcutMap, enabled = true) {
  const shortcutsRef = useRef<ShortcutMap>(shortcuts);
  
  // Keep the ref updated with the latest shortcut handlers safely in useEffect
  useEffect(() => {
    shortcutsRef.current = shortcuts;
  });

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      // Skip if focused on a text input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
      if ((e.target as HTMLElement)?.isContentEditable) return;
      // Skip if modifier keys held (e.g. Ctrl+R = reload)
      if (e.ctrlKey || e.metaKey || e.altKey) return;

      const currentShortcuts = shortcutsRef.current;
      const fn = currentShortcuts[e.key] || currentShortcuts[e.key.toLowerCase()];
      if (fn) {
        e.preventDefault();
        fn(e);
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [enabled]);
}

