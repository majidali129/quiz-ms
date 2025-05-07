export const isCourseOwner = (createdById: string, userId: string) => {
  if (!createdById || !userId) return false;
  return createdById === userId;
};
