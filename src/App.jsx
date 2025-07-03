import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./config/AuthContext.jsx";
import Mainlayout from "./layout/Mainlayout.jsx";
import Dashboard from "./layout/Dashboard.jsx";
import Login from "./Login.jsx";

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Mainlayout />}>
        <Route index element={token ? <Dashboard /> : <Navigate to="/login" />} />
        <Route
          path="login"
          element={token ? <Navigate to="/" /> : <Login />}
        />
      </Route>
    </Routes>
  );
}

export default App;
