/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  Flame,
  MessageSquare,
  Sparkles,
  TrendingUp,
  Bookmark,
  Filter,
  Layers,
  Award,
  Compass,
  ArrowUpDown,
  Search,
  Plus,
  Users,
  Radio,
  Clock,
  Shield,
  HelpCircle,
} from 'lucide-react';
import {
  ForumThread,
  SubCategory,
  UserProfile,
  UserAccount,
  MapPOI,
  PlayerExperience,
} from './types/forum';
import {
  INITIAL_ACCOUNTS,
  INITIAL_EXPERIENCES,
  INITIAL_CATEGORIES,
  INITIAL_THREADS,
  MAP_POIS,
} from './data/initialData';
import { soundManager } from './utils/audio';
import { Navbar } from './components/Navbar';
import { TickerBar } from './components/TickerBar';
import { ThreadCard } from './components/ThreadCard';
import { ThreadDetail } from './components/ThreadDetail';
import { NewThreadModal } from './components/NewThreadModal';
import { LeonidaMapViewer } from './components/LeonidaMapViewer';
import { SubforumList } from './components/SubforumList';
import { PollsDashboard } from './components/PollsDashboard';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { ExperiencesView } from './components/ExperiencesView';
import { NewExperienceModal } from './components/NewExperienceModal';

