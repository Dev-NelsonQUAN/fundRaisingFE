import { ThemeToggle } from "./ThemeToggle";
import { ConnectionStatus } from "./ConnectionStatus";
import { MetricCard } from "./MetricCard";
import { CountdownTimer } from "./CountdownTimer";
import { useSocket } from "@/hooks/useSocket";
import { Activity, Zap, Target } from "lucide-react";

const FUNDRAISING_TARGET = 800000000;

function TargetMetricCard({ targetValue }: { targetValue: number }) {
  const formattedTarget = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(targetValue);

  return (
    <div
      className="metric-card group relative animate-fade-in"
      style={{ animationDelay: "0.2s" }}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-indigo-500/5 to-transparent" />

      <div className="absolute right-4 top-4 flex h-8 w-8 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
        <Target className="h-4 w-4 sm:h-6 sm:w-6" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Funds Target
          </span>
        </div>

        <div className="metric-value">
          {formattedTarget}
        </div>

        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
          <span className="text-xs text-muted-foreground">
            Total project goal
          </span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500/50 to-transparent" />
    </div>
  );
}

export function Dashboard() {
  const { data, isConnected, lastUpdate } = useSocket();

  const remainingFunds = FUNDRAISING_TARGET - data.amountIn;

  const fundsRaisedPercent = Math.min(
    100,
    (data.amountIn / FUNDRAISING_TARGET) * 100
  );

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
                {" "}
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
              <ConnectionStatus
                isConnected={isConnected}
                lastUpdate={lastUpdate}
              />
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="space-y-8">
          <section>
            <div className="mb-6 flex items-center gap-2">
              <Zap className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
              <h2 className="text-[14px] sm:text-lg font-semibold text-foreground">
                Live Metrics
              </h2>
              {!isConnected && (
                <span className="rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs font-medium text-yellow-600 dark:text-yellow-400">
                  Waiting for connection...
                </span>
              )}
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.1s" }}
              >
                <MetricCard
                  title="Funds In"
                  value={data.amountIn}
                  type="in"
                  lastUpdate={lastUpdate}
                />
              </div>

              {/* Funds Out - Commented out as requested
              <div
                className="animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                <MetricCard
                  title="Funds Out"
                  value={data.amountOut}
                  type="out"
                  lastUpdate={lastUpdate}
                />
              </div> 
              */}

              <TargetMetricCard targetValue={FUNDRAISING_TARGET} />
            </div>
          </section>

          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="metric-card flex items-center justify-between">
              <div>
                <span className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
                  Net (Remaining) Funds
                </span>
                <div className="mt-1 font-mono text-2xl sm:text-3xl font-bold text-foreground">
                  {new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN",
                    minimumFractionDigits: 0,
                    signDisplay: "always",
                  }).format(remainingFunds)}
                </div>
              </div>
              <div
                className={`flex h-8 w-8 sm:h-16 sm:w-16 items-center justify-center rounded-2xl ${
                  remainingFunds <= 0
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {remainingFunds <= 0 ? (
                  <svg
                    className="h-4 w-4 sm:h-8 sm:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-8 sm:w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                  </svg>
                )}
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-green-500 transition-all duration-500"
                style={{
                  width: `${fundsRaisedPercent}%`,
                }}
              />
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              {fundsRaisedPercent.toFixed(2)}% of N
              {FUNDRAISING_TARGET.toLocaleString()} raised.
            </p>
          </section>

          <section
            className="animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            <CountdownTimer />
          </section>
        </main>
      </div>
    </div>
  );
}
