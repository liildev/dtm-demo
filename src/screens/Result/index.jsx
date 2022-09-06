import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../API/axios";
import Progress from "../../components/Progress";
import { Button } from "@mui/material";

import "./styles.scss";

const Result = () => {
  const navigate = useNavigate();
  const { resultId } = useParams();
  const [result, setResult] = useState();


  useEffect(() => {
    api()
      .get("results/" + resultId)
      .then(({ data }) => {
        if (data?.data) {
          setResult(data.data[0]);
        }
      });
  }, [resultId]);

  return (
    <div className="result">
      <div className="container">
        <h2 className="result__title">Asosiy</h2>
        <div className="result__progress">
          <div className="result__progress-tab">
            <h3>{result?.first_subject}</h3>
            <div style={{ width: 653 }}>
              <Progress
                value={result?.first_subject_true_answers * 10}
                color="primary"
              />
            </div>
            <span>{result?.first_subject_true_answers}/10</span>
          </div>
          <div className="result__progress-tab">
            <h3>{result?.second_subject}</h3>
            <div style={{ width: 653 }}>
              <Progress
                value={result?.second_subject_true_answers * 10}
                color="secondary"
              />
            </div>
            <span>{result?.second_subject_true_answers}/10</span>
          </div>
        </div>
        <h3 className="result__res-title">Natija</h3>
        <ul className="result__res-list">
          <li>Ta'lim muassasi: {result?.university}</li>
          <li>Yo`nalish: {result?.faculty}</li>
          <li>Ta'lim turi: {result?.result}</li>
        </ul>

        <div style={{ display: "flex", gap: 30 }}>
          <Button variant="contained" onClick={() => navigate("/profile")}>
            Profil
          </Button>
          <Button variant="contained" onClick={() => navigate("/all-results")}>
            Natijalar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
