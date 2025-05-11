import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { getAuth } from "@/features/auth/queries/get-auth";
import { getCourses } from "@/features/queries/get-courses";
import { getQuizzes } from "@/features/queries/get-quizzes";
import { isTeacher } from "@/features/utils/is-teacher";
import { cn } from "@/lib/utils";
import { CreateQuizForm } from "./create-quiz-form";
import { DialogShell } from "./dialog-shell";
import { QuizCard } from "./quiz-card";
type CourseListProps = {
  className?: string;
};

const QuizList = async ({ className }: CourseListProps) => {
  const user = await getAuth();
  const quizzes = await getQuizzes(isTeacher(user.role) ? user.id : undefined);
  const courses = getCourses(user.id);
  return (
    <div className={cn("p-4 space-y-7", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl tracking-wide">Quizzes</h2>
        {isTeacher(user.role) && (
          <DialogShell
            title="Create new quiz"
            description="Create a new quiz for your students"
            triggerText="Create Quiz"
            trigger={
              <DialogTrigger asChild>
                <Button>Create Quiz</Button>
              </DialogTrigger>
            }
          >
            <CreateQuizForm coursesPromise={courses} />
          </DialogShell>
        )}
      </div>

      <ul className="grid grid-cols-3 lg:gap-x-3.5 gap-y-3">{quizzes.length && quizzes.map((quiz) => <QuizCard key={quiz._id} quiz={quiz} role={user.role} />)}</ul>
    </div>
  );
};
export default QuizList;
