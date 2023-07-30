import { unparse } from "papaparse";
import { FoodType } from "@/components/Table";

interface downloadProps {}

export function downloadCSV(data: FoodType[]) {
  const csv = unparse(data);
  const csvData = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(csvData);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "export.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
