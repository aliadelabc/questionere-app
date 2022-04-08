import React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const Check = ({ label, value, handleChange }) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <FormControlLabel
      control={<Checkbox onChange={() => handleChange(value)} />}
      label={capitalize(label)}
      defaultChecked={false}
    />
  );
};

export default Check;
