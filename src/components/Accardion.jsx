import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { FiChevronDown } from "react-icons/fi";
import dayjs from "dayjs";

const Accardion = ({
  index,
  created_at,
  result_score,
  university,
  faculty,
  first_subject_true_answers,
  second_subject_true_answers,
  result,
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<FiChevronDown />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography width="95%">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>Test #{index}</span>
            <span>{dayjs(created_at).format("DD/MM/YYYY")}</span>
            <span>{result_score}/189</span>
          </div>
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ul>
            <li>Ta'lim muassasi: {university}</li>
            <li>Fakultet: {faculty}</li>
            <li>Blok #1: {first_subject_true_answers}/10</li>
            <li>Blok #2: {second_subject_true_answers}/10</li>
            <li>Holat: {result}</li>
          </ul>
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default Accardion;
