"use server";

import { sampleQuizzes } from "@/data/quiz";
import { Quiz } from "@/models/quiz-model";
import { connectDB } from "./connect-db";

export const seedToDB = async () => {
  await connectDB();
  try {
    await Quiz.deleteMany({});
    const result = await Quiz.insertMany(sampleQuizzes);
    console.log(`${result.length} quizzes inserted successfully!`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding to DB", error);
    process.exit(1);
  }
};

seedToDB();
