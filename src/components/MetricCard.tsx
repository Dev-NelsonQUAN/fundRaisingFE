import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: number;
  type: 'in' | 'out';
  lastUpdate: Date | null;
}

export function MetricCard({ title, value, type, lastUpdate }: MetricCardProps) {
  const [animate, setAnimate] = useState(false);
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (value !== displayValue) {
      setAnimate(true);
      
      const startValue = displayValue;
      const endValue = value;
      const duration = 500;
      const steps = 20;
      const stepDuration = duration / steps;
      const increment = (endValue - startValue) / steps;
      
      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        if (currentStep >= steps) {
          setDisplayValue(endValue);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.round(startValue + increment * currentStep));
        }
      }, stepDuration);

      const animationTimer = setTimeout(() => setAnimate(false), 600);
      return () => {
        clearInterval(timer);
        clearTimeout(animationTimer);
      };
    }
  }, [value]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const Icon = type === 'in' ? TrendingUp : TrendingDown;
  const ArrowIcon = type === 'in' ? ArrowUpRight : ArrowDownRight;

  return (
    <div className={`metric-card group ${animate ? 'data-pulse' : ''}`}>
      <div 
        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
          type === 'in' 
            ? 'bg-gradient-to-br from-green-500/5 to-transparent' 
            : 'bg-gradient-to-br from-primary/5 to-transparent'
        }`} 
      />
      
      <div 
        className={`absolute right-4 top-4 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${
          type === 'in' 
            ? 'bg-green-500/10 text-green-500' 
            : 'bg-primary/10 text-primary'
        }`}
      >
        <Icon className="h-4 w-4 sm:h-6 sm:w-6" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            {title}
          </span>
          <ArrowIcon 
            className={`h-4 w-4 ${type === 'in' ? 'text-green-500' : 'text-primary'}`} 
          />
        </div>

        <div className="metric-value">
          {formatCurrency(displayValue)}
        </div>

        <div className="flex items-center gap-2">
          <div 
            className={`h-1.5 w-1.5 rounded-full ${
              type === 'in' ? 'bg-green-500' : 'bg-primary'
            } ${animate ? 'animate-ping' : ''}`} 
          />
          <span className="text-xs text-muted-foreground">
            {type === 'in' ? 'Total funds received' : 'Total funds distributed'}
          </span>
        </div>
      </div>

      <div 
        className={`absolute bottom-0 left-0 h-1 w-full ${
          type === 'in' 
            ? 'bg-gradient-to-r from-green-500/50 to-transparent' 
            : 'bg-gradient-to-r from-primary/50 to-transparent'
        }`} 
      />
    </div>
  );
}
