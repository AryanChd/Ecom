import React from "react";
import { UseMyContext } from "../context/MyContext";

export const PageC = () => {
  const { name, age } = UseMyContext();

  return (
    <div>
      PageB
      {name}
      {age}
    </div>
  );
};
