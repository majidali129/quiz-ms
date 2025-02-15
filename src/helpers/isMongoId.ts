import mongoose from "mongoose";

export const isMongoId = (id: string) => {
  return mongoose.Types.ObjectId.isValid(id);
};
