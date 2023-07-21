import { getFoods } from "@/utils";

export const GET = async (request: Request) => {
  try {
    const foods = await getFoods();

    return new Response(JSON.stringify(foods), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all foods", { status: 500 });
  }
};
