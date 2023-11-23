import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Onboarding from "./pages/Onboarding";
import UserProfile from "./pages/UserProfile";
function App() {
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/onboarding">Onboarding</Link>
            </li>
            <li>
              <Link to="/user-profile">Profile</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
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
