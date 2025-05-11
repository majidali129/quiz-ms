import { getAuth } from "@/features/auth/queries/get-auth";
import QuizStatsCard from "@/features/quiz/components/quiz-stats-card";
import { RecentQuizzes } from "@/features/quiz/components/recent-quizzes";
import { RecentResults } from "@/features/quiz/components/recent-results";
import { UpcomingQuizzes } from "@/features/quiz/components/upcoming-quizzes";
import { QuizResult as QuizResultType, Quiz as QuizType } from "@/features/quiz/types";
import { connectDB } from "@/lib/connect-db";
import { CourseEnrollment } from "@/models/course-enrollment-model";
import { Course } from "@/models/course-model";
import { Quiz } from "@/models/quiz-model";
import { QuizResult } from "@/models/quiz-results.-model";
import { format } from "date-fns";

const TeacherDashboard = async () => {
  await connectDB();
  const user = await getAuth();

  // courses by the teacher
  const teacherCourses = await Course.find({ createdBy: user.id }).select("_id");
  const courseIds = teacherCourses.map((course) => course._id);

  // 2. Get enrollments in those courses
  const enrollments = await CourseEnrollment.find({
    course: { $in: courseIds },
  });

  // Quizzes created by this teacher
  const createdQuizzes = await Quiz.find({ createdBy: user.id });
  const quizIds = createdQuizzes.map((quiz) => quiz._id);

  // Courses created by this teacher
  const createdCourses = await Course.find({ createdBy: user.id });
  const totalCoursesCreated = createdCourses.length;

  const recentQuizzes = JSON.parse(
    JSON.stringify(
      await Quiz.find({ createdBy: user.id })
        .populate({ path: "createdBy", select: "_id userName picture" })
        .populate({ path: "course", select: "_id title" })
        .sort({ createdAt: -1 }) // latest first
        .limit(5)
        .populate({ path: "course", select: "_id title category" })
    )
  ) as QuizType[];

  const today = format(new Date(), "yyyy-MM-dd");

  const upcomingQuizzes = JSON.parse(
    JSON.stringify(
      await Quiz.find({
        createdBy: user.id,
        "schedule.startDate": { $gte: today },
      })
        .populate({ path: "createdBy", select: "_id userName picture" })
        .populate({ path: "course", select: "_id title" })
        .sort({ "schedule.startDate": 1 }) // soonest first
        .populate({ path: "course", select: "_id title category" })
    )
  ) as QuizType[];

  const recentResults = JSON.parse(
    JSON.stringify(
      await QuizResult.find({ quiz: { $in: quizIds } })
        .sort({ createdAt: -1 }) // latest first
        .limit(5)
        .populate({ path: "student", select: "_id userName picture" })
        .populate({ path: "quiz", select: "_id title" })
    )
  ) as QuizResultType[];

  return (
    <section className="w-full flex flex-col bg-transparent ">
      <div className="flex items-center justify-between gap-y-3 lg:gap-x-3.5 p-4 ">
        <QuizStatsCard value={totalCoursesCreated} title="Total Courses" description="Currently published courses" />
        <QuizStatsCard value={enrollments.length} title="Total Students" description="Enrolled students" />
        <QuizStatsCard value={createdQuizzes.length} title="Total Quizzes" description="Quizzes created by you" />
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-3 p-4">
        <RecentQuizzes quizzes={recentQuizzes} />
        <RecentResults results={recentResults} />
      </div>
      <div className="grid grid-cols-2 gap-x-3.5 gap-y-3 p-4">
        <UpcomingQuizzes quizzes={upcomingQuizzes} />
        {/* <QuizRecentPerformance /> */}
      </div>
    </section>
  );
};
export { TeacherDashboard };
