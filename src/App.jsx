import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import UserHomePage from "./components/UserHomePage";
import Footer from "./components/Footer";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import MechanicLogin from "./components/MechanicLogin";
import UserLogin from "./components/UserLogin";
import UserSignup from "./components/UserSignup";
import MechanicSignup from "./components/MechanicSignup";
import AdminHomePage from "./components/AdminHomePage";
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
import UserSideChat from "./components/UserSideChat";
import MechanicSideChat from "./components/MechanicSideChat";

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
                <AdminLogin /> <UserLogin /> <MechanicLogin />{" "}
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
          />
          <Route path="/admin_register" element={<AdminSignup />} />
          <Route path="/user_register" element={<UserSignup />} />
          <Route path="/mechanic_register" element={<MechanicSignup />} />
          <Route path="/adminhomepage" element={<AdminHomePage />} />
          <Route path="/adminhomepage/admins" element={<AdminManager />} />
          <Route
            path="/adminhomepage/reviews"
            element={<AdminReviewsManager />}
          />
          <Route path="/adminhomepage/users" element={<UsersList />} />
          <Route path="/adminhomepage/mechanics" element={<MechanicsList />} />
          <Route path="/mechanichomepage" element={<MechanicHomePage />} />
          <Route
            path="/mechanichomepage/reviews"
            element={<MechanicReviewsReceived />}
          />
          <Route path="home/reviews" element={<Reviews />} />
          <Route path="/home/services" element={<ServiceList />} />
          <Route path="/home/mechanics" element={<MechanicList />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/home/chat" element={<UserSideChat />} />
          <Route path="/mechanichomepage/chat" element={<MechanicSideChat />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
