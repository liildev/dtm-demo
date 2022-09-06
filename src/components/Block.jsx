import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api, host } from "../API/axios";

import { Button } from "@mui/material";
import SelectItem from "./Select";
import GroupSelect from "./GroupSelect";

export default function Subjects() {
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
      .post("user/info", {
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

      <div className="university">
        <div className="university__body">
          <div className="university__selection">
            <GroupSelect
              title="OTM nomi"
              setValue={setUniversityId}
              value={universityId}
              label="OTM"
              width={540}
              data={universities}
            />
          </div>
        </div>
      </div>

      <Button
        style={{ display: "block", marginTop: 50 }}
        variant="contained"
        disabled={universityId ? false : true}
        onClick={handleClick}
      >
        Testni boshlash
      </Button>
    </div>
  );
}
