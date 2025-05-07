export const enum CourseLevel {
  beginner = "beginner",
  intermediate = "intermediate",
  advanced = "advanced",
}

export type Course = {
  _id: string;
  title: string;
  description?: string;
  code: string;
  requireApproval?: boolean;
  category: string;
  price: number;
  duration: number;
  level: CourseLevel;
  createdBy: { _id: string; userName: string };
  students: { _id: string; userName: string; email?: string; picture?: string }[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
