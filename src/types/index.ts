// User types
export interface User {
  id: string;
  email?: string;
  createdAt: Date;
  updatedAt: Date;
  role: 'user' | 'moderator' | 'admin';
  isAnonymous: boolean;
  consentFlags: {
    terms: boolean;
    privacy: boolean;
    notifications: boolean;
  };
}

export interface Profile {
  id: string;
  userId: string;
  displayName: string;
  experienceYears: number;
  workType: 'fulltime' | 'parttime' | 'temporary' | 'leave';
  interests: string[];
  avatarUrl?: string;
  bio?: string;
  points: number;
  streak: number;
  badges: Badge[];
  createdAt: Date;
  updatedAt: Date;
}

// Content types
export interface ContentCard {
  id: string;
  type: 'salary' | 'tax' | 'interpersonal' | 'career';
  title: string;
  body: string;
  keyPoints: string[];
  actionItem: string;
  links: ExternalLink[];
  imageUrl: string;
  segment: string[];
  saveCount: number;
  shareCount: number;
  createdAt: Date;
  publishedAt: Date;
  expiresAt?: Date;
}

export interface Quiz {
  id: string;
  question: string;
  options: QuizOption[];
  correctAnswer: number;
  explanation: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  imageUrl?: string;
  createdAt: Date;
}

export interface QuizOption {
  id: number;
  text: string;
}

export interface QuizAnswer {
  id: string;
  userId: string;
  quizId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
  answeredAt: Date;
}

// Forum types
export interface Thread {
  id: string;
  title: string;
  body: string;
  tags: string[];
  authorId: string;
  isAnonymous: boolean;
  status: 'open' | 'resolved' | 'closed';
  acceptedPostId?: string;
  answerCount: number;
  viewCount: number;
  score: number;
  lastActivityAt: Date;
  createdAt: Date;
  updatedAt: Date;
  moderationState: 'pending' | 'approved' | 'hidden';
}

export interface Post {
  id: string;
  threadId: string;
  body: string;
  authorId: string;
  isAnonymous: boolean;
  parentPostId?: string;
  upvotes: number;
  isAccepted: boolean;
  createdAt: Date;
  updatedAt: Date;
  moderationState: 'pending' | 'approved' | 'hidden';
}

// Mission types
export interface Mission {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  durationMinutes: number;
  steps: string[];
  reward?: Reward;
  createdAt: Date;
  activeUntil: Date;
}

export interface MissionLog {
  id: string;
  userId: string;
  missionId: string;
  completedAt: Date;
  pointsEarned: number;
  rewardClaimed?: string;
}

// Arareru (あるある) types
export interface Arareru {
  id: string;
  content: string;
  authorId: string;
  isAnonymous: boolean;
  template?: string;
  reactions: {
    wakaru: number;
    warau: number;
    yakudachi: number;
  };
  imageUrl?: string;
  shareCount: number;
  createdAt: Date;
  moderationState: 'pending' | 'approved' | 'hidden';
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'reply' | 'mention' | 'badge' | 'mission' | 'streak' | 'system';
  title: string;
  body: string;
  data?: Record<string, any>;
  read: boolean;
  readAt?: Date;
  createdAt: Date;
}

// Support types
export interface Badge {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  earnedAt: Date;
}

export interface Reward {
  id: string;
  type: 'template' | 'checklist' | 'badge' | 'content';
  name: string;
  description: string;
  value: any;
}

export interface ExternalLink {
  title: string;
  url: string;
  source: string;
}

export interface Save {
  id: string;
  userId: string;
  contentType: 'card' | 'thread' | 'arareru';
  contentId: string;
  savedAt: Date;
  tags?: string[];
}

export interface Share {
  id: string;
  userId: string;
  contentType: 'card' | 'quiz' | 'thread' | 'arareru';
  contentId: string;
  platform: 'twitter' | 'line' | 'facebook' | 'copy';
  sharedAt: Date;
}

export interface Reaction {
  id: string;
  userId: string;
  contentType: 'arareru' | 'post';
  contentId: string;
  type: 'wakaru' | 'warau' | 'yakudachi' | 'helpful';
  createdAt: Date;
}

export interface ForumSubscription {
  id: string;
  userId: string;
  threadId?: string;
  tag?: string;
  subscribedAt: Date;
  notificationPrefs: {
    newPosts: boolean;
    mentions: boolean;
    resolved: boolean;
  };
}

export interface Report {
  id: string;
  reporterId: string;
  contentType: string;
  contentId: string;
  reason: string;
  description?: string;
  status: 'pending' | 'reviewed' | 'resolved';
  createdAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string;
}

export interface ModerationLog {
  id: string;
  moderatorId: string;
  action: string;
  contentType: string;
  contentId: string;
  reason: string;
  createdAt: Date;
}