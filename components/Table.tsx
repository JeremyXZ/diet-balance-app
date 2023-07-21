"use client";
import { useEffect, useState } from "react";
import { getFoods } from "@/utils";
import DataTable from "react-data-table-component";

export default function Table() {
  const [mounted, setMounted] = useState(false);
  const [foods, setFoods] = useState([]);
  const [weight, setWeight] = useState("");

  //to ensure hygration takes place after page is loaded
  useEffect(() => {
    setMounted(true);
  }, []);

  const fetchFoods = async () => {
    const response = await fetch("api/foods");
    const data = await response.json();
    console.log(data);
    setFoods(data);
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleWeightChange = (foodId, newWeight) => {
    const updatedData = foods.map((item) => {
      if (item.food_id === foodId) {
        const foodWeight = parseFloat(newWeight);
        const omega6Intake = foodWeight * item.Omega6_mg_;
        const omega3Intake = foodWeight * item.Omega3_mg_;

        return {
          ...item,
          food_weight: newWeight,
          omega6_intake: isNaN(omega6Intake) ? "" : omega6Intake.toFixed(2),
          omega3_intake: isNaN(omega3Intake) ? "" : omega3Intake.toFixed(2),
          overall_ratio:
            omega6Intake && omega3Intake
              ? `${(
                  Math.max(omega6Intake, omega3Intake) /
                  Math.min(omega6Intake, omega3Intake)
                ).toFixed(2)} : 1`
              : "",
        };
      } else {
        return item;
      }
    });
    setFoods(updatedData);
  };

  const columns = [
    {
      name: "Weight(g)",
      selector: (row) => row.Weight_g_,
      sortable: true,
      editable: true,
      cell: (row) => (
        <input
          type="number"
          value={weight || ""}
          onChange={(e) => setWeight(e.target.value)}
          onBlur={(e) => handleWeightChange(row.food_id, e.target.value)}
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
      selector: (row) => row.O6_intake_mg_,
      sortable: true,
    },
    {
      name: "O3_intake (mg)",
      selector: (row) => row.O3_intake_mg_,
      sortable: true,
    },
    {
      name: "Overall_ratio",
      selector: (row) => row.Overall_ratio,
      sortable: true,
    },
  ];

  const data = [
    {
      id: 1,
      title: "Beetlejuice",
      year: "1988",
    },
    {
      id: 2,
      title: "Ghostbusters",
      year: "1984",
    },
  ];

  if (!mounted) return <></>;

  return (
    <DataTable
      title="Food Table"
      columns={columns}
      data={foods}
      defaultSortAsc
      defaultSortField="Food_100g"
    />
  );
}
