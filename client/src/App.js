import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import UserProfile from "./pages/UserProfile";
import MatchPage from "./pages/MatchPage";
import SignupPage from "./pages/Signup";
function App() {
  return (
    <div className="App">
      <Router>
        

        <Routes>
        <Route path="/matchpage" element={<MatchPage />} />
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignupPage/>} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/user-profile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

function Home() {
  return <h2>Home</h2>;
}

export default App;
