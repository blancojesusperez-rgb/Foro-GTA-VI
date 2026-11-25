import React, { useState } from 'react';
import { X, Send, Sparkles, Image, Star, MapPin, AlertCircle, Compass } from 'lucide-react';
import { PlayerExperience, UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface NewExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onCreateExperience: (data: {
    title: string;
    category: 'nostalgia' | 'expectativa' | 'roleplay' | 'anecdota';
    gameFocus: string;
    location?: string;
    hypeRating: number;
    content: string;
    image?: string;
  }) => void;
}

const CATEGORIES = [
  { id: 'nostalgia', label: 'Nostalgia & Recuerdos de la Saga' },
  { id: 'expectativa', label: 'Expectativas & Sueños para GTA VI' },
  { id: 'roleplay', label: 'Roleplay & Diario de Personaje en Leonida' },
  { id: 'anecdota', label: 'Anécdota Inolvidable de Partida' },
];

const GAME_OPTIONS = [
  'GTA VI',
  'GTA Vice City',
  'GTA V / Online',
  'GTA San Andreas',
  'GTA IV',
  'Toda la Saga',
];

const PRESET_IMAGES = [
  '/src/assets/images/gta6_vice_city_hero_1795625161422.jpg',
  '/src/assets/images/gta6_jason_lucia_duo_1795625161693.jpg',
  '/src/assets/images/gta6_leonida_map_preview_1795625162172.jpg',
];

export const NewExperienceModal: React.FC<NewExperienceModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateExperience,
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'nostalgia' | 'expectativa' | 'roleplay' | 'anecdota'>('expectativa');
  const [gameFocus, setGameFocus] = useState('GTA VI');
  const [location, setLocation] = useState('');
  const [hypeRating, setHypeRating] = useState(5);
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Escribe un título para tu experiencia.');
      return;
    }
    if (!content.trim()) {
      setError('El relato de tu experiencia no puede estar vacío.');
      return;
    }

    soundManager.playUpvote();
    onCreateExperience({
      title: title.trim(),
      category,
      gameFocus,
      location: location.trim() || undefined,
      hypeRating,
      content: content.trim(),
      image: image.trim() || undefined,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#131527] border border-[#262a4d] rounded-2xl shadow-2xl p-6 sm:p-7 space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-[#21243f] pb-4">
          <div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#ff007a]" />
              <span>Compartir Experiencia con la Comunidad</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Publicando como <strong className="text-[#00f0ff]">{currentUser.username}</strong>
            </p>
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

        {error && (
          <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Título de la Experiencia</label>
            <input
              type="text"
              required
              placeholder="Ej: Mi primera noche patrullando Ocean Drive en descapotable"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg px-3.5 py-2.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Tipo de Experiencia</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Game focus */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Juego de Referencia</label>
              <select
                value={gameFocus}
                onChange={(e) => setGameFocus(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              >
                {GAME_OPTIONS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00f0ff]" />
                <span>Ubicación o Escenario (opcional)</span>
              </label>
              <input
                type="text"
                placeholder="Ej: Ocean Beach / The Glades / Port Gellhorn"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            {/* Hype Rating / Stars */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Nivel de Hype / Emoción</label>
              <div className="flex items-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => {
                      soundManager.playBlip();
                      setHypeRating(star);
                    }}
                    className="p-1 text-base transition-transform hover:scale-125"
                  >
                    <span className={star <= hypeRating ? 'text-[#f59e0b]' : 'text-slate-600'}>
                      ★
                    </span>
                  </button>
                ))}
                <span className="text-xs text-slate-400 font-mono ml-2">{hypeRating}/5 Estrellas</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-300">Relato de la Experiencia</label>
            <textarea
              required
              rows={5}
              placeholder="Cuéntale a la comunidad tus recuerdos, tu plan de juego, momentos divertidos de la saga o cómo planeas jugar GTA VI..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs sm:text-sm rounded-lg p-3.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff] resize-y"
            />
          </div>

          {/* Preset image suggestions or custom URL */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
              <Image className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Añadir Imagen a tu Relato (opcional)</span>
            </label>
            <div className="flex items-center gap-3">
              {PRESET_IMAGES.map((imgUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    soundManager.playBlip();
                    setImage(image === imgUrl ? '' : imgUrl);
                  }}
                  className={`w-20 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    image === imgUrl
                      ? 'border-[#ff007a] ring-2 ring-[#ff007a]/40 scale-105'
                      : 'border-[#262a4d] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt="Preset" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
            <input
              type="url"
              placeholder="O pega una URL de imagen..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-[#0d0e1b] text-slate-200 text-xs rounded-lg px-3 py-1.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
            />
          </div>

          {/* Actions */}
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
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publicar Experiencia</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
