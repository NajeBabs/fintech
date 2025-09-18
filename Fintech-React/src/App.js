import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import ForgetPassword from "./Pages/ForgetPassword";
import ProfileSettings from "./Pages/ProfileSettings";
import Overview from "./Pages/Overview";
import Balances from "./Pages/Balances";
import Transactions from "./Pages/Transactions";
import Expenses from "./Pages/Expenses";
import Goals from "./Pages/Goals";

const BASE_URL = process.env.REACT_APP_API_URL;

function App() {
  console.log("API Base URL:", BASE_URL);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/profile" element={<ProfileSettings />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/balances" element={<Balances />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
