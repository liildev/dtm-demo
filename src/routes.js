import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "./screens/Register";
import Login from "./screens/Login";
import Exam from "./screens/Block";
import Test from "./screens/Test";
import Result from "./screens/Result";
import Profile from "./screens/Profile";
import AllResults from "./screens/AllResults";

export const useRoutes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Routes>
        <Route path="/" element={<Exam />} index />
        <Route path="block" element={<Exam />} />
        <Route path="test" element={<Test />} />
        <Route path="result/:resultId" element={<Result />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/all-results" element={<AllResults />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Register />} index />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Register />} index />
    </Routes>
  );
};
