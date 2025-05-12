import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuth } from "@/features/auth/queries/get-auth";
import { getEnrollments } from "@/features/queries/get-enrollments";
import { isTeacher } from "@/features/utils/is-teacher";
import { formatDistanceToNow } from "date-fns";
import { Clock, MoreVertical, UserMinus, UserPlus, Users } from "lucide-react";
import { EnrollmentStatus } from "../course-enrollments/types";
import { Course } from "../types";
import { isCourseOwner } from "../utils/is-course-owner";
import { CourseCardMoreMenu } from "./course-more-menu";

interface CourseCardProps {
  course: Course;
}

const CourseCard = async ({ course }: CourseCardProps) => {
  const user = await getAuth();
  console.log("course", course);
  const studentEnrollments = await getEnrollments(course._id);
  const userRole = user.role;
  const userId = user.id;

  console.log("studentEnrollments", studentEnrollments);

  const isCreator = isCourseOwner(course.createdBy._id, userId);

  const isEnrolled = studentEnrollments.some((enrollment) => enrollment.course === course?._id && enrollment.enrollmentStatus === EnrollmentStatus.active && enrollment.student?._id === user.id);
  const activeEnrollments = studentEnrollments.filter((enrollment) => enrollment.enrollmentStatus === EnrollmentStatus.active).length;

  const courseMoreMenu = (
    <CourseCardMoreMenu
      course={course}
      isEnrolled={isEnrolled}
      trigger={
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      }
    />
  );

  return (
    <Card key={course._id}>
      <CardHeader className="">
        <div className="flex justify-between items-start">
          <div className="space-y-0.5">
            <CardTitle className="text-xl">{course.title}</CardTitle>
            <CardDescription className="text-sm font-medium flex items-center gap-1.5 max-md:flex-wrap">
              {course.code}
              <div className="flex flex-wrap gap-2">
                <Badge variant={course.isActive ? "default" : "secondary"}>{course.isActive ? "Active" : "Inactive"}</Badge>
                {course.requireApproval && <Badge variant="outline">Approval Required</Badge>}
              </div>
            </CardDescription>
          </div>

          {courseMoreMenu}
        </div>
      </CardHeader>

      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground line-clamp-3">{course.description || "No description provided."}</p>

        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-1 h-4 w-4" />
          <span>Last updated: {formatDistanceToNow(new Date(course.updatedAt), { addSuffix: true })}</span>
        </div>

        <div className="flex items-center text-sm">
          <Users className="mr-1 h-4 w-4" />
          <span>
            {activeEnrollments} student{activeEnrollments !== 1 ? "s" : ""}
          </span>
        </div>
      </CardContent>

      <CardFooter className="pt-2 hidden">
        {isTeacher(userRole) ? (
          <Button variant="outline" className="w-full" disabled={isCreator}>
            {isCreator ? "View Course" : "Not Your Course"}
          </Button>
        ) : isEnrolled ? (
          <Button variant="outline" className="w-full">
            <UserMinus className="mr-2 h-4 w-4" />
            Unenroll
          </Button>
        ) : (
          <Button size="sm" className="w-full" disabled={!course.isActive}>
            <UserPlus className="mr-2 h-4 w-4" />
            {course.requireApproval ? "Request Enrollment" : "Enroll Now"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
export { CourseCard };
