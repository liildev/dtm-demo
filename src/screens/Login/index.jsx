import React, { useState, useContext } from "react";
import { Button, Box, TextField } from "@mui/material";
import { AuthContext } from "../../context/auth.context";
import { Link } from "react-router-dom";
import { api } from "../../API/axios";
import history from "../../utils/history";
import eye from "../../assets/svg/eye.svg";

import "./styles.scss";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  let auth = useContext(AuthContext);

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
      const { data } = await api().post("users/login", {
        userName: username,
        password: password,
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
    <div className="login">
      <Box component="form" noValidate className="login__block">
        <h2>Tizimga kirish</h2>
        <TextField
          type="text"
          placeholder="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          type={passwordType}
          onChange={handlePasswordChange}
          variant="standard"
          value={password}
          placeholder="Password"
        />
        <img className="eye" src={eye} alt="Eye" onClick={togglePassword} />
        <Button onClick={handleClick} variant="outlined">
          Kirish
        </Button>
        <p className="mt-3">
          Hisobingiz yoqmi? <Link to="/">Royxatdan otish</Link>
        </p>
      </Box>
    </div>
  );
};

export default Login;
