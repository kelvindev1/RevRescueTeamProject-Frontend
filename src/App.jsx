import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserHomePage from "./components/UserHomePage";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminPasswordRecovery from "./components/AdminPasswordRecovery";
import AdminPasswordReset from "./components/AdminPasswordReset";
import AdminHomePage from "./components/AdminHomePage";
import MechanicLogin from "./components/MechanicLogin";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import MechanicSignup from "./components/MechanicSignup";
import AdminManager from "./components/AdminManager";
import UsersList from "./components/UsersList";
import MechanicsList from "./components/MechanicsList";
import MechanicHomePage from "./components/MechanicHomePage";
import MechanicReviewsReceived from "./components/MechanicReviewsReceived";
import Reviews from "./components/Reviews";
import ServiceList from "./components/ServiceList";
import MechanicList from "./components/MechanicList";
import AdminReviewsManager from "./components/AdminReviewsManager";
import Notifications from "./components/Notifications";
import Hero from "./components/Hero";
import Hservice from "./components/Hservice";
import HAbout from "./components/HAbout";
import MechanicsServices from "./components/MechanicsServices";
import UserPasswordRecovery from "./components/UserPasswordRecovery";
import UserPasswordReset from "./components/UserPasswordReset";
import Help from "./components/Help";
import Report from "./components/Report";
import Stats from "./components/Stats";
import HNavbar from "./components/HNavbar";
import MechanicPasswordRecovery from "./components/MechanicPasswordRecovery";
import MechanicPasswordReset from "./components/MechanicPasswordReset";
import About from "./components/About";
import Contact from "./components/Contact";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                {" "}
                <HNavbar />
                <Hero />
                <Hservice />
                <HAbout />
                <Footer />
              </>
            }
          />
          <Route
            path="/home"
            element={
              <>
                {" "}
                <UserHomePage />
                <Footer />{" "}
              </>
            }
          />{" "}
          <Route path="/user_login" element={<UserLogin />} />
          <Route path="/recover-password" element={<UserPasswordRecovery />} />
          <Route
            path="/reset-password/:token"
            element={<UserPasswordReset />}
          />
          <Route path="/admin_register" element={<AdminSignup />} />
          <Route
            path="/user_register"
            element={
              <div className="user_register_style">
                <UserSignup />{" "}
              </div>
            }
          />
          <Route path="/admin_login" element={<AdminLogin />} />
          <Route
            path="/admin/recover-password"
            element={<AdminPasswordRecovery />}
          />
          <Route
            path="/admin/reset-password/:token"
            element={<AdminPasswordReset />}
          />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/adminhomepage/admins" element={<AdminManager />} />
          <Route
            path="/adminhomepage/reviews"
            element={<AdminReviewsManager />}
          />
          <Route path="/adminhomepage/users" element={<UsersList />} />
          <Route path="/adminhomepage/mechanics" element={<MechanicsList />} />
          <Route path="/mechanic_login" element={<MechanicLogin />} />
          <Route
            path="/mechanic_register"
            element={
              <div className="mechanic_register_style">
                <MechanicSignup />
              </div>
            }
          />
          <Route path="/mechanichomepage" element={<MechanicHomePage />} />
          <Route
            path="/mechanic/recover-password"
            element={<MechanicPasswordRecovery />}
          />
          <Route
            path="/mechanic/reset-password/:token"
            element={<MechanicPasswordReset />}
          />
          <Route
            path="/mechanichomepage/reviews"
            element={<MechanicReviewsReceived />}
          />
          <Route path="home/reviews" element={<Reviews />} />
          <Route path="/home/services" element={<ServiceList />} />
          <Route path="/home/mechanics" element={<MechanicList />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route
            path="/mechanichomepage/services"
            element={<MechanicsServices />}
          />
          <Route path="/home/help" element={<Help />} />
          <Route path="/home/report" element={<Report />} />
          <Route path="/home/stats" element={<Stats />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
