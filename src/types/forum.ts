export interface UserProfile {
  id: string;
  username: string;
  tag: string;
  avatar: string;
  rank: string;
  reputation: number;
  postsCount: number;
  joinDate: string;
  signature: string;
  badge?: string;
  isOnline: boolean;
}

export interface SubCategory {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  threadsCount: number;
  postsCount: number;
  latestActivity: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
}

export interface ThreadPoll {
  question: string;
  options: PollOption[];
  totalVotes: number;
  userVotedOptionId?: string;
}

export interface ThreadReply {
  id: string;
  threadId: string;
  author: UserProfile;
  createdAt: string;
  content: string;
  quote?: {
    authorName: string;
    text: string;
  };
  reactions: Record<string, number>;
  userReaction?: string;
}

export interface ForumThread {
  id: string;
  categoryId: string;
  categoryTitle: string;
  title: string;
  author: UserProfile;
  createdAt: string;
  updatedAt: string;
  views: number;
  repliesCount: number;
  isPinned: boolean;
  isLocked: boolean;
  tags: string[];
  summary: string;
  content: string;
  imageBanner?: string;
  poll?: ThreadPoll;
  reactions: Record<string, number>;
  userReaction?: string;
  isBookmarked?: boolean;
  replies: ThreadReply[];
}

export interface MapPOI {
  id: string;
  name: string;
  district: string;
  category: 'city' | 'nature' | 'transport' | 'crime' | 'leak';
  coordinates: { x: number; y: number }; // percentage 0-100
  description: string;
  confirmedFeatures: string[];
  speculation: string;
  relatedThreadId?: string;
}

export interface UserAccount extends UserProfile {
  email: string;
  password?: string;
  bio?: string;
}

export interface ExperienceComment {
  id: string;
  experienceId: string;
  author: UserProfile;
  createdAt: string;
  content: string;
}

export interface PlayerExperience {
  id: string;
  title: string;
  author: UserProfile;
  createdAt: string;
  category: 'nostalgia' | 'expectativa' | 'roleplay' | 'anecdota';
  gameFocus: string; // e.g. 'GTA VI', 'GTA Vice City', 'GTA V', 'GTA San Andreas'
  location?: string;
  hypeRating: number; // 1-5
  content: string;
  image?: string;
  reactions: Record<string, number>;
  userReaction?: string;
  comments: ExperienceComment[];
}

