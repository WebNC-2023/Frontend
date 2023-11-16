import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import HomePage from "./pages/HomePage/HomePage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<Navigate to="/landing-page" />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/home-page" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
