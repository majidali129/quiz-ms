export const homePath = () => "/";

export const signUpPath = () => "/sign-up";
export const signInPath = () => "/sign-in";
export const forgotPasswordPath = () => "/forgot-password";

export const dashboardPath = () => "/dashboard";
export const teacherQuizesPath = () => "/teacher/quizzes";
export const quizPath = (quizId: string) => `/teacher/quizzes/${quizId}`;
export const coursesPath = () => "/courses";
export const coursePath = (courseId: string) => `/courses/${courseId}`;

export const enrollmentsPath = () => "/enrollments";
export const enrollmentPath = (enrollmentId: string) => `/enrollments/${enrollmentId}`;
