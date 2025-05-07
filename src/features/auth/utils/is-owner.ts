type Entity = {
  id: string;
};

export const isOwner = (id: string, entity: Entity) => {
  return id === entity.id;
};
