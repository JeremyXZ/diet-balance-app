"use client";

import FoodTable from "@/components/Table";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [foods, setFoods] = useState([]);

  const fetchFoods = async () => {
    const response = await fetch("api/foods");
    const data = await response.json();
    console.log("data", data);
    setFoods(data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  console.log(foods);
  return (
    <div>
      <h1>
        Please enter the weight of the food in the first column. The actual
        amount of Omega 3 and 6 and their ratio will be shown on the same row to
        the right. The combined ratio will be shown in the ratio bar above
      </h1>
      <FoodTable foods={foods} setFoods={setFoods} />
    </div>
  );
}
