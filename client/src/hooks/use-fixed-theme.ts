import { useEffect } from 'react';

// This hook enforces a fixed light theme without switching capability
export default function useFixedTheme() {
  useEffect(() => {
    // Set only light theme on mount
    const htmlElement = document.documentElement;
    
    // Remove dark class and add light class
    htmlElement.classList.add('light');
    htmlElement.classList.remove('dark');
    
    // Set light theme body styles
    document.body.style.backgroundColor = 'hsl(0, 0%, 100%)';
    document.body.style.color = 'hsl(222, 47%, 11%)';
    
    // Clear any theme preferences from localStorage
    localStorage.removeItem('theme');
  }, []);

  return { theme: 'light' };
}