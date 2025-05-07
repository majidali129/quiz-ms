import { auth } from "@/auth";
import { ROLE } from "@/types/index";
import { StudentDashboard } from "./student-dashboard";
import { TeacherDashboard } from "./teacher-dashboard";

const Dashbaord = async () => {
  const session = await auth();

  const renderDashboard = session?.user.role === ROLE.teacher ? <TeacherDashboard /> : <StudentDashboard />;

  return (
    <>
      {JSON.stringify(session, null, 2)}
      {renderDashboard}
    </>
  );
};
export { Dashbaord };
