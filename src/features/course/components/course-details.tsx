import { ArrowLeft, BookOpen, Calendar, CheckCircle2, Clock, DollarSign, GraduationCap, Users, XCircle } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAuth } from "@/features/auth/queries/get-auth";
import { isStudent } from "@/features/utils/is-student";
import { isTeacher } from "@/features/utils/is-teacher";
import { coursesPath } from "@/paths/paths";
import { format } from "date-fns";
import Link from "next/link";
import { CourseEnrollment, EnrollmentStatus } from "../course-enrollments/types";
import { Course, CourseLevel } from "../types";
import { isCourseOwner } from "../utils/is-course-owner";
import { CourseEnrollmentButton } from "./course-enrollment-button";

// Helper function to get level badge color
function getLevelColor(level: CourseLevel): string {
  switch (level) {
    case CourseLevel.beginner:
      return "bg-green-100 text-green-800 hover:bg-green-100";
    case CourseLevel.intermediate:
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
    case CourseLevel.advanced:
      return "bg-red-100 text-red-800 hover:bg-red-100";
    default:
      return "bg-gray-100 text-gray-800 hover:bg-gray-100";
  }
}

type CourseDetailsProps = {
  course: Course;
  courseEnrollments: CourseEnrollment[];
};

export const CourseDetails = async ({ course, courseEnrollments }: CourseDetailsProps) => {
  const user = await getAuth();
  const isEnrolled = courseEnrollments?.some((enrollment) => enrollment.course === course._id && enrollment.enrollmentStatus === EnrollmentStatus.active && enrollment.student._id === user.id);
  const activeEnrollments = courseEnrollments.filter((enrollment) => enrollment.enrollmentStatus === EnrollmentStatus.active);
  console.log(course.createdBy._id, user.id);
  console.log("isEnrolled", isEnrolled);
  console.log(courseEnrollments);
  console.log("activeEnrollments", activeEnrollments);

  return (
    <div className="w-full px-6 space-y-5 ">
      <Link href={coursesPath()} className={buttonVariants({ variant: "ghost" })}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to courses
      </Link>

      <div className="grid gap-6">
        {/* Course Details Card */}
        <Card className="overflow-hidden">
          <CardHeader className=" border-b">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="text-2xl md:text-3xl">{course.title}</CardTitle>
                <CardDescription className="text-sm md:text-base mt-2">
                  <span className="font-medium">Course Code:</span> {course.code}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2.5">
                {isStudent(user.role) && (
                  <>
                    <CourseEnrollmentButton isEnrolled={isEnrolled} courseId={course._id} variant="ghost" />
                  </>
                )}
                <Badge variant="outline" className={`${getLevelColor(course.level)} text-xs md:text-sm px-3 py-1 font-medium`}>
                  {course.level}
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="grid gap-6">
              {/* Description */}
              {course.description && (
                <div>
                  <h3 className="text-lg font-semibold mb-1">Description</h3>
                  <p className="text-muted-foreground">{course.description}</p>
                </div>
              )}

              {/* Course Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${course.price.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{course.duration} hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <BookOpen className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{course.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <Users className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-medium">{activeEnrollments.length || 0}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium">{format(new Date(course.createdAt), "MMMM dd yyyy")}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">{course.isActive ? <CheckCircle2 className="h-5 w-5 text-green-600" /> : <XCircle className="h-5 w-5 text-red-600" />}</div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{course.isActive ? "Active" : "Inactive"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-zinc-200 p-2 rounded-full">
                    <GraduationCap className="h-5 w-5 text-slate-700" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Approval Required</p>
                    <p className="font-medium">{course.requireApproval ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>

          {isTeacher(user.role) && (
            <CardFooter className="flex flex-col sm:flex-row sm:justify-end gap-3 pt-2 border-t">
              <Button>Edit Course</Button>
            </CardFooter>
          )}
        </Card>

        {/* Students Section */}
        {isCourseOwner(course.createdBy._id, user.id) && isTeacher(user.role) ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">Enrolled Students</h2>
              <Button variant="outline" size="sm">
                <Users className="h-4 w-4 mr-2" />
                Add Students
              </Button>
            </div>

            {activeEnrollments.length ? (
              <Card>
                <div className="overflow-x-auto px-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Enrollet At</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeEnrollments.map((enrollment) => (
                        <TableRow key={enrollment._id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={enrollment.student.picture || "/placeholder.svg"} alt={enrollment.student.userName} />
                                <AvatarFallback>{enrollment.student.userName.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <span className="font-medium">{enrollment.student.userName}</span>
                            </div>
                          </TableCell>
                          <TableCell>{enrollment.student.email}</TableCell>
                          <TableCell>{enrollment.enrolledAt}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              Remove
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            ) : (
              <Card className="p-8 text-center">
                <div className="flex flex-col items-center gap-2">
                  <Users className="h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium">No Students Enrolled</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">There are no students enrolled in this course yet. Add students to get started.</p>
                  <Button className="mt-4">Add First Student</Button>
                </div>
              </Card>
            )}
          </div>
        ) : (
          <>
            {!isEnrolled ? (
              <Card className="p-8 text-center border">
                <div className="flex flex-col items-center justify-center gap-2">
                  <BookOpen className="h-12 w-12 text-gray-300" />
                  <h3 className="text-lg font-medium">Not Enrolled yet</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">Enroll yourself to get most of it.</p>
                  {/* <div className="flex items-center justify-center"> */}
                  <CourseEnrollmentButton isEnrolled={isEnrolled} courseId={course._id} className="w-fit" />
                  {/* </div> */}
                </div>
              </Card>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};
