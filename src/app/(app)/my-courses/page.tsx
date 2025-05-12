import Spinner from "@/components/spinner";
import { MyCoursesList } from "@/features/course/components/my-courses-list";
import { Suspense } from "react";

const MyCoursesPage = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <MyCoursesList />
    </Suspense>
  );
};
export default MyCoursesPage;
