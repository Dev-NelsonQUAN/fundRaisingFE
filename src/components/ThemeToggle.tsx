import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-10 w-20 items-center rounded-full border border-border bg-secondary transition-all duration-300 hover:border-primary/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span
        className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform duration-300 ${
          theme === 'dark' ? 'translate-x-9' : 'translate-x-0'
        }`}
      >
        {theme === 'light' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </span>
      <span className="absolute left-3 text-xs font-medium text-muted-foreground">
        {theme === 'dark' && <Sun className="h-3 w-3" />}
      </span>
      <span className="absolute right-3 text-xs font-medium text-muted-foreground">
        {theme === 'light' && <Moon className="h-3 w-3" />}
      </span>
    </button>
  );
}
