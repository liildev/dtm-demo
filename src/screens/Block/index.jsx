import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Back from "../../components/Back";
import { api, host } from "../../API/axios";
import { Button } from "@mui/material";
import SelectItem from "../../components/Select";
import GroupSelect from "../../components/GroupSelect";

import "./styles.scss";

export default function Block() {
  const navigate = useNavigate();
  const [firstSubjects, setFirstSubjects] = useState();
  const [firstSubjectId, setFirstSubjectId] = useState("");
  const [secondSubjects, setSecondSubjects] = useState();
  const [secondSubjectId, setSecondSubjectId] = useState("");
  const [universityId, setUniversityId] = useState("");
  const [universities, setUniversities] = useState();
  const [faculty, setFaculty] = useState();

  useEffect(() => {
    api()
      .get("subjects")
      .then(({ data }) => {
        setFirstSubjects(data);
      });
  }, []);

  useEffect(() => {
    api()
      .get(`subjects/${firstSubjectId}`)
      .then(({ data }) => {
        setSecondSubjects(data);
      });
  }, [firstSubjectId]);

  useEffect(() => {
    api()
      .get(`universities?first=${firstSubjectId}&second=${secondSubjectId}`)
      .then(({ data }) => {
        setUniversities(data);
      });
  }, [firstSubjectId, secondSubjectId]);

  useEffect(() => {
    api()
      .get(`universities/${universityId}`)
      .then(({ data }) => {
        setFaculty(data?.data);
      });
  }, [universityId]);

  const handleClick = () => {
    host()
      .post("users/info", {
        first_subject_id: firstSubjectId,
        second_subject_id: secondSubjectId,
        faculty_id: faculty.faculty_id,
      })
      .then(({ data }) => {
        if (data?.data) {
          localStorage.setItem("userInfo", JSON.stringify(data.data.ui_id));
          navigate("/test");
        }
      });
  };

  return (
    <div className="block">
      <Back />
      <h2>Assosiy Imtihonga hush kelibsiz</h2>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="subjects">
          <SelectItem
            title="Birinchi fan"
            label="Blok 1"
            value={firstSubjectId}
            setValue={setFirstSubjectId}
            data={firstSubjects}
          />
          <SelectItem
            title="Ikkinchi fan"
            label="Blok 2"
            value={secondSubjectId}
            setValue={setSecondSubjectId}
            data={secondSubjects}
          />

          <GroupSelect
            title="OTM nomi"
            setValue={setUniversityId}
            value={universityId}
            label="OTM"
            data={universities}
          />
        </div>

        {faculty && (
          <div className="university">
            <h3>{faculty.university}</h3>
            <ul>
              <li>
                {faculty.grand_place ? <p>Grant</p> : ""}
                <span>{faculty.grand_place}</span>
                <span>{faculty.grand_score}</span>
              </li>
              <li>
                {faculty.contract_place ? <p>Sharnoma</p> : ""}
                <span>{faculty.contract_place}</span>
                <span>{faculty.contract_score}</span>
              </li>
            </ul>
          </div>
        )}
      </div>

      <Button
        style={{ display: "block", marginTop: 50, marginBottom: 50 }}
        variant="contained"
        className="btn"
        disabled={universityId ? false : true}
        onClick={handleClick}
      >
        Testni boshlash
      </Button>
    </div>
  );
}
