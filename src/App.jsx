import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminHomePage from "./components/AdminHomePage";
import MechanicLogin from "./components/MechanicLogin";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import MechanicSignup from "./components/MechanicSignup";
// import MechanicHomePage from './components/MechanicHomePage';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <AdminLogin />
                <UserLogin />
                <MechanicLogin />
              </>
            }
          />
          <Route path="/admin_register" element={<AdminSignup />} />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/user_register" element={<UserSignup />} />
          <Route path="/mechanic_register" element={<MechanicSignup />} />
          {/* <Route path="/mechanichomepage" element={<MechanicHomePage />} /> */}
          <Route
            path="/home"
            element={
              <>
                <Home />
                <Footer />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
