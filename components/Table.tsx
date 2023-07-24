"use client";
import { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { UpdateRatiosFn } from "@/app/page";

export interface FoodType {
  food_weight: string;
  Food_100g: string;
  Omega6_mg_: number;
  Omega3_mg_: number;
  O6_O3_ratio: string;
  O6_intake_mg_: number | string;
  O3_intake_mg_: number | string;
  Overall_ratio: string;
  food_id: number;
}

interface TableProps {
  foods: FoodType[];
  setFoods: React.Dispatch<React.SetStateAction<FoodType[]>>;
  updateRatios: UpdateRatiosFn;
}

//in order to comform to TableColumn interface (built in react-data-table), whose property "cell" won't allow JSX element
const RatioCell: React.FC<{ row: FoodType }> = ({ row }) => {
  let ratio = parseFloat(row.Overall_ratio);
  return (
    <span style={{ color: ratio > 4 ? "red" : "green" }}>
      {row.Overall_ratio}
    </span>
  );
};

// createTheme creates a new theme named solarized that overrides the build in dark theme
createTheme(
  "solarized",
  {
    text: {
      primary: "#268bd2",
      secondary: "#2aa198",
    },
    background: {
      default: "#002b36",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

export default function FoodTable({
  foods,
  setFoods,
  updateRatios,
}: TableProps) {
  const [weights, setWeights] = useState<Record<number, string>>({});
  const [totalOmega6, setTotalOmega6] = useState(0);
  const [totalOmega3, setTotalOmega3] = useState(0);

  const handleWeightChange = (foodId: number, newWeight: string) => {
    setWeights((prevWeights) => ({
      ...prevWeights,
      [foodId]: newWeight,
    }));
  };

  const handleEnterKey = (foodId: number, weight: string) => {
    const updatedData: FoodType[] = foods.map((item) => {
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
          // Overall_ratio: (
          //   <span style={{ color: ratio > 4 ? "red" : "#0f9015" }}>
          //     {overallRatio}
          //   </span>
          // ),
          Overall_ratio: overallRatio,
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
      selector: (row: FoodType) => row.food_weight,
      sortable: true,
      editable: true,
      width: "200px",
      cell: (row: FoodType) => (
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
      selector: (row: FoodType) => row.Food_100g,
      sortable: true,
      width: "200px",
    },
    {
      name: "Omega6 (mg)",
      selector: (row: FoodType) => row.Omega6_mg_,
      sortable: true,
    },

    {
      name: "Omega3 (mg)",
      selector: (row: FoodType) => row.Omega3_mg_,
      sortable: true,
    },
    {
      name: "O6/O3_ratio",
      selector: (row: FoodType) => row.O6_O3_ratio,
      sortable: true,
    },
    {
      name: "O6_intake (mg)",
      selector: (row: FoodType) => row.O6_intake_mg_ || "",
      sortable: true,
    },
    {
      name: "O3_intake (mg)",
      selector: (row: FoodType) => row.O3_intake_mg_ || "",
      sortable: true,
    },
    {
      name: "Overall_ratio",
      selector: (row: FoodType) => row.Overall_ratio || "",
      sortable: true,
      cell: (row: FoodType) => <RatioCell row={row} />,
    },
  ];

  return (
    <DataTable
      title="Food Table"
      columns={columns}
      data={foods}
      defaultSortAsc
      defaultSortFieldId="Food_100g"
      theme="solarized"
    />
  );
}
