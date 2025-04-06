import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Container, Alert, Card } from "react-bootstrap";
import AttendanceTable from "./AttendanceTable";
import "../styles/GymAttendance.css";

const GymAttendance = () => {
  const [gymId, setGymId] = useState("");
  const [attendance, setAttendance] = useState([]);
  const [message, setMessage] = useState("");
  const [memberInfo, setMemberInfo] = useState(null);

  // Fetch attendance records
  useEffect(() => {
    if (gymId) {
      axios
        .get(`https://gym-crm-backend.onrender.com/api/attendance/${gymId}`)
        .then((response) => {
          setAttendance(
            response.data.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn))
          );
          setMessage("");
        })
        .catch(() => setMessage("No user found."));
    }
  }, [gymId]);

  // Handle Check-in
  const handleCheckIn = async () => {
    try {
      const response = await axios.post("https://gym-crm-backend.onrender.com/api/attendance/checkin", { gymId });
      setAttendance([response.data, ...attendance]);
      setMemberInfo({
        name: response.data.memberName,
        expiryDate: response.data.membershipExpiry,
      });

      const expiryDate = new Date(response.data.membershipExpiry);
      const daysLeft = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));

      if (daysLeft <= 7 && daysLeft > 0) {
        setMessage(`⚠️ Membership expires in ${daysLeft} days! Please renew soon.`);
      } else if (daysLeft <= 0) {
        setMessage("❌ Membership expired! Please renew before checking in again.");
        return;
      } else {
        setMessage("✅ Checked in successfully!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error checking in.");
    }
  };

  // Handle Check-out
  const handleCheckOut = async (attendanceId) => {
    try {
      const response = await axios.post("https://gym-crm-backend.onrender.com/api/attendance/checkout", { gymId });
      setAttendance(
        attendance.map((att) =>
          att._id === attendanceId ? { ...att, checkOut: response.data.checkOut } : att
        )
      );
      setMessage("✅ Checked out successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Error checking out.");
    }
  };

  return (
    <Container className="attendance-container">
      <Card className="attendance-card">
        <h2 className="title">🏋️ Gym Attendance System</h2>

        {message && <Alert variant="info" className="alert-box">{message}</Alert>}

        <Form className="input-form">
          <Form.Group>
            <Form.Label>Enter Gym ID:</Form.Label>
            <Form.Control
              type="number"
              value={gymId}
              onChange={(e) => setGymId(e.target.value)}
              placeholder="Enter your Gym ID"
              min="101"
              className="input-field"
            />
          </Form.Group>
          <Button className="checkin-btn" onClick={handleCheckIn} disabled={!gymId}>
            Check-In
          </Button>
        </Form>
      </Card>

      {memberInfo && (
        <Alert variant="warning" className="member-info">
          🏋️‍♂️ Welcome, {memberInfo.name}!
          <br /> Membership Expiry: {new Date(memberInfo.expiryDate).toLocaleDateString()}
        </Alert>
      )}

      <AttendanceTable attendance={attendance} handleCheckOut={handleCheckOut} />
    </Container>
  );
};

export default GymAttendance;
