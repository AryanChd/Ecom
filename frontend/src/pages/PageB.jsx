import React from "react";
import { UseMyContext } from "../context/MyContext";
import { PageC } from "./PageC"; // ✅ Import PageC with correct case

export const PageB = () => {
  const { name, age } = UseMyContext();

  return (
    <div>
      PageB
      <div>{name}</div>
      <div>{age}</div>
      {/* ✅ Use PageC with correct case */}
      <PageC />
    </div>
  );
};
