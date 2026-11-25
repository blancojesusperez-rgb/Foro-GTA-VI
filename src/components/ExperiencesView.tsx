import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  Star,
  MessageSquare,
  Send,
  Plus,
  Compass,
  Heart,
  Flame,
  ChevronDown,
  ChevronUp,
  Share2,
  Check,
} from 'lucide-react';
import { PlayerExperience, UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface ExperiencesViewProps {
  experiences: PlayerExperience[];
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onOpenNewExperience: () => void;
  onReactExperience: (experienceId: string, emoji: string) => void;
  onAddComment: (experienceId: string, content: string) => void;
}

export const ExperiencesView: React.FC<ExperiencesViewProps> = ({
  experiences,
  currentUser,
  onOpenAuth,
  onOpenNewExperience,
  onReactExperience,
  onAddComment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'Todas las Historias' },
    { id: 'nostalgia', label: 'Nostalgia & Clásicos' },
    { id: 'expectativa', label: 'Expectativas GTA VI' },
    { id: 'roleplay', label: 'Diarios de Rol' },
    { id: 'anecdota', label: 'Anécdotas' },
  ];

  const games = ['all', 'GTA VI', 'GTA Vice City', 'GTA V', 'GTA San Andreas'];

  const filteredExperiences = experiences.filter((exp) => {
    const matchCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchGame = selectedGame === 'all' || exp.gameFocus.includes(selectedGame);
    return matchCategory && matchGame;
  });

  const toggleComments = (id: string) => {
    soundManager.playBlip();
    setExpandedComments((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCommentSubmit = (e: React.FormEvent, experienceId: string) => {
    e.preventDefault();
    if (!currentUser) {
      onOpenAuth();
      return;
    }
    const text = commentInputs[experienceId]?.trim();
    if (!text) return;

    soundManager.playUpvote();
    onAddComment(experienceId, text);
    setCommentInputs((prev) => ({ ...prev, [experienceId]: '' }));
    setExpandedComments((prev) => ({ ...prev, [experienceId]: true }));
  };

  const handleShare = (id: string) => {
    soundManager.playBlip();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const reactionEmojis = ['🌴', '🔥', '💎', '💀'];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Hero Welcome */}
      <div className="relative rounded-2xl overflow-hidden border border-[#262a4d] bg-gradient-to-r from-[#14162a] via-[#101222] to-[#17142b] p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-bold text-[#ff007a] uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#00f0ff]" />
              <span>Muro de Experiencias y Recuerdos · Leonida & Vice City</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Comparte tus Recuerdos y Sueños de GTA
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Un espacio para que los jugadores relaten sus anécdotas más salvajes de la saga, su nostalgia con el Vice City original de 2002 y lo que planean hacer nada más pisar Leonida.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playBlip();
              if (!currentUser) {
                onOpenAuth();
              } else {
                onOpenNewExperience();
              }
            }}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(255,0,122,0.4)] transition-all shrink-0"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Compartir Mi Experiencia</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs & Game Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3.5 rounded-xl bg-[#131527] border border-[#21243f]">
        {/* Category Pills (Functional Buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs w-full sm:w-auto">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                soundManager.playBlip();
                setSelectedCategory(c.id);
              }}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === c.id
                  ? 'bg-[#ff007a] text-white font-bold'
                  : 'text-slate-400 hover:text-white bg-[#1a1c32]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Game Filter */}
        <div className="flex items-center gap-2 text-xs shrink-0 w-full sm:w-auto justify-end">
          <span className="text-slate-400">Juego:</span>
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="bg-[#1a1c32] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#2b2f54] focus:outline-none focus:border-[#00f0ff]"
          >
            <option value="all">Todos los títulos</option>
            <option value="GTA VI">GTA VI</option>
            <option value="GTA Vice City">GTA Vice City</option>
            <option value="GTA V">GTA V</option>
            <option value="GTA San Andreas">GTA San Andreas</option>
          </select>
        </div>
      </div>

      {/* Experiences Feed */}
      <div className="space-y-5">
        {filteredExperiences.length === 0 ? (
          <div className="p-12 text-center rounded-xl bg-[#131527] border border-[#21243f] text-slate-400 text-sm space-y-2">
            <p>No se encontraron experiencias en esta categoría.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedGame('all');
              }}
              className="text-xs text-[#00f0ff] hover:underline font-semibold"
            >
              Ver todas las experiencias
            </button>
          </div>
        ) : (
          filteredExperiences.map((exp) => {
            const isCommentsOpen = expandedComments[exp.id] ?? false;

            return (
              <article
                key={exp.id}
                className="bg-[#131527] border border-[#21243f] rounded-xl overflow-hidden shadow-sm hover:border-[#383d6a] transition-all"
              >
                {/* Optional Image */}
                {exp.image && (
                  <div className="w-full h-48 sm:h-64 relative overflow-hidden bg-[#0c0d18] border-b border-[#21243f]">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131527] via-transparent to-black/20 pointer-events-none" />
                  </div>
                )}

                <div className="p-5 sm:p-6 space-y-4">
                  {/* Unboxed Metadata Header */}
                  <div className="flex items-center justify-between text-xs text-slate-400 flex-wrap gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[#00f0ff]">{exp.gameFocus}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>Por <strong className="text-slate-200">{exp.author.username}</strong></span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{exp.createdAt}</span>
                      {exp.location && (
                        <>
                          <span aria-hidden="true" className="text-slate-600">·</span>
                          <span className="flex items-center gap-1 text-[#ff007a]">
                            <MapPin className="w-3 h-3" />
                            <span>{exp.location}</span>
                          </span>
                        </>
                      )}
                    </div>

                    {/* Hype Rating Stars */}
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`text-xs ${
                            i < exp.hypeRating ? 'text-[#f59e0b]' : 'text-slate-700'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-lg sm:text-xl font-bold text-white leading-snug">
                    {exp.title}
                  </h2>

                  {/* Body Content */}
                  <div className="text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                    {exp.content}
                  </div>

                  {/* Reactions & Comment Bar */}
                  <div className="pt-3 border-t border-[#1c1f38] flex items-center justify-between flex-wrap gap-3 text-xs">
                    <div className="flex items-center gap-2">
                      {reactionEmojis.map((emoji) => {
                        const count = exp.reactions?.[emoji] || 0;
                        const isSelected = exp.userReaction === emoji;

                        return (
                          <button
                            key={emoji}
                            onClick={() => {
                              if (!currentUser) {
                                onOpenAuth();
                                return;
                              }
                              soundManager.playUpvote();
                              onReactExperience(exp.id, emoji);
                            }}
                            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs transition-colors ${
                              isSelected
                                ? 'bg-[#ff007a]/20 border-[#ff007a] text-white'
                                : 'bg-[#181a30] border-[#26294d] text-slate-400 hover:text-white'
                            }`}
                          >
                            <span>{emoji}</span>
                            <span className="font-mono tabular-nums">{count}</span>
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleShare(exp.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f223f] transition-colors"
                      >
                        {copiedId === exp.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Share2 className="w-3.5 h-3.5" />
                            <span>Compartir</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => toggleComments(exp.id)}
                        className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#181a30] hover:bg-[#20233e] text-slate-300 border border-[#282c4f] transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-[#00f0ff]" />
                        <span>Comentarios ({exp.comments?.length || 0})</span>
                        {isCommentsOpen ? (
                          <ChevronUp className="w-3.5 h-3.5 ml-0.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5 ml-0.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Comments Drawer */}
                  {isCommentsOpen && (
                    <div className="pt-3 border-t border-[#1e213b] space-y-3">
                      {exp.comments && exp.comments.length > 0 ? (
                        <div className="space-y-2">
                          {exp.comments.map((comm) => (
                            <div
                              key={comm.id}
                              className="p-3 rounded-lg bg-[#0e101f] border border-[#1e223b] text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between text-slate-400">
                                <div className="flex items-center gap-2">
                                  <img
                                    src={comm.author.avatar}
                                    alt={comm.author.username}
                                    className="w-5 h-5 rounded-full object-cover ring-1 ring-[#00f0ff]/30"
                                  />
                                  <span className="font-bold text-white">{comm.author.username}</span>
                                </div>
                                <span className="text-[10px] text-slate-500 font-mono">{comm.createdAt}</span>
                              </div>
                              <p className="text-slate-300 pl-7">{comm.content}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 italic">
                          Aún no hay comentarios en esta historia. ¡Sé el primero en responder!
                        </p>
                      )}

                      {/* Comment Composer Form */}
                      <form
                        onSubmit={(e) => handleCommentSubmit(e, exp.id)}
                        className="flex items-center gap-2 pt-1"
                      >
                        <input
                          type="text"
                          placeholder={
                            currentUser
                              ? `Comentar como ${currentUser.username}...`
                              : 'Inicia sesión para comentar...'
                          }
                          value={commentInputs[exp.id] || ''}
                          onChange={(e) =>
                            setCommentInputs((prev) => ({
                              ...prev,
                              [exp.id]: e.target.value,
                            }))
                          }
                          className="flex-1 bg-[#0e101f] text-slate-200 text-xs rounded-lg px-3 py-2 border border-[#21243f] focus:outline-none focus:border-[#00f0ff]"
                        />
                        <button
                          type="submit"
                          disabled={!commentInputs[exp.id]?.trim()}
                          className="px-3 py-2 bg-[#ff007a] hover:bg-[#e11d48] disabled:opacity-40 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Enviar</span>
                        </button>
                      </form>
                    </div>
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </div>
  );
};
