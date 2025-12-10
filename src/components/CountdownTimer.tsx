import { useCountdown } from "@/hooks/useCountdown";
import { Clock, Target } from "lucide-react";

interface TimerSegmentProps {
  value: number;
  label: string;
}

function TimerSegment({ value, label }: TimerSegmentProps) {
  return (
    <div className="timer-segment group flex flex-col items-center">
      <span className="timer-value text-2xl sm:text-5xl lg:text-6xl font-extrabold text-red-500">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="mt-1 text-[8px] sm:text-xs font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 px-0.5 sm:px-1">
      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse sm:h-2 sm:w-2" />
      <div
        className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse sm:h-2 sm:w-2"
        style={{ animationDelay: "0.5s" }}
      />
    </div>
  );
}

export function CountdownTimer() {
  const now = new Date();
  const targetYear =
    now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
  const targetDate = new Date(targetYear, 3, 1, 0, 0, 0);

  const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);
  const totalDays = Math.ceil(
    (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (isExpired) {
    return (
      <div className="metric-card text-center">
        <div className="flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">
            Target Date Reached!
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="metric-card">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-2 w-2 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-primary/10">
            <Clock className="h-3 w-3 sm:h-5 sm:w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-[10px] sm:text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Countdown to April 1st
            </h3>
            <p className="text-xs text-muted-foreground">
              {targetDate.toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="flex h-5 sm:h-8 items-center rounded-full bg-primary/10 px-2 sm:px-3">
          <span className="text-[10px] sm:text-sm font-semibold text-primary">
            LIVE
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-7 sm:px-6 sm:py-6 items-center justify-center gap-1 sm:gap-4">
        <TimerSegment value={days} label="Days" />
        <Separator />
        <TimerSegment value={hours} label="Hours" />
        <div className="hidden sm:block">
          <Separator />
        </div>
        <TimerSegment value={minutes} label="Minutes" />
        <Separator />
        <TimerSegment value={seconds} label="Seconds" />
      </div>

      {/* Progress indicator */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Campaign Progress</span>
          <span>{totalDays} days remaining</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
            style={{
              width: `${Math.max(5, 100 - (days / 365) * 100)}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

// import { useCountdown } from '@/hooks/useCountdown';
// import { Clock, Target } from 'lucide-react';

// interface TimerSegmentProps {
//   value: number;
//   label: string;
// }

// function TimerSegment({ value, label }: TimerSegmentProps) {
//   return (
//     <div className="timer-segment group">
//       <span className="timer-value">
//         {value.toString().padStart(2, '0')}
//       </span>
//       <span className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
//         {label}
//       </span>
//     </div>
//   );
// }

// function Separator() {
//   return (
//     <div className="flex flex-col items-center justify-center gap-2 px-1">
//       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
//       <div className="h-2 w-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
//     </div>
//   );
// }

// export function CountdownTimer() {
//   const now = new Date();
//   const targetYear = now.getMonth() >= 3 ? now.getFullYear() + 1 : now.getFullYear();
//   const targetDate = new Date(targetYear, 3, 1, 0, 0, 0);

//   const { days, hours, minutes, seconds, isExpired } = useCountdown(targetDate);

//   if (isExpired) {
//     return (
//       <div className="metric-card text-center">
//         <div className="flex items-center justify-center gap-3">
//           <Target className="h-8 w-8 text-primary" />
//           <span className="text-2xl font-bold text-primary">Target Date Reached!</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="metric-card">
//       {/* Header */}
//       <div className="mb-6 flex items-center justify-between">
//         <div className="flex items-center gap-3">
//           <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
//             <Clock className="h-5 w-5 text-primary" />
//           </div>
//           <div>
//             <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
//               Countdown to April 1st
//             </h3>
//             <p className="text-xs text-muted-foreground">
//               {targetDate.toLocaleDateString('en-US', {
//                 weekday: 'long',
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </p>
//           </div>
//         </div>
//         <div className="flex h-8 items-center rounded-full bg-primary/10 px-3">
//           <span className="text-xs font-semibold text-primary">LIVE</span>
//         </div>
//       </div>

//       <div className="flex items-center justify-center gap-2 sm:gap-4">
//         <TimerSegment value={days} label="Days" />
//         <Separator />
//         <TimerSegment value={hours} label="Hours" />
//         <Separator />
//         <TimerSegment value={minutes} label="Minutes" />
//         <Separator />
//         <TimerSegment value={seconds} label="Seconds" />
//       </div>

//       {/* Progress indicator */}
//       <div className="mt-6">
//         <div className="flex items-center justify-between text-xs text-muted-foreground">
//           <span>Campaign Progress</span>
//           <span>{days} days remaining</span>
//         </div>
//         <div className="mt-2 h-2 overflow-hidden rounded-full bg-muted">
//           <div
//             className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
//             style={{
//               width: `${Math.max(5, 100 - (days / 365) * 100)}%`,
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
