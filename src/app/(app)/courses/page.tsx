import Spinner from "@/components/spinner";
import { CourseList } from "@/features/course/components/course-list";
import { Suspense } from "react";

const CoursesPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <CourseList />
    </Suspense>
  );
};

export default CoursesPage;
