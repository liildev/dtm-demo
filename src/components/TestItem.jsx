import React from "react";
import { Divider, FormControlLabel, Radio, RadioGroup } from "@mui/material";

const TestItem = ({ data, setAnswers, answers }) => {
  const handleChange = (evt) => {
    const obj = {
      test_id: data.test_id,
      answer_id: evt.target.value,
    };
    
    const findAnswer = answers.find((answer) => answer.test_id === data.test_id);
    if (findAnswer) {
      findAnswer.answer_id = evt.target.value;
      setAnswers([...answers]);
    } else {
      setAnswers((prev) => [...prev, obj]);
    }
  };
  return (
    <li className="test-item">
      <h4>{data.title}</h4>
      <p>{data.description}</p>

      <RadioGroup
        style={{ marginBottom: 35 }}
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
        onChange={handleChange}
      >
        {data.answers &&
          data.answers.map((answer) => (
            <FormControlLabel
              key={answer.answer_id}
              value={answer.answer_id}
              control={<Radio />}
              label={answer.answer}
            />
          ))}
      </RadioGroup>
      <Divider />
    </li>
  );
};

export default TestItem;
