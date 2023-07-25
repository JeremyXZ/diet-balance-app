"use client";

import FoodTable from "@/components/Table";
import { useEffect, useState } from "react";
import RatioChart from "@/components/Chart";
import { FoodType } from "@/components/Table";
import styled from "styled-components";

export interface UpdateRatiosFn {
  (newOmega6: number, newOmega3: number): void;
}

// Styled components
const HomeContainer = styled.div`
  width: 80%;
  margin: 0 auto;
`;

// const TableContainer = styled.div`
//   @media (max-width: 1350px) {
//     .rdt_TableCol[data-tag="O6_intake (mg)"] {
//       display: none;
//     }
//   }
// `;

const TextContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  font-family: sans-serif;
  text-align: left;
  color: #000080;
  margin: 25px 0;

  p {
    /* width: 90%; */
    font-size: 1.125rem;
    text-align: left;
  }
`;
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
    <HomeContainer>
      <RatioChart omega6={omega6} omega3={omega3} />
      <TextContainer>
        <h2>Instruction:</h2>
        <p>
          Please type the weight (in grams) in the first column and press Enter.
          You will see the results immediately on the same row. A recommended
          Omega-6:Omega-3 ratio is 4: 1. A red number indicates an unhealthy
          ratio and a green number means a healthy one. The doughnut chart shows
          the relative portions of Omega-6 and Omega-3. Click the Toggle button
          to hide and show intakes columns and click table headers to sort a
          column.
        </p>
      </TextContainer>

      <FoodTable
        foods={foods}
        setFoods={setFoods}
        updateRatios={updateRatios}
      />
    </HomeContainer>
  );
}
