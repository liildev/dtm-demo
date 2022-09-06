import React from "react";
import { AuthContext } from "./context/auth.context.js";
import { useRoutes } from "./routes";
import { useAuth } from "./hooks/auth.hook";

import "./scss/base.scss";

export default function App() {
  const { login, logout, token, userId } = useAuth();

  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);


  return (
    <AuthContext.Provider value={{ login, logout, token, userId }}>
      <div className="app container">{routes}</div>
    </AuthContext.Provider>
  );
}
