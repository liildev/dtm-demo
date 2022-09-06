import React, { useState, useContext } from "react";
import {
  Box,
  FormControlLabel,
  FormControl,
  TextField,
  Select,
  MenuItem,
  Radio,
  Button,
  InputLabel,
} from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import { api } from "../../API/axios";
import { Link } from "react-router-dom";
import history from "../../utils/history";
import eye from "../../assets/svg/eye.svg";

import "./styles.scss";

export default function Register() {
  let auth = useContext(AuthContext);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [region, setRegion] = useState("");

  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [gender, setGender] = useState("");

  const handlePasswordChange = (evnt) => {
    setPassword(evnt.target.value);
  };

  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api().post("users/registration", {
        fullName,
        emailOrPhone,
        userName: username,
        password: password,
        region,
        gender,
      });

      if (data) {
        auth.login(data.token, data.userId);
        history.push("/");
      }
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  return (
    <div className="register">
      <Box component="form" noValidate className="register__block">
        <h2>Royhatdan otish</h2>

        <TextField
          variant="standard"
          type="text"
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <TextField
          variant="standard"
          type="text"
          placeholder="Email or phone"
          value={emailOrPhone}
          onChange={(e) => setEmailOrPhone(e.target.value)}
        />

        <TextField
          variant="standard"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <FormControl fullWidth sx={{ mt: 2 }} variant="standard">
          <InputLabel id="demo-simple-select-standard-label">Region</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            label="Region"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
          >
            <MenuItem value="Toshkent">Toshkent</MenuItem>
            <MenuItem value="Sirdaryo">Sirdaryo</MenuItem>
            <MenuItem value="Jizzax">Jizzax</MenuItem>
            <MenuItem value="Andijon">Andijon</MenuItem>
            <MenuItem value="Fargona">Fargona</MenuItem>
            <MenuItem value="Namangan">Namangan</MenuItem>
            <MenuItem value="Surxandaryo">Surxandaryo</MenuItem>
            <MenuItem value="Buxoro">Buxoro</MenuItem>
            <MenuItem value="Navoiy">Navoiy</MenuItem>
            <MenuItem value="Xorazm">Xorazm</MenuItem>
            <MenuItem value="Qashqadaryo">Qashqadaryo</MenuItem>
            <MenuItem value="Qoraqalpogiston">Qoraqalpogiston</MenuItem>
          </Select>
        </FormControl>

        <TextField
          variant="standard"
          type={passwordType}
          onChange={handlePasswordChange}
          value={password}
          placeholder="Password"
        />

        <img className="eye" src={eye} alt="Eye" onClick={togglePassword} />

        <div>
          <FormControlLabel
            control={<Radio />}
            value="Male"
            label="Male"
            onChange={(e) => setGender(e.target.value)}
          />
          <FormControlLabel
            className="ml-4"
            control={<Radio />}
            value="Female"
            label="Female"
            onChange={(e) => setGender(e.target.value)}
          />
        </div>

        <Button onClick={handleClick} variant="outlined">
          Royhatdan otish
        </Button>

        <p>
          Hisobingiz bormi? <Link to="/login">Kirish</Link>
        </p>
      </Box>
    </div>
  );
}
