import React from 'react';
import { Pin, MessageSquare, Eye, Bookmark, CheckCircle2, Flame, Award } from 'lucide-react';
import { ForumThread } from '../types/forum';
import { soundManager } from '../utils/audio';

interface ThreadCardProps {
  thread: ForumThread;
  onSelect: (thread: ForumThread) => void;
  onToggleBookmark: (threadId: string) => void;
  onReact: (threadId: string, emoji: string) => void;
}

export const ThreadCard: React.FC<ThreadCardProps> = ({
  thread,
  onSelect,
  onToggleBookmark,
  onReact,
}) => {
  const totalReactions = Object.values(thread.reactions || {}).reduce((a, b) => a + b, 0);

  return (
    <article
      onClick={() => {
        soundManager.playBlip();
        onSelect(thread);
      }}
      className="group relative bg-[#131527] hover:bg-[#181a30] border border-[#21243f] hover:border-[#383d6a] rounded-xl p-4 sm:p-5 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
    >
      <div className="flex flex-col gap-3">
        {/* Unboxed Metadata Header (Rule: Zero pills, subtle dot separators) */}
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap">
            {thread.isPinned && (
              <span className="flex items-center gap-1 text-[#ff007a] font-semibold">
                <Pin className="w-3.5 h-3.5 fill-current" />
                <span>FIJADO</span>
                <span aria-hidden="true" className="text-slate-600">·</span>
              </span>
            )}
            <span className="text-[#00f0ff] font-medium">{thread.categoryTitle}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Por <strong className="text-slate-300 font-medium">{thread.author.username}</strong></span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>{thread.createdAt}</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              soundManager.playBlip();
              onToggleBookmark(thread.id);
            }}
            title={thread.isBookmarked ? 'Guardado en favoritos' : 'Guardar debate'}
            className={`p-1.5 rounded hover:bg-[#25284b] transition-colors ${
              thread.isBookmarked ? 'text-[#ff007a]' : 'text-slate-500 hover:text-slate-300'
            }`}
            aria-label="Guardar debate"
          >
            <Bookmark className={`w-4 h-4 ${thread.isBookmarked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Title & Preview */}
        <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-[#00f0ff] transition-colors line-clamp-2 leading-snug">
              {thread.title}
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-slate-400 line-clamp-2 leading-relaxed">
              {thread.summary}
            </p>
          </div>

          {/* Optional Thread Image Preview */}
          {thread.imageBanner && (
            <div className="w-full sm:w-28 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-[#2b2f56] bg-[#0c0d18]">
              <img
                src={thread.imageBanner}
                alt={thread.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          )}
        </div>

        {/* Tags (Clean quiet text badges) & Stats Footer */}
        <div className="pt-2 border-t border-[#1c1f38] flex items-center justify-between flex-wrap gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-1.5 flex-wrap">
            {thread.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] text-slate-400 hover:text-slate-200 transition-colors"
              >
                #{tag}
              </span>
            ))}
            {thread.poll && (
              <span className="text-[#f59e0b] font-medium ml-1 flex items-center gap-1 text-[11px]">
                <Award className="w-3 h-3" />
                Encuesta activa
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 tabular-nums">
            {/* Quick Reactions summary */}
            <div className="flex items-center gap-1.5 text-slate-300">
              <span className="text-xs">🔥</span>
              <span className="text-xs font-medium">{thread.reactions?.['🔥'] || 0}</span>
              <span className="text-xs ml-1">🌴</span>
              <span className="text-xs font-medium">{thread.reactions?.['🌴'] || 0}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400" title="Respuestas">
              <MessageSquare className="w-3.5 h-3.5 text-slate-500" />
              <span>{thread.repliesCount}</span>
            </div>

            <div className="flex items-center gap-1 text-slate-400 hidden sm:flex" title="Vistas">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>{thread.views.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
