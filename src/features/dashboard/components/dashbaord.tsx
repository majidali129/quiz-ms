import { auth } from "@/auth";
import Spinner from "@/components/spinner";
import { ROLE } from "@/types/index";
import { Suspense } from "react";
import { StudentDashboard } from "./student-dashboard";
import { TeacherDashboard } from "./teacher-dashboard";

const Dashbaord = async () => {
  const session = await auth();

  const renderDashboard = session?.user.role === ROLE.teacher ? <TeacherDashboard /> : <StudentDashboard />;

  return <Suspense fallback={<Spinner />}>{renderDashboard}</Suspense>;
};
export { Dashbaord };
