export type UserType = "admin" | "member" | "alumni";

export interface User {
  email: string;
  password: string;
  userType: UserType;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
}

export interface Message {
  senderName: string;
  message: string;
  senderMail: string;
  updatedAt: Date;
  repliedTo?:string;
}

export interface Theme {
  border: any;
  hover: any;
  background: string;
  surface: string;
  primary: string;
  text: string;
  textSecondary: string;
}

export interface CustomSettings {
  messageBubbleStyle: "rounded" | "sharp";
  fontSize: "small" | "medium" | "large";
  messageSpacing: "compact" | "comfortable";
  showTimestamps: boolean;
}

export interface Question {
  _id: string;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
  difficulty: "easy" | "medium" | "hard";
  category: string;
}

export interface Quiz {
  _id: string;
  title: string;
  createdBy: string;
  questionsLength: number;
}

export interface Module {
  id: number;
  title: string;
  description: string;
  topics: {
    name: string;
    link: string;
  }[];
}

export interface NavbarProps {
  onBackToAdmin?: () => void;
  isAdmin?: boolean;
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface DashBoard {
  username: string;
  email: string;
  role: string;
  graduationYear: number;
}

export interface Interview {
  interviewer: string;
  designation: string;
  topic: string;
  subtopic: string;
  date: string;
  time: string;
  meetingLink: string;
  endTime:string;
}

export interface IInterview {
  _id:Object;
  username: string;
  role: string;
  alumniRole?: string;
  userId: Object;
  interviewDate: Date;
  numberOfSlots: number;
  slots: {
    startTime: string;
    interviewLink: string;
    bookedBy?: Object;
  }[];
  interviewLink:string;
}