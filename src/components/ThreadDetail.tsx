import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  MessageSquare,
  Eye,
  CheckCircle2,
  Send,
  Quote,
  Flame,
  AlertTriangle,
  Lock,
  Pin,
  Check,
} from 'lucide-react';
import { ForumThread, ThreadReply, UserProfile } from '../types/forum';
import { soundManager } from '../utils/audio';

interface ThreadDetailProps {
  thread: ForumThread;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onBack: () => void;
  onVotePoll: (threadId: string, optionId: string) => void;
  onReactThread: (threadId: string, emoji: string) => void;
  onAddReply: (threadId: string, content: string, quote?: { authorName: string; text: string }) => void;
  onToggleBookmark: (threadId: string) => void;
  onReactReply: (threadId: string, replyId: string, emoji: string) => void;
}

export const ThreadDetail: React.FC<ThreadDetailProps> = ({
  thread,
  currentUser,
  onOpenAuth,
  onBack,
  onVotePoll,
  onReactThread,
  onAddReply,
  onToggleBookmark,
  onReactReply,
}) => {
  const [replyText, setReplyText] = useState('');
  const [activeQuote, setActiveQuote] = useState<{ authorName: string; text: string } | null>(null);
  const [revealedSpoilers, setRevealedSpoilers] = useState<Record<number, boolean>>({});
  const [copiedShare, setCopiedShare] = useState(false);

  const availableReactions = [
    { emoji: '🔥', label: 'Hype' },
    { emoji: '🌴', label: 'Vice' },
    { emoji: '💎', label: 'Joya' },
    { emoji: '🚔', label: 'Busted' },
    { emoji: '💀', label: 'Muerto' },
  ];

  const handleShare = () => {
    soundManager.playBlip();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
    }
  };

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    soundManager.playUpvote();
    onAddReply(thread.id, replyText.trim(), activeQuote || undefined);
    setReplyText('');
    setActiveQuote(null);
  };

  const handleQuoteClick = (authorName: string, text: string) => {
    soundManager.playBlip();
    setActiveQuote({
      authorName,
      text: text.slice(0, 160) + (text.length > 160 ? '...' : ''),
    });
    // Scroll down to reply box
    const replyBox = document.getElementById('reply-composer');
    if (replyBox) {
      replyBox.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top back navigation and quick thread actions */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => {
            soundManager.playBlip();
            onBack();
          }}
          className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-[#00f0ff] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a los debates</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 bg-[#16182c] hover:bg-[#1e213d] border border-[#262a4d] rounded-lg transition-colors"
          >
            {copiedShare ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Enlace copiado</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5" />
                <span>Compartir</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              soundManager.playBlip();
              onToggleBookmark(thread.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
              thread.isBookmarked
                ? 'bg-[#ff007a]/10 border-[#ff007a]/40 text-[#ff007a]'
                : 'bg-[#16182c] border-[#262a4d] text-slate-300 hover:bg-[#1e213d]'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${thread.isBookmarked ? 'fill-current' : ''}`} />
            <span>{thread.isBookmarked ? 'Guardado' : 'Guardar'}</span>
          </button>
        </div>
      </div>

      {/* Main Thread Article */}
      <article className="bg-[#131527] border border-[#21243f] rounded-xl overflow-hidden shadow-lg">
        {/* Banner image if present */}
        {thread.imageBanner && (
          <div className="w-full h-56 sm:h-72 md:h-80 relative overflow-hidden bg-[#0c0d18] border-b border-[#21243f]">
            <img
              src={thread.imageBanner}
              alt={thread.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#131527] via-transparent to-black/30 pointer-events-none" />
          </div>
        )}

        <div className="p-5 sm:p-7 md:p-8 space-y-6">
          {/* Thread Header Metadata (Rule: unboxed metadata with dot separators) */}
          <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
            {thread.isPinned && (
              <span className="flex items-center gap-1 text-[#ff007a] font-semibold">
                <Pin className="w-3.5 h-3.5 fill-current" />
                <span>TEMA FIJADO</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
              </span>
            )}
            <span className="text-[#00f0ff] font-medium">{thread.categoryTitle}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{thread.createdAt}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="tabular-nums">{thread.views.toLocaleString()} lecturas</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="tabular-nums">{thread.repliesCount} respuestas</span>
          </div>

          {/* Title */}
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">
            {thread.title}
          </h1>

          {/* Tags */}
          <div className="flex items-center gap-2 flex-wrap">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded bg-[#1c1f3b] text-slate-300 border border-[#2b2f56]"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Author Card row */}
          <div className="flex items-center justify-between p-3.5 rounded-lg bg-[#0e101f] border border-[#1e213b] flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <img
                src={thread.author.avatar}
                alt={thread.author.username}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-[#00f0ff]/50"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{thread.author.username}</span>
                  {thread.author.badge && (
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#ff007a]/20 text-[#ff007a] border border-[#ff007a]/30">
                      {thread.author.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-400">
                  <span>{thread.author.rank}</span>
                  <span className="mx-1.5 text-slate-600">·</span>
                  <span className="font-mono tabular-nums">{thread.author.reputation} Rep</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-slate-500 font-mono hidden sm:block">
              Miembro desde {thread.author.joinDate}
            </div>
          </div>

          {/* Thread Content Body */}
          <div className="text-sm sm:text-base text-slate-200 leading-relaxed space-y-4 whitespace-pre-line pt-2">
            {thread.content}
          </div>

          {/* Author Signature */}
          {thread.author.signature && (
            <div className="pt-4 border-t border-[#1c1f38] text-xs text-slate-500 italic">
              {thread.author.signature}
            </div>
          )}

          {/* Interactive Poll Section if Present */}
          {thread.poll && (
            <div className="p-5 sm:p-6 rounded-xl bg-[#0e101f] border border-[#2b2f56] space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display font-bold text-base sm:text-lg text-white flex items-center gap-2">
                  <span className="text-[#f59e0b]">📊</span>
                  <span>{thread.poll.question}</span>
                </h3>
                <span className="text-xs text-slate-400 font-mono tabular-nums">
                  {thread.poll.totalVotes} votos totales
                </span>
              </div>

              <div className="space-y-3 pt-2">
                {thread.poll.options.map((opt) => {
                  const percentage = thread.poll?.totalVotes
                    ? Math.round((opt.votes / thread.poll.totalVotes) * 100)
                    : 0;
                  const isUserVoted = thread.poll?.userVotedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        if (!currentUser) {
                          onOpenAuth();
                          return;
                        }
                        soundManager.playUpvote();
                        onVotePoll(thread.id, opt.id);
                      }}
                      className={`relative p-3.5 rounded-lg border transition-all cursor-pointer overflow-hidden ${
                        isUserVoted
                          ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white font-medium'
                          : 'border-[#262a4d] bg-[#141629] hover:border-[#3d4377] text-slate-300'
                      }`}
                    >
                      {/* Background animated progress bar */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff007a]/20 to-[#00f0ff]/20 pointer-events-none transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />

                      <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isUserVoted ? 'border-[#00f0ff] bg-[#00f0ff]' : 'border-slate-500'
                            }`}
                          >
                            {isUserVoted && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                          <span>{opt.text}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono tabular-nums shrink-0">
                          <span className="text-slate-400 text-xs">{opt.votes} votos</span>
                          <span className="font-bold text-white">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {thread.poll.userVotedOptionId && (
                <p className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Tu voto ha sido registrado. Puedes cambiar de opinión haciendo clic en otra opción.</span>
                </p>
              )}
            </div>
          )}

          {/* Reaction Bar */}
          <div className="pt-4 border-t border-[#1c1f38] flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs text-slate-400 font-medium mr-1">Reaccionar:</span>
              {availableReactions.map((rec) => {
                const count = thread.reactions?.[rec.emoji] || 0;
                const isSelected = thread.userReaction === rec.emoji;

                return (
                  <button
                    key={rec.emoji}
                    onClick={() => {
                      if (!currentUser) {
                        onOpenAuth();
                        return;
                      }
                      soundManager.playUpvote();
                      onReactThread(thread.id, rec.emoji);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-[#ff007a]/20 border-[#ff007a] text-white shadow-[0_0_10px_rgba(255,0,122,0.3)]'
                        : 'bg-[#181a30] border-[#26294d] text-slate-300 hover:border-[#3c4179] hover:bg-[#20233f]'
                    }`}
                  >
                    <span>{rec.emoji}</span>
                    <span className="font-mono tabular-nums">{count}</span>
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handleQuoteClick(thread.author.username, thread.content)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-white hover:bg-[#1a1c32] rounded-lg transition-colors border border-transparent hover:border-[#2a2d50]"
            >
              <Quote className="w-3.5 h-3.5" />
              <span>Citar en respuesta</span>
            </button>
          </div>
        </div>
      </article>

      {/* Community Replies Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display font-bold text-lg text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#00f0ff]" />
            <span>Respuestas de la Comunidad ({thread.replies.length})</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Orden cronológico</span>
        </div>

        {thread.replies.length === 0 ? (
          <div className="p-8 text-center rounded-xl bg-[#131527] border border-[#21243f] text-slate-400 text-sm">
            Aún no hay respuestas en este debate. ¡Sé el primero en compartir tu teoría o análisis de Leonida!
          </div>
        ) : (
          <div className="space-y-3">
            {thread.replies.map((reply, idx) => (
              <div
                key={reply.id}
                className="p-5 rounded-xl bg-[#131527] border border-[#21243f] space-y-3"
              >
                {/* Author and date row */}
                <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={reply.author.avatar}
                      alt={reply.author.username}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover ring-1 ring-[#00f0ff]/40"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white">{reply.author.username}</span>
                        {reply.author.badge && (
                          <span className="text-[9px] px-1 py-0.5 rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/20">
                            {reply.author.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {reply.author.rank} · {reply.author.reputation} Rep
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400">
                    <span className="text-[11px]">{reply.createdAt}</span>
                    <button
                      onClick={() => handleQuoteClick(reply.author.username, reply.content)}
                      title="Citar esta respuesta"
                      className="p-1 hover:text-white rounded transition-colors"
                    >
                      <Quote className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quoted box if present */}
                {reply.quote && (
                  <div className="p-2.5 rounded bg-[#0d0e1c] border-l-2 border-[#ff007a] text-xs text-slate-400 space-y-1">
                    <div className="font-semibold text-slate-300">
                      Cita de {reply.quote.authorName}:
                    </div>
                    <div className="italic">"{reply.quote.text}"</div>
                  </div>
                )}

                {/* Reply body */}
                <div className="text-sm text-slate-200 leading-relaxed whitespace-pre-line">
                  {reply.content}
                </div>

                {/* Reply signature if any */}
                {reply.author.signature && (
                  <div className="pt-2 border-t border-[#1a1c31] text-[11px] text-slate-500 italic">
                    {reply.author.signature}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Reply Composer */}
        <div id="reply-composer" className="p-5 sm:p-6 rounded-xl bg-[#131527] border border-[#21243f] space-y-4">
          {currentUser ? (
            <>
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm sm:text-base text-white flex items-center gap-2">
                  <Quote className="w-4 h-4 text-[#ff007a]" />
                  <span>Publicar tu respuesta como {currentUser.username}</span>
                </h3>
                <span className="text-xs text-slate-500">{currentUser.rank}</span>
              </div>

              {activeQuote && (
                <div className="flex items-center justify-between p-3 rounded-lg bg-[#0e101f] border border-[#2a2d52] text-xs text-slate-300">
                  <div className="truncate pr-2">
                    <span className="text-[#00f0ff] font-semibold">Citando a {activeQuote.authorName}:</span> "{activeQuote.text}"
                  </div>
                  <button
                    onClick={() => setActiveQuote(null)}
                    className="text-slate-400 hover:text-white font-bold ml-2 shrink-0"
                  >
                    ✕
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmitReply} className="space-y-3">
                <textarea
                  rows={4}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Escribe tu análisis, teoría o respuesta a la comunidad... (Sé respetuoso y evita spam)"
                  className="w-full bg-[#0d0e1b] text-slate-200 placeholder-slate-500 text-sm rounded-lg p-3.5 border border-[#21243f] focus:outline-none focus:border-[#00f0ff] transition-colors resize-y min-h-[100px]"
                />

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <button
                      type="button"
                      onClick={() => setReplyText((prev) => prev + ' **texto en negrita** ')}
                      className="px-2 py-1 bg-[#1a1c32] hover:bg-[#25284b] rounded text-slate-300 font-bold transition-colors"
                    >
                      B
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyText((prev) => prev + ' *texto en cursiva* ')}
                      className="px-2 py-1 bg-[#1a1c32] hover:bg-[#25284b] rounded text-slate-300 italic transition-colors"
                    >
                      I
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyText((prev) => prev + ' [SPOILER] Alerta de spoiler [/SPOILER] ')}
                      className="px-2 py-1 bg-[#1a1c32] hover:bg-[#25284b] rounded text-slate-300 font-mono text-[11px] transition-colors"
                    >
                      Spoiler
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!replyText.trim()}
                    className="flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] disabled:opacity-50 disabled:cursor-not-allowed rounded-lg shadow-sm transition-all"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Enviar Respuesta</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="p-6 text-center space-y-3">
              <h3 className="font-display font-bold text-base text-white">
                Únete a la conversación en Leonida Forums
              </h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Debes iniciar sesión con tu cuenta o registrarte para publicar respuestas, votar en encuestas y ganar reputación en Vice City.
              </p>
              <button
                type="button"
                onClick={() => {
                  soundManager.playBlip();
                  onOpenAuth();
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-[#ff007a] to-[#db2777] hover:from-[#f43f5e] hover:to-[#e11d48] rounded-lg shadow-sm transition-all"
              >
                <span>Iniciar Sesión / Registrarse</span>
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
