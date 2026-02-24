import { createContext, useContext, useState } from "react";

const OpenAccountContext = createContext(null);

export function OpenAccountProvider({ children }) {
  const [formData, setFormData] = useState({
    // Step 1 – Create Account
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2 – Account Type
    accountType: "",
    // Step 3 – Account Details
    phone: "",
    address: "",
    dob: "",
    idType: "",
    // Step 4 – Select Plan
    plan: "",
  });

  const updateData = (fields) =>
    setFormData((prev) => ({ ...prev, ...fields }));

  return (
    <OpenAccountContext.Provider value={{ formData, updateData }}>
      {children}
    </OpenAccountContext.Provider>
  );
}

export function useOpenAccount() {
  return useContext(OpenAccountContext);
}
