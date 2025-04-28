import { QuizRecentPerformance } from "@/features/quiz/components/quiz-recent-performance";
import QuizStatsCard from "@/features/quiz/components/quiz-stats-card";
import { RecentQuizzes } from "@/features/quiz/components/recent-quizzes";
import RecentResults from "@/features/quiz/components/recent-results";
import { UpcomingQuizzes } from "@/features/quiz/components/upcoming-quizzes";

const TeacherDashboard = async () => {
  return (
    <section className="w-full flex flex-col bg-transparent ">
      <div className="flex items-center justify-between gap-y-3 lg:gap-x-3.5 p-4">
        <QuizStatsCard value={43} title="Active Quizzes" description="Currently running quizzes" />
        <QuizStatsCard value={54} title="Total Students" description="Enrolled Students" />
        <QuizStatsCard value={120} title="Completed Quizzes" description="Total Completed quizzes" />
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-3 p-4">
        <RecentQuizzes />
        <RecentResults />
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-3 p-4">
        <UpcomingQuizzes />
        <QuizRecentPerformance />
      </div>
    </section>
  );
};
export { TeacherDashboard };
