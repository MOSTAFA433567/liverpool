import { Hexagon, Gamepad2 } from 'lucide-react';

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex items-center justify-center">
        <Hexagon className="w-10 h-10 text-secondary animate-[spin_10s_linear_infinite] opacity-50" />
        <Gamepad2 className="w-6 h-6 text-primary absolute drop-shadow-[0_0_8px_rgba(0,240,255,0.8)]" />
      </div>
      <div className="flex flex-col">
        <span className="font-headline font-black uppercase tracking-[0.2em] text-white text-lg leading-none glow-text">Liverpool</span>
        <span className="font-headline font-bold text-xs tracking-[0.3em] text-primary leading-none mt-1">Lounge</span>
      </div>
    </div>
  );
}
