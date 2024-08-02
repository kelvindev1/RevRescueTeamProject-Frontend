import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Router>
        <Routes>
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
