import { BookCopy, BookOpen, ClipboardList, HomeIcon } from "lucide-react";
export const sidebar_items = {
  teacher: [
    { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { label: "Courses", href: "/courses", icon: <BookOpen /> },
    { label: "Quizzes", href: "/quizzes", icon: <ClipboardList /> },
  ],
  student: [
    { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { label: "Courses", href: "/courses", icon: <BookOpen /> },
    { label: "My Courses", href: "/my-courses", icon: <BookCopy /> },
    { label: "Quizzes", href: "/quizzes", icon: <ClipboardList /> },
  ],
};
