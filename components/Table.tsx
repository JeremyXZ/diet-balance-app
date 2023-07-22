"use client";
import { useState } from "react";

import DataTable from "react-data-table-component";

export default function FoodTable({ foods, setFoods }) {
  const [weights, setWeights] = useState({});

  const handleWeightChange = (foodId, newWeight) => {
    setWeights((prevWeights) => ({
      ...prevWeights,
      [foodId]: newWeight,
    }));
  };

  const handleEnterKey = (foodId, weight) => {
    const updatedData = foods.map((item) => {
      if (item.food_id === foodId) {
        const foodWeight = parseFloat(weight);
        const omega6Intake = foodWeight * item.Omega6_mg_;
        const omega3Intake = foodWeight * item.Omega3_mg_;

        console.log(`Omega6 Intake for food ID ${foodId}: ${omega6Intake}`);
        console.log(`Omega3 Intake for food ID ${foodId}: ${omega3Intake}`);

        const overallRatio =
          omega6Intake && omega3Intake
            ? `${(
                Math.max(omega6Intake, omega3Intake) /
                Math.min(omega6Intake, omega3Intake)
              ).toFixed(2)} : 1`
            : "";

        console.log(`Overall Ratio for food ID ${foodId}: ${overallRatio}`);

        return {
          ...item,
          food_weight: weight,
          O6_intake_mg_: isNaN(omega6Intake) ? "" : omega6Intake.toFixed(2),
          O3_intake_mg_: isNaN(omega3Intake) ? "" : omega3Intake.toFixed(2),
          Overall_ratio: overallRatio,
        };
      } else {
        return item;
      }
    });
    setFoods(updatedData);
  };

  const columns = [
    {
      name: "Weight",
      selector: (row) => row.food_weight,
      sortable: true,
      editable: true,
      cell: (row) => (
        <input
          type="number"
          value={weights[row.food_id] || ""}
          onChange={(e) => handleWeightChange(row.food_id, e.target.value)}
          onKeyDown={(e) => {
            console.log(`Key pressed: ${e.key}`);
            if (e.key === "Enter") {
              handleEnterKey(row.food_id, weights[row.food_id]);
            }
          }}
        />
      ),
    },

    {
      name: "Food/100g",
      selector: (row) => row.Food_100g,
      sortable: true,
      width: "350px",
    },
    {
      name: "Omega6 (mg)",
      selector: (row) => row.Omega6_mg_,
      sortable: true,
    },

    {
      name: "Omega3 (mg)",
      selector: (row) => row.Omega3_mg_,
      sortable: true,
    },
    {
      name: "O6/O3_ratio",
      selector: (row) => row.O6_O3_ratio,
      sortable: true,
    },
    {
      name: "O6_intake (mg)",
      selector: (row) => row.O6_intake_mg_ || "",
      sortable: true,
    },
    {
      name: "O3_intake (mg)",
      selector: (row) => row.O3_intake_mg_ || "",
      sortable: true,
    },
    {
      name: "Overall_ratio",
      selector: (row) => row.Overall_ratio || "",
      sortable: true,
    },
  ];

  return (
    <DataTable
      title="Food Table"
      columns={columns}
      data={foods}
      defaultSortAsc
      defaultSortField="Food_100g"
      // highlightonhover
    />
  );
}