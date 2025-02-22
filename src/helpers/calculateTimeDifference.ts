export const calculateTimeDifference = (t1: string, t2: string) => {
  const quizTime = t1.split(":");
  const current = t2.split(":");
  const quiztimeDate = new Date(
    0,
    0,
    0,
    +quizTime[0],
    +quizTime[1],
    +quizTime[2]
  );
  const currenttimeDate = new Date(
    0,
    0,
    0,
    +current[0],
    +current[1],
    +current[2]
  );
  let diff = quiztimeDate.getTime() - currenttimeDate.getTime();
  let hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  let minutes = Math.floor(diff / 1000 / 60);
  let seconds = Math.floor(diff / 1000);

  return [hours, minutes, seconds];
};

export default calculateTimeDifference;
