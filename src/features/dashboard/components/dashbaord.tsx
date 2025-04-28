import { auth } from "@/auth";
import { ROLE } from "@/models/user-model";
import { StudentDashboard } from "./student-dashboard";
import { TeacherDashboard } from "./teacher-dashboard";

const Dashbaord = async () => {
  const session = await auth();

  const renderDashboard = session?.user.role === ROLE.teacher ? <TeacherDashboard /> : <StudentDashboard />;

  return <>{renderDashboard}</>;
};
export { Dashbaord };
