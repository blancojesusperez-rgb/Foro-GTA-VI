import React from 'react';
import { Award, CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import { ForumThread } from '../types/forum';
import { soundManager } from '../utils/audio';

interface PollsDashboardProps {
  threads: ForumThread[];
  onVotePoll: (threadId: string, optionId: string) => void;
  onOpenThread: (thread: ForumThread) => void;
}

export const PollsDashboard: React.FC<PollsDashboardProps> = ({
  threads,
  onVotePoll,
  onOpenThread,
}) => {
  const pollThreads = threads.filter((t) => t.poll);

  const grandTotalVotes = pollThreads.reduce(
    (acc, t) => acc + (t.poll?.totalVotes || 0),
    0
  );

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Intro Header */}
      <div className="p-6 rounded-xl bg-[#131527] border border-[#21243f] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#f59e0b] uppercase tracking-wider">
            <Award className="w-4 h-4 text-[#ff007a]" />
            <span>Centro de Votaciones de la Comunidad · GTA VI</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
            Macro-Encuestas y Predicciones de Leonida
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Participa con tu voto en los grandes dilemas sobre la trama, precio de lanzamiento, multijugador y mecánicas de Rockstar.
          </p>
        </div>

        <div className="p-3 bg-[#0d0e1c] rounded-lg border border-[#21243f] shrink-0 text-right sm:text-left">
          <div className="text-[11px] text-slate-400">Total Votos Registrados</div>
          <div className="text-lg font-mono font-bold text-[#00f0ff] tabular-nums">
            {grandTotalVotes.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Polls List */}
      <div className="space-y-6">
        {pollThreads.map((thread) => {
          const poll = thread.poll!;
          return (
            <div
              key={thread.id}
              className="p-6 rounded-xl bg-[#131527] border border-[#21243f] shadow-sm space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-xs font-semibold text-[#00f0ff]">{thread.categoryTitle}</span>
                  <h2 className="text-base sm:text-lg font-bold text-white mt-1">
                    {poll.question}
                  </h2>
                </div>

                <button
                  onClick={() => {
                    soundManager.playBlip();
                    onOpenThread(thread);
                  }}
                  className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-white px-2.5 py-1.5 rounded-lg hover:bg-[#1f223f] transition-colors shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ver debate</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Poll Options */}
              <div className="space-y-2.5 pt-1">
                {poll.options.map((opt) => {
                  const percentage = poll.totalVotes
                    ? Math.round((opt.votes / poll.totalVotes) * 100)
                    : 0;
                  const isVoted = poll.userVotedOptionId === opt.id;

                  return (
                    <div
                      key={opt.id}
                      onClick={() => {
                        soundManager.playUpvote();
                        onVotePoll(thread.id, opt.id);
                      }}
                      className={`relative p-3 rounded-lg border transition-all cursor-pointer overflow-hidden ${
                        isVoted
                          ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white font-medium'
                          : 'border-[#262a4d] bg-[#141629] hover:border-[#3d4377] text-slate-300'
                      }`}
                    >
                      {/* Animated bar */}
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#ff007a]/20 to-[#00f0ff]/20 pointer-events-none transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />

                      <div className="relative flex items-center justify-between gap-3 text-xs sm:text-sm">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isVoted ? 'border-[#00f0ff] bg-[#00f0ff]' : 'border-slate-500'
                            }`}
                          >
                            {isVoted && <div className="w-1.5 h-1.5 rounded-full bg-black" />}
                          </div>
                          <span>{opt.text}</span>
                        </div>
                        <div className="flex items-center gap-2 font-mono tabular-nums shrink-0">
                          <span className="text-slate-400 text-xs">{opt.votes}</span>
                          <span className="font-bold text-white">{percentage}%</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {poll.userVotedOptionId && (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Has votado en esta encuesta. Tu voto se ha sumado a las estadísticas del foro.</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
