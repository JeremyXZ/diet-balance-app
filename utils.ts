import { db } from "./lib/db";

export const getFoods = async () => {
  return db.omega.findMany();
};

export const createFood = async (data) => {
  return db.omega.create({
    data,
  });
};

export const updateFood = async (id, data) => {
  return db.omega.update({
    where: { id },
    data,
  });
};

export const deleteFood = async (id) => {
  return db.omega.delete({
    where: { id },
  });
};
