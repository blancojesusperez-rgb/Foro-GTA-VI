import React, { useState } from 'react';
import { X, User, Shield, Award, Check, Sparkles, MessageSquare } from 'lucide-react';
import { UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface UserProfileModalProps {
  currentUser: UserProfile;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Partial<UserProfile>) => void;
}

const PRESET_AVATARS = [
  '/src/assets/images/gta6_forum_avatar_1795625161117.jpg',
  'https://api.dicebear.com/7.x/bottts/svg?seed=GladesRunner',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=StoryTeller',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CartoLeonida',
  'https://api.dicebear.com/7.x/avataaars/svg?seed=Lowrider',
  'https://api.dicebear.com/7.x/bottts/svg?seed=CodeVice',
];

const PRESET_RANKS = [
  'Novato de Vice Beach',
  'Traficante de Port Gellhorn',
  'Capo de Ocean Drive',
  'Investigador de Leaks',
  'Veterano de Los Santos',
  'Piloto de Las Marismas',
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  currentUser,
  isOpen,
  onClose,
  onSave,
}) => {
  if (!isOpen) return null;

  const [username, setUsername] = useState(currentUser.username);
  const [avatar, setAvatar] = useState(currentUser.avatar);
  const [rank, setRank] = useState(currentUser.rank);
  const [signature, setSignature] = useState(currentUser.signature);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playUpvote();
    onSave({
      username: username.trim() || currentUser.username,
      avatar,
      rank,
      signature: signature.trim(),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#131527] border border-[#262a4d] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-[#21243f] pb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-[#00f0ff]" />
            <h2 className="font-display font-extrabold text-lg text-white">
              Perfil de Usuario · {currentUser.username}
            </h2>
          </div>
          <button
            onClick={() => {
              soundManager.playBlip();
              onClose();
            }}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-[#1f223f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Stats Cards */}
        <div className="grid grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#0e101f] border border-[#21243f] text-center">
          <div>
            <div className="text-[11px] text-slate-400">Reputación</div>
            <div className="text-base font-bold font-mono text-[#00f0ff] tabular-nums">
              {currentUser.reputation}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Publicaciones</div>
            <div className="text-base font-bold font-mono text-white tabular-nums">
              {currentUser.postsCount}
            </div>
          </div>
          <div>
            <div className="text-[11px] text-slate-400">Insignia</div>
            <div className="text-xs font-bold text-[#ff007a] truncate mt-0.5">
              {currentUser.badge || 'Miembro'}
            </div>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4 text-xs sm:text-sm">
          {/* Avatar selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Seleccionar Avatar</label>
            <div className="flex items-center gap-3 flex-wrap">
              {PRESET_AVATARS.map((avUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundManager.playBlip();
                    setAvatar(avUrl);
                  }}
                  className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all p-0.5 ${
                    avatar === avUrl
                      ? 'border-[#00f0ff] scale-110 shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                      : 'border-[#262a4d] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={avUrl}
                    alt={`Avatar ${idx}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full rounded-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Username */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Nombre de Usuario / Alias</label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          {/* Rank selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Rango / Título en el Foro</label>
            <select
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            >
              {PRESET_RANKS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {/* Forum Signature */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Firma del Foro (pie de tus respuestas)</label>
            <input
              type="text"
              value={signature}
              onChange={(e) => setSignature(e.target.value)}
              placeholder='Ej: 🌴 "Vice City nunca duerme" | PS5 Pro Gamer'
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1e213b]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#00f0ff] to-[#0ea5e9] hover:from-[#38bdf8] hover:to-[#0284c7] text-slate-900 rounded-lg shadow-sm font-sans transition-all"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
