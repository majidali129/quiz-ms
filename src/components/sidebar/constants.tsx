import { BarChart, BookOpen, ClipboardList, Clock, HelpCircle, HomeIcon, Settings, Users } from "lucide-react";
export const sidebar_items = {
  teacher: [
    { label: "Dashboard", href: "/teacher/dashboard", icon: <HomeIcon /> },
    { label: "Courses", href: "/teacher/courses", icon: <BookOpen /> },
    { label: "Quizzes", href: "/teacher/quizzes", icon: <ClipboardList /> },
    { label: "Results", href: "/teacher/results", icon: <BarChart /> },
    { label: "Students", href: "/teacher/students", icon: <Users /> },
    { label: "Settings", href: "/teacher/settings", icon: <Settings /> },
  ],
  student: [
    { label: "Dashboard", href: "/student/dashboard", icon: <HomeIcon /> },
    { label: "Enrollments", href: "/student/enrollments", icon: <BookOpen /> },
    { label: "Available Quizzes", href: "/student/available-quizzes", icon: <Clock /> },
    { label: "Help Center", href: "/student/help", icon: <HelpCircle /> },
  ],
};
