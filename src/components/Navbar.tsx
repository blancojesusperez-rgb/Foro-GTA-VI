import React from 'react';
import { Volume2, VolumeX, Plus, Sparkles, User, Shield, LogIn, LogOut } from 'lucide-react';
import { UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onOpenNewThread: () => void;
  onOpenProfile: () => void;
  onOpenAuth: () => void;
  onLogout: () => void;
  currentUser: UserProfile | null;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  onOpenNewThread,
  onOpenProfile,
  onOpenAuth,
  onLogout,
  currentUser,
  isMuted,
  setIsMuted,
}) => {
  const handleToggleSound = () => {
    const next = soundManager.toggleMute();
    setIsMuted(next);
  };

  const navItems = [
    { id: 'debates', label: 'Debates' },
    { id: 'experiencias', label: 'Experiencias' },
    { id: 'categorias', label: 'Categorías' },
    { id: 'mapa', label: 'Mapa de Leonida' },
    { id: 'encuestas', label: 'Encuestas' },
    { id: 'filtraciones', label: 'Filtraciones' },
  ];


  return (
    <header className="sticky top-0 z-40 bg-[#0e0f1c]/95 backdrop-blur-md border-b border-[#21243d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                soundManager.playBlip();
                setCurrentTab('debates');
              }}
              className="flex items-center gap-2.5 text-left group transition-transform focus-visible:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-[#ff007a] via-[#f43f5e] to-[#00f0ff] p-[1.5px] shadow-sm group-hover:shadow-[0_0_15px_rgba(255,0,122,0.4)] transition-all">
                <div className="w-full h-full bg-[#0b0c16] rounded-[7px] flex items-center justify-center font-display font-black text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-[#ff007a] to-[#00f0ff]">
                  VI
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-black text-lg sm:text-xl tracking-tight text-white group-hover:text-[#00f0ff] transition-colors whitespace-nowrap">
                  LEONIDA<span className="text-[#ff007a] ml-1">FORUMS</span>
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (Single-line, unboxed, hover underline style) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundManager.playBlip();
                    setCurrentTab(item.id);
                  }}
                  className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'text-white font-semibold after:absolute after:bottom-[-8px] after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-[#ff007a] after:to-[#00f0ff]'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Actions (Sound toggle, auth / profile buttons, and primary + New Thread CTA) */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Activar efectos de sonido' : 'Silenciar efectos'}
              className="p-2 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-[#1a1c31] transition-colors"
              aria-label="Silenciar sonido"
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00f0ff]" />}
            </button>

            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    soundManager.playBlip();
                    onOpenProfile();
                  }}
                  className="flex items-center gap-2 p-1.5 pr-2.5 rounded-lg border border-[#252846] bg-[#141628] hover:border-[#383d6a] transition-colors group"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.username}
                    referrerPolicy="no-referrer"
                    className="w-6 h-6 rounded-full object-cover ring-1 ring-[#ff007a]"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <span className="text-xs font-medium text-slate-200 group-hover:text-white max-w-[100px] truncate hidden sm:inline">
                    {currentUser.username}
                  </span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playBlip();
                    onLogout();
                  }}
                  title="Cerrar sesión"
                  className="p-2 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-[#1a1c31] transition-colors"
                  aria-label="Cerrar sesión"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  soundManager.playBlip();
                  onOpenAuth();
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:text-white bg-[#1a1c32] hover:bg-[#25284b] border border-[#2b2f56] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <LogIn className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Acceder</span>
              </button>
            )}

            <button
              onClick={() => {
                soundManager.playBlip();
                if (!currentUser) {
                  onOpenAuth();
                } else {
                  onOpenNewThread();
                }
              }}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm hover:shadow-[0_0_15px_rgba(255,0,122,0.3)] transition-all whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
              <span className="hidden sm:inline">Crear Debate</span>
              <span className="sm:hidden">Nuevo</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav subbar */}
      <div className="md:hidden flex items-center justify-around border-t border-[#1e2139] px-2 py-2 overflow-x-auto text-xs bg-[#0b0c16]">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                soundManager.playBlip();
                setCurrentTab(item.id);
              }}
              className={`px-3 py-1.5 rounded-md whitespace-nowrap ${
                isActive ? 'bg-[#1e213b] text-white font-semibold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
