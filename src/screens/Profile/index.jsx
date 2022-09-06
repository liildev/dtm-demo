import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { host } from "../../API/axios";
import { Button } from "@mui/material";
import Accardion from "../../components/Accardion";

import "./styles.scss";

const Profile = () => {
  const [results, setResults] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    host()
      .get("result")
      .then(({ data }) => {
        if (data?.data) {
          setResults(data.data);
        }
      });
  }, []);

  return (
    <div className="profile">
      <div className="container">
        <h2>Profil</h2>

        <div>
          {results &&
            results.map((result, index) => (
              <Accardion
                key={result.result_id}
                created_at={result.created_at}
                index={index + 1}
                result_score={result.result_score}
                university={result.university}
                faculty={result.faculty}
                first_subject_true_answers={result.first_subject_true_answers}
                second_subject_true_answers={result.second_subject_true_answers}
                result={result.result}
              />
            ))}
        </div>
        <Button
          style={{ marginTop: 50 }}
          variant="contained"
          onClick={() => navigate("/")}
        >
          Test topshirish
        </Button>
      </div>
    </div>
  );
};

export default Profile;
