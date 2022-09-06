import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const SelectItem = ({ title, label, setValue, value, data }) => {
  const handleSecondSubjectChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <h3>{title}</h3>
      <FormControl
        sx={{ maxWidth: "550px" }}
        disabled={data ? false : true}
        required
      >
        <InputLabel id="label">{label}</InputLabel>
        <Select
          labelId="label"
          id="demo-simple-select-helper"
          value={value}
          label={label}
          onChange={handleSecondSubjectChange}
        >
          {data &&
            data?.data.map((item) => (
              <MenuItem key={item.subject_id} value={item.subject_id}>
                {item.subject}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectItem;
