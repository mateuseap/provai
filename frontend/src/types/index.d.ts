export type Sizes =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl"
  | "10xl";

interface Question {
  question_number: number;
  question: string;
  options?: Array<string>;
}

interface Answer {
  question_number: number;
  answer: string;
}

export interface Exam {
  subject: string;
  instructions: Array<string>;
  questions: Array<Question>;
  answers: Array<Answer>;
  correction_instructions: Array<string>;
  alerts: Array<string>;
}
