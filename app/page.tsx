"use client";

import Table from "@/components/Table";
import { use, useEffect, useState } from "react";
import { getFoods } from "@/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <></>;

  return (
    <div>
      <h1>
        Please enter the weight of the food in the first column. The actual
        amount of Omega 3 and 6 and their ratio will be shown on the same row to
        the right. The combined ratio will be shown in the ratio bar above
      </h1>
      <Table />
    </div>
  );
}
