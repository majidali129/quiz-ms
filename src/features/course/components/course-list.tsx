import { EmptyPlayceholder } from "@/components/empty-place-holder";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { getAuth } from "@/features/auth/queries/get-auth";
import { DialogShell } from "@/features/quiz/components/dialog-shell";
import { isTeacher } from "@/features/utils/is-teacher";
import { cn } from "@/lib/utils";
import { getCourses } from "../../queries/get-courses";
import { CourseCard } from "./course-card";
import CreateCourseForm from "./course-create-form";

type CourseListProps = {
  className?: string;
};
export const CourseList = async ({ className }: CourseListProps) => {
  const user = await getAuth();
  const courses = await getCourses(isTeacher(user.role) ? user.id : undefined);
  return (
    <div className={cn("p-4 space-y-7", className)}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl tracking-wide">Courses ({courses.length})</h2>
        {isTeacher(user.role) && (
          <DialogShell
            title="Create new course"
            description="Publish a new couse for your students"
            triggerText="Create Course"
            trigger={
              <DialogTrigger asChild>
                <Button>Create Course</Button>
              </DialogTrigger>
            }
          >
            <CreateCourseForm />
          </DialogShell>
        )}
      </div>
      if(courses.length === 0) return <EmptyPlayceholder />
      <ul className="grid md:grid-cols-2 gap-3.5 xl:grid-cols-3">{courses.length && courses.map((course) => <CourseCard key={course._id} course={course} />)}</ul>
    </div>
  );
};
