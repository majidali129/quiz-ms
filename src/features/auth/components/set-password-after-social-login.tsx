import { setPassword } from "@/actions/set-password";
import { auth } from "@/auth";

const SetPasswordAfterSocialLoginForm = async () => {
  const session = await auth();
  return (
    <div className=" max-w-[380px] w-full bg-gray-800 rounded-md border-gray-900 py-8 px-4 mx-auto space-y-3">
      {/* <RoleSelector selectedRole={session?.user.role} /> */}
      <p className="text-center text-gray-500">Logged In as {session?.user.role}</p>
      <form action={setPassword}>
        <div className="space-y-2">
          <input type="hidden" name="role" value={session?.user.role} />
          <div className="flex flex-col border-gray-700 gap-y-1">
            <label htmlFor="password">Password</label>
            <input autoComplete="off" name="password" type="password" className="bg-gray-900 py-1.5 text-[1rem] focus:ring-0 focus:border-0 focus:outline-0 p-1" />
          </div>
          <div className="flex flex-col border-gray-700 gap-y-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input autoComplete="off" name="confirmPassword" type="password" className="bg-gray-900 py-1.5 text-[1rem] focus:ring-0 focus:border-0 focus:outline-0 p-1" />
          </div>
          <div className="flex justify-end">
            <button className="px-4 py-1.5 bg-gray-950 border border-gray-600 shadow rounded-sm cursor-pointer" type="submit">
              Set Password
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default SetPasswordAfterSocialLoginForm;
