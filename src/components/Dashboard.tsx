import { ThemeToggle } from './ThemeToggle';
import { ConnectionStatus } from './ConnectionStatus';
import { MetricCard } from './MetricCard';
import { CountdownTimer } from './CountdownTimer';
import { useSocket } from '@/hooks/useSocket';
import { Activity, Zap } from 'lucide-react';

export function Dashboard() {
  const { data, isConnected, lastUpdate } = useSocket();

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex h-6 w-6 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg animate-glow-pulse">
                <Activity className="h-4 w-4 sm:h-7 sm:w-7" />
              </div>
              <div>
                <h1 className="text-[14px] font-bold tracking-normal sm:tracking-tight text-foreground sm:text-3xl">
                  Real-time Fundraising and Timer Dashboard
                </h1>
                <p className="mt-1 text-[10px] sm:text-sm text-muted-foreground">
                  Live metrics and countdown tracking
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ConnectionStatus isConnected={isConnected} lastUpdate={lastUpdate} />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section>
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
              <h2 className="text-[14px] sm:text-lg font-semibold text-foreground">Live Metrics</h2>
              {!isConnected && (
                <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  Waiting for connection...
                </span>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <MetricCard
                  title="Funds In"
                  value={data.amountIn}
                  type="in"
                  lastUpdate={lastUpdate}
                />
              </div>
              <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <MetricCard
                  title="Funds Out"
                  value={data.amountOut}
                  type="out"
                  lastUpdate={lastUpdate}
                />
              </div>
            </div>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="metric-card flex items-center justify-between">
              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Net Funds
                </span>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-foreground">
                  {new Intl.NumberFormat('en-NG', {
                    style: 'currency',
                    currency: 'NGN',
                    minimumFractionDigits: 0,
                    signDisplay: 'always',
                  }).format(data.amountIn - data.amountOut)}
                </div>
              </div>
              <div className={`flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center rounded-2xl ${
                data.amountIn - data.amountOut >= 0 
                  ? 'bg-green-500/10 text-green-500' 
                  : 'bg-red-500/10 text-red-500'
              }`}>
                {data.amountIn - data.amountOut >= 0 ? (
                  <svg className="h-4 w-4 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
                  </svg>
                )}
              </div>
            </div>
          </section>

          <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CountdownTimer />
          </section>
        </main>

        {/* Footer */}
        {/* <footer className="mt-12 border-t border-border pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Real-time data powered by Socket.IO • Dashboard updates automatically
          </p>
        </footer> */}
      </div>
    </div>
  );
}