export default function App() {
  // Registered accounts database in localStorage
  const [accounts, setAccounts] = useState<UserAccount[]>(() => {
    const saved = localStorage.getItem('gta6_forum_accounts');
    return saved ? JSON.parse(saved) : INITIAL_ACCOUNTS;
  });

  // Current logged in user (null if guest/logged out)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => {
    const saved = localStorage.getItem('gta6_forum_logged_user');
    if (saved !== null) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ACCOUNTS[0];
      }
    }
    return INITIAL_ACCOUNTS[0];
  });

  const [categories, setCategories] = useState<SubCategory[]>(() => {
    const saved = localStorage.getItem('gta6_forum_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });

  const [threads, setThreads] = useState<ForumThread[]>(() => {
    const saved = localStorage.getItem('gta6_forum_threads');
    return saved ? JSON.parse(saved) : INITIAL_THREADS;
  });

  const [experiences, setExperiences] = useState<PlayerExperience[]>(() => {
    const saved = localStorage.getItem('gta6_forum_experiences');
    return saved ? JSON.parse(saved) : INITIAL_EXPERIENCES;
  });

  const [pois, setPois] = useState<MapPOI[]>(() => {
    const saved = localStorage.getItem('gta6_forum_pois');
    return saved ? JSON.parse(saved) : MAP_POIS;
  });

  // UI state
  const [currentTab, setCurrentTab] = useState<
    'debates' | 'experiencias' | 'categorias' | 'mapa' | 'encuestas' | 'filtraciones'
  >('debates');
  const [activeThread, setActiveThread] = useState<ForumThread | null>(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string | null>(null);
  const [selectedTagFilter, setSelectedTagFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'recent' | 'replies' | 'views' | 'reactions'>('recent');
  const [showBookmarksOnly, setShowBookmarksOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals state
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNewThreadModalOpen, setIsNewThreadModalOpen] = useState(false);
  const [isNewExperienceModalOpen, setIsNewExperienceModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(() => soundManager.getMuted());

  // Save states to localStorage
  useEffect(() => {
    localStorage.setItem('gta6_forum_accounts', JSON.stringify(accounts));
  }, [accounts]);

  useEffect(() => {
    localStorage.setItem('gta6_forum_logged_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('gta6_forum_threads', JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem('gta6_forum_experiences', JSON.stringify(experiences));
  }, [experiences]);

  useEffect(() => {
    localStorage.setItem('gta6_forum_categories', JSON.stringify(categories));
  }, [categories]);

  // Keep activeThread synchronized with threads state
  useEffect(() => {
    if (activeThread) {
      const updated = threads.find((t) => t.id === activeThread.id);
      if (updated) {
        setActiveThread(updated);
      }
    }
  }, [threads]);

  // Authentication Handlers
  const handleLoginSuccess = (account: UserAccount) => {
    setCurrentUser(account);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleRegisterAccount = (newAccount: UserAccount) => {
    setAccounts((prev) => [newAccount, ...prev]);
  };

  // Handle Thread Creation
  const handleCreateThread = (newThreadData: {
    categoryId: string;
    categoryTitle: string;
    title: string;
    summary: string;
    content: string;
    tags: string[];
    imageBanner?: string;
    pollQuestion?: string;
    pollOptions?: string[];
  }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newThreadId = `thread-${Date.now()}`;
    const newThread: ForumThread = {
      id: newThreadId,
      categoryId: newThreadData.categoryId,
      categoryTitle: newThreadData.categoryTitle,
      title: newThreadData.title,
      summary: newThreadData.summary,
      content: newThreadData.content,
      tags: newThreadData.tags,
      author: currentUser,
      createdAt: 'Hace unos momentos',
      updatedAt: 'Hace unos momentos',
      views: 1,
      repliesCount: 0,
      isPinned: false,
      isLocked: false,
      imageBanner: newThreadData.imageBanner,
      reactions: { '🔥': 1, '🌴': 1 },
      userReaction: '🔥',
      isBookmarked: false,
      replies: [],
      poll:
        newThreadData.pollQuestion && newThreadData.pollOptions
          ? {
              question: newThreadData.pollQuestion,
              options: newThreadData.pollOptions.map((opt, i) => ({
                id: `opt-${Date.now()}-${i}`,
                text: opt,
                votes: 0,
              })),
              totalVotes: 0,
            }
          : undefined,
    };

    setThreads((prev) => [newThread, ...prev]);

    // Update categories count
    setCategories((prev) =>
      prev.map((c) =>
        c.id === newThreadData.categoryId
          ? { ...c, threadsCount: c.threadsCount + 1, latestActivity: 'Hace unos momentos' }
          : c
      )
    );

    // Update user stats
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            postsCount: prev.postsCount + 1,
            reputation: prev.reputation + 25,
          }
        : null
    );

    // Navigate to thread
    setActiveThread(newThread);
    setCurrentTab('debates');
  };

  // Handle Thread Reply
  const handleAddReply = (
    threadId: string,
    replyContent: string,
    quote?: { authorName: string; text: string }
  ) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newReplyId = `reply-${Date.now()}`;
    const newReply = {
      id: newReplyId,
      threadId,
      author: currentUser,
      createdAt: 'Hace unos segundos',
      content: replyContent,
      quote,
      reactions: { '🔥': 1 },
      userReaction: '🔥',
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          return {
            ...t,
            repliesCount: t.repliesCount + 1,
            views: t.views + 1,
            updatedAt: 'Hace un momento',
            replies: [...t.replies, newReply],
          };
        }
        return t;
      })
    );

    // Update user stats
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            postsCount: prev.postsCount + 1,
            reputation: prev.reputation + 10,
          }
        : null
    );
  };

  // Handle Bookmark Toggle
  const handleToggleBookmark = (threadId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setThreads((prev) =>
      prev.map((t) => (t.id === threadId ? { ...t, isBookmarked: !t.isBookmarked } : t))
    );
  };

  // Handle Thread Reaction
  const handleReactThread = (threadId: string, emoji: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const currentReactions = { ...(t.reactions || {}) };
          const prevUserRec = t.userReaction;

          if (prevUserRec === emoji) {
            currentReactions[emoji] = Math.max((currentReactions[emoji] || 1) - 1, 0);
            return {
              ...t,
              reactions: currentReactions,
              userReaction: undefined,
            };
          } else {
            if (prevUserRec && currentReactions[prevUserRec]) {
              currentReactions[prevUserRec] = Math.max(currentReactions[prevUserRec] - 1, 0);
            }
            currentReactions[emoji] = (currentReactions[emoji] || 0) + 1;
            return {
              ...t,
              reactions: currentReactions,
              userReaction: emoji,
            };
          }
        }
        return t;
      })
    );
  };

  // Handle Reply Reaction
  const handleReactReply = (threadId: string, replyId: string, emoji: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId) {
          const updatedReplies = t.replies.map((r) => {
            if (r.id === replyId) {
              const recs = { ...(r.reactions || {}) };
              if (r.userReaction === emoji) {
                recs[emoji] = Math.max((recs[emoji] || 1) - 1, 0);
                return { ...r, reactions: recs, userReaction: undefined };
              } else {
                if (r.userReaction && recs[r.userReaction]) {
                  recs[r.userReaction] = Math.max(recs[r.userReaction] - 1, 0);
                }
                recs[emoji] = (recs[emoji] || 0) + 1;
                return { ...r, reactions: recs, userReaction: emoji };
              }
            }
            return r;
          });
          return { ...t, replies: updatedReplies };
        }
        return t;
      })
    );
  };

  // Handle Poll Vote
  const handleVotePoll = (threadId: string, optionId: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === threadId && t.poll) {
          const prevVoted = t.poll.userVotedOptionId;
          const updatedOptions = t.poll.options.map((opt) => {
            if (opt.id === optionId) {
              return { ...opt, votes: opt.votes + 1 };
            }
            if (prevVoted && opt.id === prevVoted) {
              return { ...opt, votes: Math.max(opt.votes - 1, 0) };
            }
            return opt;
          });

          const totalVotes = updatedOptions.reduce((acc, o) => acc + o.votes, 0);

          return {
            ...t,
            poll: {
              ...t.poll,
              options: updatedOptions,
              totalVotes,
              userVotedOptionId: optionId,
            },
          };
        }
        return t;
      })
    );
  };

  // Handle Player Experience Creation
  const handleCreateExperience = (expData: {
    title: string;
    category: 'nostalgia' | 'expectativa' | 'roleplay' | 'anecdota';
    gameFocus: string;
    location?: string;
    hypeRating: number;
    content: string;
    image?: string;
  }) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newExp: PlayerExperience = {
      id: `exp-${Date.now()}`,
      title: expData.title,
      author: currentUser,
      createdAt: 'Hace unos momentos',
      category: expData.category,
      gameFocus: expData.gameFocus,
      location: expData.location,
      hypeRating: expData.hypeRating,
      content: expData.content,
      image: expData.image,
      reactions: { '🌴': 1, '🔥': 1 },
      userReaction: '🔥',
      comments: [],
    };

    setExperiences((prev) => [newExp, ...prev]);

    // Update user stats
    setCurrentUser((prev) =>
      prev
        ? {
            ...prev,
            postsCount: prev.postsCount + 1,
            reputation: prev.reputation + 30,
          }
        : null
    );

    setCurrentTab('experiencias');
  };

  // Handle Experience Reaction
  const handleReactExperience = (experienceId: string, emoji: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }
    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === experienceId) {
          const recs = { ...(exp.reactions || {}) };
          const prevReaction = exp.userReaction;

          if (prevReaction === emoji) {
            recs[emoji] = Math.max((recs[emoji] || 1) - 1, 0);
            return { ...exp, reactions: recs, userReaction: undefined };
          } else {
            if (prevReaction && recs[prevReaction]) {
              recs[prevReaction] = Math.max(recs[prevReaction] - 1, 0);
            }
            recs[emoji] = (recs[emoji] || 0) + 1;
            return { ...exp, reactions: recs, userReaction: emoji };
          }
        }
        return exp;
      })
    );
  };

  // Handle Experience Comment
  const handleAddExperienceComment = (experienceId: string, text: string) => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
      return;
    }

    const newComment = {
      id: `exp-c-${Date.now()}`,
      experienceId,
      author: currentUser,
      createdAt: 'Hace unos momentos',
      content: text,
    };

    setExperiences((prev) =>
      prev.map((exp) => {
        if (exp.id === experienceId) {
          return {
            ...exp,
            comments: [...(exp.comments || []), newComment],
          };
        }
        return exp;
      })
    );
  };

  // Filter and sort threads
  const displayedThreads = useMemo(() => {
    let result = [...threads];

    if (currentTab === 'filtraciones') {
      result = result.filter(
        (t) =>
          t.tags.includes('FILTRACIÓN') ||
          t.tags.includes('RAGE 9') ||
          t.categoryId === 'cat-filtraciones'
      );
    }

    if (activeCategoryFilter) {
      result = result.filter((t) => t.categoryId === activeCategoryFilter);
    }

    if (selectedTagFilter) {
      result = result.filter((t) => t.tags.includes(selectedTagFilter));
    }

    if (showBookmarksOnly) {
      result = result.filter((t) => t.isBookmarked);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.summary.toLowerCase().includes(q) ||
          t.content.toLowerCase().includes(q) ||
          t.author.username.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      if (sortBy === 'replies') {
        return b.repliesCount - a.repliesCount;
      }
      if (sortBy === 'views') {
        return b.views - a.views;
      }
      if (sortBy === 'reactions') {
        const totalA = Object.values(a.reactions || {}).reduce((x, y) => x + y, 0);
        const totalB = Object.values(b.reactions || {}).reduce((x, y) => x + y, 0);
        return totalB - totalA;
      }
      return 0;
    });

    return result;
  }, [
    threads,
    currentTab,
    activeCategoryFilter,
    selectedTagFilter,
    showBookmarksOnly,
    searchQuery,
    sortBy,
  ]);

  const activeCategoryObject = categories.find((c) => c.id === activeCategoryFilter);

  return (
    <div className="min-h-screen bg-[#0b0c16] text-[#e2e8f0] flex flex-col font-sans">
      {/* 3-Zone Navigation Top Bar with Auth State */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab as any);
          setActiveThread(null);
        }}
        onOpenNewThread={() => {
          if (!currentUser) {
            setIsAuthModalOpen(true);
          } else {
            setIsNewThreadModalOpen(true);
          }
        }}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        currentUser={currentUser}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
      />

      {/* Weazel News Ticker & Live Release Countdown */}
      <TickerBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTag={selectedTagFilter}
        setSelectedTag={setSelectedTagFilter}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* If Active Thread Detail is Selected */}
        {activeThread ? (
          <ThreadDetail
            thread={activeThread}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onBack={() => setActiveThread(null)}
            onVotePoll={handleVotePoll}
            onReactThread={handleReactThread}
            onAddReply={handleAddReply}
            onToggleBookmark={handleToggleBookmark}
            onReactReply={handleReactReply}
          />
        ) : (
          <>
            {/* TAB: Experiencias de la Comunidad */}
            {currentTab === 'experiencias' && (
              <ExperiencesView
                experiences={experiences}
                currentUser={currentUser}
                onOpenAuth={() => setIsAuthModalOpen(true)}
                onOpenNewExperience={() => {
                  if (!currentUser) {
                    setIsAuthModalOpen(true);
                  } else {
                    setIsNewExperienceModalOpen(true);
                  }
                }}
                onReactExperience={handleReactExperience}
                onAddComment={handleAddExperienceComment}
              />
            )}

            {/* TAB: Categorías */}
            {currentTab === 'categorias' && (
              <SubforumList
                categories={categories}
                onSelectCategory={(catId) => {
                  setActiveCategoryFilter(catId);
                  setCurrentTab('debates');
                }}
                onNewThreadWithCategory={(catId) => {
                  setActiveCategoryFilter(catId);
                  if (!currentUser) {
                    setIsAuthModalOpen(true);
                  } else {
                    setIsNewThreadModalOpen(true);
                  }
                }}
              />
            )}

            {/* TAB: Mapa Interactivo de Leonida */}
            {currentTab === 'mapa' && (
              <LeonidaMapViewer
                pois={pois}
                onOpenThread={(threadId) => {
                  const target = threads.find((t) => t.id === threadId);
                  if (target) {
                    setActiveThread(target);
                  }
                }}
              />
            )}

            {/* TAB: Encuestas */}
            {currentTab === 'encuestas' && (
              <PollsDashboard
                threads={threads}
                onVotePoll={handleVotePoll}
                onOpenThread={(t) => setActiveThread(t)}
              />
            )}

            {/* TAB: Debates or Filtraciones */}
            {(currentTab === 'debates' || currentTab === 'filtraciones') && (
              <div className="space-y-6">
                {/* Hero Community Welcome Banner */}
                <div className="relative rounded-2xl overflow-hidden border border-[#262a4d] bg-gradient-to-r from-[#14162a] via-[#101222] to-[#17142b] p-6 sm:p-8 shadow-xl">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#ff007a]/15 via-[#00f0ff]/10 to-transparent blur-3xl pointer-events-none" />

                  <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#ff007a] uppercase tracking-wider">
                        <Flame className="w-4 h-4 text-[#ff007a]" />
                        <span>Comunidad Oficial Hispanohablante de Vice City & Leonida</span>
                      </div>
                      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                        {currentTab === 'filtraciones'
                          ? 'Archivo de Filtraciones y Análisis Técnico RAGE 9'
                          : 'El Portal de Debate Definitivo de GTA VI'}
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {currentTab === 'filtraciones'
                          ? 'Investigación profunda, ingeniería inversa del código filtrado, desgloses de patentes de Rockstar y física de simulación.'
                          : 'Comparte teorías, análisis fotograma a fotograma de los trailers, cartografía de Leonida y noticias verificadas con miles de jugadores.'}
                      </p>
                    </div>

                    {/* Community Metrics KPI Box */}
                    <div className="grid grid-cols-2 gap-3 w-full md:w-auto shrink-0 font-mono">
                      <div className="p-3 rounded-xl bg-[#0c0d18]/80 border border-[#222543] text-center">
                        <div className="text-[11px] text-slate-400">Debates Totales</div>
                        <div className="text-lg font-bold text-white tabular-nums">
                          {threads.length + 320}
                        </div>
                      </div>
                      <div className="p-3 rounded-xl bg-[#0c0d18]/80 border border-[#222543] text-center">
                        <div className="text-[11px] text-slate-400">En Línea Ahora</div>
                        <div className="text-lg font-bold text-[#00f0ff] tabular-nums">
                          1,842
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filter and Control Bar */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-3.5 rounded-xl bg-[#131527] border border-[#21243f]">
                  <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 text-xs">
                    <button
                      onClick={() => {
                        soundManager.playBlip();
                        setActiveCategoryFilter(null);
                        setSelectedTagFilter(null);
                        setShowBookmarksOnly(false);
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                        !activeCategoryFilter && !selectedTagFilter && !showBookmarksOnly
                          ? 'bg-[#ff007a] text-white font-bold'
                          : 'text-slate-400 hover:text-white bg-[#1a1c32]'
                      }`}
                    >
                      Todos
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playBlip();
                        setSelectedTagFilter(selectedTagFilter === 'OFICIAL' ? null : 'OFICIAL');
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                        selectedTagFilter === 'OFICIAL'
                          ? 'bg-[#00f0ff] text-black font-bold'
                          : 'text-slate-400 hover:text-white bg-[#1a1c32]'
                      }`}
                    >
                      Oficiales
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playBlip();
                        setSelectedTagFilter(selectedTagFilter === 'TEORÍA' ? null : 'TEORÍA');
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                        selectedTagFilter === 'TEORÍA'
                          ? 'bg-[#f59e0b] text-black font-bold'
                          : 'text-slate-400 hover:text-white bg-[#1a1c32]'
                      }`}
                    >
                      Teorías
                    </button>

                    <button
                      onClick={() => {
                        soundManager.playBlip();
                        setSelectedTagFilter(selectedTagFilter === 'FILTRACIÓN' ? null : 'FILTRACIÓN');
                      }}
                      className={`px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                        selectedTagFilter === 'FILTRACIÓN'
                          ? 'bg-purple-600 text-white font-bold'
                          : 'text-slate-400 hover:text-white bg-[#1a1c32]'
                      }`}
                    >
                      Filtraciones
                    </button>

                    <button
                      onClick={() => {
                        if (!currentUser) {
                          setIsAuthModalOpen(true);
                          return;
                        }
                        soundManager.playBlip();
                        setShowBookmarksOnly(!showBookmarksOnly);
                      }}
                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium transition-colors whitespace-nowrap shrink-0 ${
                        showBookmarksOnly
                          ? 'bg-[#ff007a]/20 border border-[#ff007a] text-[#ff007a]'
                          : 'text-slate-400 hover:text-white bg-[#1a1c32]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Guardados</span>
                    </button>
                  </div>

                  {/* Sort selector */}
                  <div className="flex items-center gap-2 shrink-0 text-xs">
                    <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
                    <span className="text-slate-400 hidden sm:inline">Ordenar por:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-[#1a1c32] text-slate-200 text-xs rounded-lg px-2.5 py-1.5 border border-[#2b2f54] focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="recent">Más recientes</option>
                      <option value="replies">Más respuestas</option>
                      <option value="views">Más vistos</option>
                      <option value="reactions">Mayor puntuación</option>
                    </select>
                  </div>
                </div>

                {activeCategoryObject && (
                  <div className="flex items-center justify-between p-3 rounded-lg bg-[#141629] border border-[#25284a] text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400">Filtrando por subforo:</span>
                      <strong className="text-[#00f0ff]">{activeCategoryObject.title}</strong>
                    </div>
                    <button
                      onClick={() => setActiveCategoryFilter(null)}
                      className="text-xs text-slate-400 hover:text-white underline"
                    >
                      Quitar filtro
                    </button>
                  </div>
                )}

                {/* Threads Feed Grid */}
                {displayedThreads.length === 0 ? (
                  <div className="p-12 text-center rounded-xl bg-[#131527] border border-[#21243f] space-y-3">
                    <HelpCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <h3 className="text-base font-bold text-white">No se encontraron debates</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      No hay hilos que coincidan con los filtros seleccionados o la búsqueda "{searchQuery}".
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setActiveCategoryFilter(null);
                        setSelectedTagFilter(null);
                        setShowBookmarksOnly(false);
                      }}
                      className="text-xs text-[#00f0ff] hover:underline font-semibold"
                    >
                      Restablecer todos los filtros
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {displayedThreads.map((thread) => (
                      <ThreadCard
                        key={thread.id}
                        thread={thread}
                        onSelect={(t) => setActiveThread(t)}
                        onToggleBookmark={handleToggleBookmark}
                        onReact={handleReactThread}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#1e213b] bg-[#0c0d18] text-xs text-slate-400 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <span className="font-display font-black text-sm text-white">
                LEONIDA<span className="text-[#ff007a]">FORUMS</span>
              </span>
              <span className="text-slate-600">·</span>
              <span>Comunidad de Grand Theft Auto VI</span>
            </div>

            <div className="flex items-center gap-5 text-slate-400">
              <button
                onClick={() => {
                  soundManager.playBlip();
                  setCurrentTab('debates');
                  setActiveThread(null);
                }}
                className="hover:text-white transition-colors"
              >
                Debates
              </button>
              <button
                onClick={() => {
                  soundManager.playBlip();
                  setCurrentTab('experiencias');
                  setActiveThread(null);
                }}
                className="hover:text-white transition-colors"
              >
                Experiencias
              </button>
              <button
                onClick={() => {
                  soundManager.playBlip();
                  setCurrentTab('mapa');
                  setActiveThread(null);
                }}
                className="hover:text-white transition-colors"
              >
                Cartografía
              </button>
              <button
                onClick={() => {
                  soundManager.playBlip();
                  setCurrentTab('encuestas');
                  setActiveThread(null);
                }}
                className="hover:text-white transition-colors"
              >
                Encuestas
              </button>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 text-center sm:text-left leading-relaxed">
            Aviso legal: Grand Theft Auto, GTA VI, Vice City, Leonida, y los logotipos asociados son marcas registradas propiedad de Take-Two Interactive Software y Rockstar Games. Este sitio web es una plataforma comunitaria independiente creada por y para fanáticos del videojuego con propósitos de debate y análisis sin fines de lucro.
          </p>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        accounts={accounts}
        onRegisterAccount={handleRegisterAccount}
      />

      {currentUser && (
        <>
          <NewThreadModal
            categories={categories}
            currentUser={currentUser}
            isOpen={isNewThreadModalOpen}
            onClose={() => setIsNewThreadModalOpen(false)}
            onCreate={handleCreateThread}
          />

          <NewExperienceModal
            isOpen={isNewExperienceModalOpen}
            onClose={() => setIsNewExperienceModalOpen(false)}
            currentUser={currentUser}
            onCreateExperience={handleCreateExperience}
          />

          <UserProfileModal
            currentUser={currentUser}
            isOpen={isProfileModalOpen}
            onClose={() => setIsProfileModalOpen(false)}
            onSave={(updated) => {
              setCurrentUser((prev) => (prev ? { ...prev, ...updated } : null));
              setAccounts((prev) =>
                prev.map((acc) =>
                  acc.id === currentUser.id ? { ...acc, ...updated } : acc
                )
              );
            }}
          />
        </>
      )}
    </div>
  );
}
