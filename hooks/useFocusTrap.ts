'use client';

import { useEffect, RefObject } from 'react';

/**
 * Custom hook to trap focus within a container, handle Escape key, and inert sibling nodes.
 * @param ref Ref to the container element containing focusable elements.
 * @param isOpen Boolean indicating if the modal/drawer is open.
 * @param onClose Optional callback triggered when the user presses Escape.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  isOpen: boolean,
  onClose?: () => void
) {
  useEffect(() => {
    if (!isOpen || !ref.current) return;

    const element = ref.current;
    
    // Find all focusable elements
    const focusableSelectors = [
      'a[href]',
      'area[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      'button:not([disabled])',
      'iframe',
      'object',
      'embed',
      '[contenteditable]',
      '[tabindex]:not([tabindex="-1"])'
    ].join(',');

    const getFocusableElements = (): HTMLElement[] => {
      return Array.from(element.querySelectorAll(focusableSelectors));
    };

    // Auto focus the first element or the modal container
    const focusables = getFocusableElements();
    const previouslyFocused = document.activeElement as HTMLElement;

    if (focusables.length > 0) {
      // Small timeout to allow transition animations to finish
      const timer = setTimeout(() => {
        focusables[0].focus();
      }, 50);
      return () => clearTimeout(timer);
    } else {
      element.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (onClose) {
          onClose();
        }
        return;
      }

      if (e.key !== 'Tab') return;

      const currentFocusables = getFocusableElements();
      if (currentFocusables.length === 0) {
        e.preventDefault();
        return;
      }

      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];

      if (e.shiftKey) {
        // Shift + Tab: wrap around to last if activeElement is first
        if (document.activeElement === first) {
          last.focus();
          e.preventDefault();
        }
      } else {
        // Tab: wrap around to first if activeElement is last
        if (document.activeElement === last) {
          first.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Apply inert and aria-hidden to all siblings of the modal container
    // We walk up to find the root sibling
    let topParent = element;
    while (topParent.parentElement && topParent.parentElement !== document.body) {
      topParent = topParent.parentElement;
    }

    const siblings: HTMLElement[] = [];
    if (document.body) {
      Array.from(document.body.children).forEach((child) => {
        const htmlChild = child as HTMLElement;
        if (htmlChild && htmlChild !== topParent && !htmlChild.contains(element)) {
          htmlChild.setAttribute('aria-hidden', 'true');
          (htmlChild as any).inert = true;
          siblings.push(htmlChild);
        }
      });
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      
      // Restore attributes
      siblings.forEach((sibling) => {
        sibling.removeAttribute('aria-hidden');
        (sibling as any).inert = false;
      });

      // Restore focus
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [isOpen, ref, onClose]);
}
