import React from "react";
import { useFormContext } from "../context/FormikContext";

const FormConfirm = () => {
  const [formData, setFormData] = useFormContext();
  console.log(formData);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default FormConfirm;
