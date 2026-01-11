
export enum SubscriptionTier {
  FREE = 'FREE',
  BASIC = 'BASIC',
  BASIC_PROTOCOLOS = 'BASIC_PROTOCOLOS',
  PROTOCOLOS = 'PROTOCOLOS',
  PREMIUM = 'PREMIUM'
}

export interface User {
  name: string;
  lastName: string;
  email: string;
  age: number;
  phone: string;
  tier: SubscriptionTier;
  weeksEnrolled: number;
  registrationDate: string;
  avatarUrl?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export interface Topic {
  id: string;
  title: string;
  category: 'IVASPE' | 'ALICANTE_PROTOCOL' | 'LEGISLATIVO' | 'GENERIC';
  description: string;
  weekIndex?: number;
  isFree: boolean;
  pdfUrl?: string;
}

export interface Question {
  id: number;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  explanation: string;
}

export interface TestResult {
  score: number;
  total: number;
  answers: Record<number, string>;
}

export interface StoredTestResult {
  topicId: string;
  topicTitle: string;
  score: number;
  total: number;
  date: string;
  questions: Question[];
  userAnswers: Record<number, string>; // Guardamos las respuestas dadas para revisión
  isRetry?: boolean;
}

// Added missing interface for project categories used in the migration guide components
export interface ProjectCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
}
