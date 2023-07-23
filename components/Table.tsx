"use client";
import { useState } from "react";

import DataTable from "react-data-table-component";

export default function FoodTable({ foods, setFoods, updateRatios }) {
  const [weights, setWeights] = useState({});
  const [totalOmega6, setTotalOmega6] = useState(0);
  const [totalOmega3, setTotalOmega3] = useState(0);

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

        //calcuate the new total for both omega6 and omega3 intakes each time a new weight is input
        let newOmega6Intake = totalOmega6 + omega6Intake;
        let newOmega3Intake = totalOmega3 + omega3Intake;
        setTotalOmega6(newOmega6Intake);
        setTotalOmega3(newOmega3Intake);

        const maxIntake = Math.max(newOmega6Intake, newOmega3Intake);
        const minIntake = Math.min(newOmega6Intake, newOmega3Intake);
        const ratio = Math.round(maxIntake / minIntake);

        // maintain the ratio string in this format: omega6 : omega3
        const overallRatio =
          newOmega6Intake > newOmega3Intake ? `${ratio} : 1` : `1 : ${ratio}`;

        console.log(`Overall Ratio for food ID ${foodId}: ${overallRatio}`);

        return {
          ...item,
          food_weight: weight,
          O6_intake_mg_: isNaN(omega6Intake) ? "" : omega6Intake,
          O3_intake_mg_: isNaN(omega3Intake) ? "" : omega3Intake,
          Overall_ratio: (
            <span style={{ color: ratio > 4 ? "red" : "#0f9015" }}>
              {overallRatio}
            </span>
          ),
        };
      } else {
        return item;
      }
    });
    setFoods(updatedData);
    updateRatios(totalOmega6, totalOmega3);
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
