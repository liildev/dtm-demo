import React from "react";
import {
  ListSubheader,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
} from "@mui/material";

export default function GroupSelect({
  data,
  title,
  label,
  value,
  setValue,
}) {
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const renderSelectGroup = (universities) => {
    const items = universities.faculties.map((faculty) => {
      return (
        <MenuItem key={faculty.faculty_id} value={faculty.faculty_id}>
          {faculty.faculty}
        </MenuItem>
      );
    });
    return [
      <ListSubheader style={{ fontWeight: "bold", color: "black" }}>
        {universities.university}
      </ListSubheader>,
      items,
    ];
  };

  return (
    <>
      <h3>{title}</h3>
      <FormControl
        sx={{ maxWidth: '550px' }}
        disabled={data ? false : true}
        required
      >
        <InputLabel id="label">{label}</InputLabel>
        <Select
          id="demo-simple-select-helper"
          labelId="label"
          value={value}
          onChange={handleChange}
          defaultValue=""
        >
          {data?.data?.map((u) => renderSelectGroup(u))}
        </Select>
      </FormControl>
    </>
  );
}
