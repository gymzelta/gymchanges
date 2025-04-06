import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/ReceptionistPage.css"; // Import the enhanced CSS

const ReceptionistPage = () => {
  const navigate = useNavigate();

  return (
    <>
    

      {/* Receptionist Panel UI */}
      <div className="receptionist-container">
        <div className="glass-box">
          <h1 className="title">Receptionist Panel</h1>
          <div className="button-grid">
            <button onClick={() => navigate("/add-members")}>Add Member</button>

            <button onClick={() => navigate("/attendance")}>Attendance</button>
            <button onClick={() => navigate("/AllMembers")}>View Member Details</button>
            <button onClick={() => navigate("/AllMembersAttendance")}>All members Attendance</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReceptionistPage;
