// Enum Types
enum STATUS {
  NOT_STARTED = 'NOT_STARTED',
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  IN_PROGRESS = 'IN_PROGRESS',
  UPDATED = 'UPDATED',
}

enum VOCABULARY_STATUS {
  LEARNING = 'LEARNING',
  REVIEW_PENDING = 'REVIEW_PENDING',
  COMPLETED = 'COMPLETED',
}

enum NOTIFICATION_STATUS {
  PENDING = 'PENDING',
  SENT = 'SENT',
  FAILED = 'FAILED',
}

enum NOTIFICATION_TYPE {
  REVIEW = 'REVIEW',
  LESSON_REMINDER = 'LESSON_REMINDER',
  PROGRESS_MILESTONE = 'PROGRESS_MILESTONE',
}

// Interfaces for models

export interface User {
  id: string;
  name: string;
  email: string;
  providerId: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
  refreshToken?: string;
  is_admin: boolean;
  createdAt: Date;
  updatedAt: Date;
  completedLessonCount: number;
  courses?: Course[];
  lessonStatuses?: LessonStatus[];
  courseStatuses?: CourseStatus[];
  vocabularyStatuses?: VocabularyStatus[];
  notifications?: Notification[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  lessons?: Lesson[];
  createdBy?: User;
  statuses?: CourseStatus[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  
  // Relations
  course: Course;
  flashCards?: FlashCard[];
  grammars?: Grammar[];
  vocabularies?: Vocabulary[];
  miniTests?: MiniTest[];
  statuses?: LessonStatus[];
}

export interface FlashCard {
  id: string;
  term: string;
  definition: string;
  kanji: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
  originalIndex?: number;
}

export interface Vocabulary {
  id: string;
  wordJP: string;
  wordVN: string;
  kanji: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grammar {
  id: string;
  rule: string;
  description: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Listening {
  id: string;
  title: string;
  description: string;
  audioUrl: string;
  thumbnailUrl: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Insights {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MiniTest {
  id: string;
  question: string;
  answer: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonStatus {
  id: string;
  status: STATUS;
  progress: number; // Progress percentage
  userId: string;
  lessonId: string;
  createdAt: Date;
  updatedAt: Date;
  
}

export interface CourseStatus {
  id: string;
  status: STATUS;
  progress: number; // Progress percentage
  userId: string;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  course: Course;
}

export interface Notification {
  id: string;
  type: NOTIFICATION_TYPE;
  message: string;
  sentAt?: Date;
  status: NOTIFICATION_STATUS;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  vocabularyStatuses?: VocabularyStatus[];
}

export interface VocabularyStatus {
  id: string;
  status: VOCABULARY_STATUS;
  learnedAt: Date;
  nextReviewAt: Date;
  reviewStage: number;
  userId: string;
  vocabularyId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  vocabulary: Vocabulary;
  notifications?: Notification[];
}
