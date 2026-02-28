import { useEffect } from 'react';

type KeyboardCallback = (e: KeyboardEvent) => void;

interface KeyboardHandlers {
  [key: string]: KeyboardCallback;
}

export const useKeyboard = (handlers: KeyboardHandlers): void => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      handlers[e.key]?.(e);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlers]);
};
