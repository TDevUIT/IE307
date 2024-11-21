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
  id: number;
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
  id: number;
  title: string;
  content: string;
  courseId: number;
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
  id: number;
  term: string;
  definition: string;
  kanji: string;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vocabulary {
  id: number;
  wordJP: string;
  wordVN: string;
  kanji: string;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Grammar {
  id: number;
  rule: string;
  description: string;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface MiniTest {
  id: number;
  question: string;
  answer: string;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonStatus {
  id: number;
  status: STATUS;
  progress: number; // Progress percentage
  userId: string;
  lessonId: number;
  createdAt: Date;
  updatedAt: Date;
  
}

export interface CourseStatus {
  id: number;
  status: STATUS;
  progress: number; // Progress percentage
  userId: string;
  courseId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  course: Course;
}

export interface Notification {
  id: number;
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
  id: number;
  status: VOCABULARY_STATUS;
  learnedAt: Date;
  nextReviewAt: Date;
  reviewStage: number;
  userId: string;
  vocabularyId: number;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  vocabulary: Vocabulary;
  notifications?: Notification[];
}
