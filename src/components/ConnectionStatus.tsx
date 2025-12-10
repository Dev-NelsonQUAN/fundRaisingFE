import { Wifi, WifiOff } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  lastUpdate: Date | null;
}

export function ConnectionStatus({ isConnected, lastUpdate }: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2">
      <div className="flex items-center gap-2">
        <div className={`status-indicator ${isConnected ? 'status-connected' : 'status-disconnected'}`} />
        {isConnected ? (
          <Wifi className="h-4 w-4 text-green-500" />
        ) : (
          <WifiOff className="h-4 w-4 text-destructive" />
        )}
      </div>
      <div className="flex flex-col">
        <span className={`text-xs font-semibold ${isConnected ? 'text-green-500' : 'text-destructive'}`}>
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
        {lastUpdate && isConnected && (
          <span className="text-[10px] text-muted-foreground">
            Last update: {lastUpdate.toLocaleTimeString()}
          </span>
        )}
      </div>
    </div>
  );
}
