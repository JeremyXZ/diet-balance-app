"use client";

import FoodTable from "@/components/Table";
import { useEffect, useState } from "react";
import RatioChart from "@/components/Chart";
import { FoodType } from "@/components/Table";

export interface UpdateRatiosFn {
  (newOmega6: number, newOmega3: number): void;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const [omega6, setOmega6] = useState(0);
  const [omega3, setOmega3] = useState(0);

  const fetchFoods = async () => {
    const response = await fetch("api/foods");
    const data = await response.json();
    console.log("data", data);
    setFoods(data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const updateRatios: UpdateRatiosFn = (newOmega6, newOmega3) => {
    setOmega6(newOmega6);
    setOmega3(newOmega3);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;
  console.log(foods);
  return (
    <div>
      <RatioChart omega6={omega6} omega3={omega3} />
      <h3>
        Please enter the weight of the food in Weight column. The actual amount
        of Omega 3 and Omega6 and the aggregate ratio (healthy ratio in green,
        unhealthy ratio in red) will be shown on the same row to the right. The
        running aggregate ratio will be shown in the ratio bar on top of this
        page.
      </h3>
      <FoodTable
        foods={foods}
        setFoods={setFoods}
        updateRatios={updateRatios}
      />
    </div>
  );
}
