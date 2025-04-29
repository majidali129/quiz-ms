import { getQuizzes } from "@/features/queries/get-quizzes";
import { Quiz } from "../types";
import { ListHeader } from "./list-header";
import { QuizCard } from "./quiz-card";

// type QuizListProps = {
//   quizzes: Quiz[];
// };

const QuizList = async () => {
  const quizzes = (await getQuizzes()) as Quiz[];
  return (
    <div className="p-4 space-y-5 py-5">
      <ListHeader heading="Quizzes" dialogTitle="Create New Quiz" dialogDescription="Create a new quiz for your students" dialogTriggerText="Create Quiz" />
      <ul className="grid grid-cols-3 lg:gap-x-3.5 gap-y-3">{quizzes.length && quizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)}</ul>
    </div>
  );
};
export default QuizList;
