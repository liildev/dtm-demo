import React, { useEffect, useState } from "react";
import TestItem from "../../components/TestItem";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@mui/material";
import { host } from "../../API/axios";
import "./styles.scss";

const Test = () => {
  const navigate = useNavigate();
  const [tests, setTests] = useState();
  const [firstSubjectAnswers, setFirstSubjectAnswers] = useState([]);
  const [secondSubjectAnswers, setSecondSubjectAnswers] = useState([]);

  const ui_id = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    host()
      .get("tests")
      .then(({ data }) => {
        setTests(data?.data);
      });
  }, []);
  
  const handleClick = () => {
    host()
      .post("tests", { firstSubjectAnswers, secondSubjectAnswers, ui_id })
      .then(({ data }) => {
        navigate("/result/" + data.data.result_id);
      });
  };

  return (
    <div className="test">
      <div className="container">
        <h2 className="test__title">Tests</h2>
        <ul className="test__list">
          {tests &&
            tests.firstSubjectTests.map((test) => (
              <TestItem
                key={test.test_id}
                data={test}
                setAnswers={setFirstSubjectAnswers}
                answers={firstSubjectAnswers}
              />
            ))}
          <li>
            <Divider color="danger" />
          </li>
          {tests &&
            tests.secondSubjectTests.map((test) => (
              <TestItem
                key={test.test_id}
                data={test}
                setAnswers={setSecondSubjectAnswers}
                answers={secondSubjectAnswers}
              />
            ))}
        </ul>

        <Button
          variant="contained"
          disabled={
            firstSubjectAnswers.length === 10 &&
            secondSubjectAnswers.length ===10
              ? false
              : true
          }
          onClick={handleClick}
        >
          Yakunlash
        </Button>
      </div>
    </div>
  );
};

export default Test;
