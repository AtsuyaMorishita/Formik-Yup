import { createContext, useContext, useState } from "react";

//Contextの作成
const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState("ああああああああああああ");

  return (
    <FormContext.Provider value={[formData, setFormData]}>
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = () => useContext(FormContext);
