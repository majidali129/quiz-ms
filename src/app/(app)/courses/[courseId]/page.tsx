import { CourseDetails } from "@/features/course/components/course-details";
import { getCourse } from "@/features/queries/get-course";
import { getEnrollments } from "@/features/queries/get-enrollments";
import { notFound } from "next/navigation";

type CourseDetailsPageProps = {
  params: Promise<{ courseId: string }>;
};
const CoruseDetailsPage = async ({ params }: CourseDetailsPageProps) => {
  const courseId = (await params).courseId;
  const course = await getCourse(courseId);
  if (!course) notFound();
  const courseEnrollments = await getEnrollments(courseId);

  return <CourseDetails course={course} courseEnrollments={courseEnrollments} />;
};
export default CoruseDetailsPage;
