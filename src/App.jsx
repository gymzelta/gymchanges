import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Members from "./pages/members";
import GymAttendance from "./pages/Attendance";
import Login from "./home";
import ReceptionistPage from "./pages/Receptionist";
import AttendancePage from "./pages/AllAttendance";
import AllMembers from "./pages/AllMembers";
import "./App.css"; // Link to external styles

const App = () => {
  return (
    <Router>
      {/* Navbar Added */}
      <nav className="navbar">
        <div className="nav-logo">🏋️‍♂️ GymPro</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/add-members">Members</Link>
          <Link to="/attendance">Attendance</Link>
          <Link to="/AllMembersAttendance">All Members Attendance</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/allmembers" element={<AllMembers />} />
        <Route path="/AllMembersAttendance" element={<AttendancePage />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/ReceptionistPage" element={<ReceptionistPage />} />
        <Route path="/" element={<ReceptionistPage />} />
        <Route path="/add-members" element={<Members />} />
        <Route path="/attendance" element={<GymAttendance />} />
      </Routes>
    </Router>
  );
};

export default App;
