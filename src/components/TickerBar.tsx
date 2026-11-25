import React, { useState, useEffect } from 'react';
import { Search, Flame, Radio, Clock, AlertCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TickerBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
}

export const TickerBar: React.FC<TickerBarProps> = ({
  searchQuery,
  setSearchQuery,
  selectedTag,
  setSelectedTag,
}) => {
  // Target date for GTA VI release window (Autumn 2026)
  const targetDate = new Date('2026-10-15T00:00:00Z').getTime();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const newsItems = [
    'WEAZEL NEWS: Rockstar Games actualiza el registro de dominios de Leonida',
    'FILTRACIÓN: El mapa interactivo revela más de 45 interiores comerciales navegables',
    'RUMOR: Nuevas canciones de Tom Petty y Hall & Oates en la radio de Vice City',
    'COMUNIDAD: Proyecto cartográfico estima 125 km² de terreno habitable',
  ];

  const [currentNewsIdx, setCurrentNewsIdx] = useState(0);

  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsIdx((prev) => (prev + 1) % newsItems.length);
    }, 6000);
    return () => clearInterval(newsTimer);
  }, [newsItems.length]);

  return (
    <div className="bg-[#121324] border-b border-[#21243d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 text-xs">
          {/* Weazel News Ticker */}
          <div className="flex items-center gap-3 w-full lg:w-auto overflow-hidden">
            <span className="font-display font-black text-[11px] uppercase tracking-wider text-[#ff007a] bg-[#2a132b] px-2 py-0.5 rounded border border-[#ff007a]/30 shrink-0 flex items-center gap-1.5">
              <Radio className="w-3 h-3 text-[#00f0ff] animate-pulse" />
              WEAZEL FLASH
            </span>
            <div className="text-slate-300 truncate font-medium">
              {newsItems[currentNewsIdx]}
            </div>
          </div>

          {/* Countdown & Quick Search */}
          <div className="flex items-center justify-between lg:justify-end gap-4 w-full lg:w-auto shrink-0">
            {/* Countdown Badge */}
            <div className="flex items-center gap-2 text-slate-300 font-mono tabular-nums bg-[#181a30] px-2.5 py-1 rounded border border-[#2b2f54]">
              <Clock className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span className="text-slate-400 font-sans text-[11px] hidden sm:inline">Lanzamiento GTA VI:</span>
              <span className="text-white font-bold">{timeLeft.days}d</span>
              <span className="text-slate-500">:</span>
              <span className="text-[#00f0ff]">{String(timeLeft.hours).padStart(2, '0')}h</span>
              <span className="text-slate-500">:</span>
              <span className="text-[#00f0ff]">{String(timeLeft.minutes).padStart(2, '0')}m</span>
              <span className="text-slate-500">:</span>
              <span className="text-[#ff007a]">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>

            {/* Live Search Input */}
            <div className="relative w-48 sm:w-64">
              <input
                type="text"
                placeholder="Buscar debates, teorías..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#181a30] text-slate-200 placeholder-slate-500 text-xs rounded-lg pl-8 pr-3 py-1.5 border border-[#2a2d4f] focus:outline-none focus:border-[#00f0ff] transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
