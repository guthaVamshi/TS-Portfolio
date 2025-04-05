import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as Theme | null;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      
      return savedTheme || (prefersDark ? 'dark' : 'light');
    }
    return 'light';
  });

  useEffect(() => {
    // Initialize theme on mount
    const htmlElement = document.documentElement;
    const initialTheme = localStorage.getItem('theme') as Theme | null;
    
    if (initialTheme === 'dark' || (!initialTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      document.body.style.backgroundColor = 'hsl(222, 47%, 11%)';
      document.body.style.color = 'hsl(0, 0%, 100%)';
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      document.body.style.backgroundColor = 'hsl(0, 0%, 100%)';
      document.body.style.color = 'hsl(222, 47%, 11%)';
    }
  }, []);

  useEffect(() => {
    const htmlElement = document.documentElement;
    
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      document.body.style.backgroundColor = 'hsl(222, 47%, 11%)';
      document.body.style.color = 'hsl(0, 0%, 100%)';
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      document.body.style.backgroundColor = 'hsl(0, 0%, 100%)';
      document.body.style.color = 'hsl(222, 47%, 11%)';
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
}
