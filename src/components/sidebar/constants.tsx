import { BookOpen, ClipboardList, Clock, HelpCircle, HomeIcon } from "lucide-react";
export const sidebar_items = {
  teacher: [
    { label: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
    { label: "Courses", href: "/courses", icon: <BookOpen /> },
    { label: "Quizzes", href: "/quizzes", icon: <ClipboardList /> },
    // { label: "Students", href: "/students", icon: <Users /> },
    // { label: "Settings", href: "/settings", icon: <Settings /> },
  ],
  student: [
    { label: "Dashboard", href: "/student/dashboard", icon: <HomeIcon /> },
    { label: "Enrollments", href: "/student/enrollments", icon: <BookOpen /> },
    { label: "Available Quizzes", href: "/student/available-quizzes", icon: <Clock /> },
    { label: "Help Center", href: "/student/help", icon: <HelpCircle /> },
  ],
};
