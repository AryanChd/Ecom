// src/context/MyContext.jsx
import React, { createContext, useContext } from "react";

const MyContext = createContext();

// ✅ Custom hook to use context
export const UseMyContext = () => useContext(MyContext);

// ✅ Context provider component
const MyContexProvider = ({ children }) => {
  const name = "Aryan";
  const age = 17;
  const email = "hello@example.com";

  return (
    <MyContext.Provider value={{ name, age, email }}>
      {children}
    </MyContext.Provider>
  );
};

export default MyContexProvider;
