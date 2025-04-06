import React from "react";
import { Table, Button } from "react-bootstrap";
import "../styles/GymAttendance.css";

const AttendanceTable = ({ attendance, handleCheckOut }) => {
  return (
    <div className="table-container">
      <h3 className="title">📊 Attendance History</h3>
      <Table striped bordered hover responsive className="custom-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {attendance.length > 0 ? (
            attendance.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{new Date(record.checkIn).toLocaleString()}</td>
                <td>{record.checkOut ? new Date(record.checkOut).toLocaleString() : "Not Checked Out"}</td>
                <td>
                  {!record.checkOut && (
                    <Button className="checkout-btn" onClick={() => handleCheckOut(record._id)}>
                      Check-Out
                    </Button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="no-records">No records found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default AttendanceTable;
