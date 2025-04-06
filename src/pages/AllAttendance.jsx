import { useState, useEffect } from "react";
import axios from "axios";

const AttendanceHistory = () => {
    const [attendance, setAttendance] = useState([]);
    const [selectedDate, setSelectedDate] = useState(() => {
        const today = new Date();
        return today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    });

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await axios.get("https://gym-crm-backend.onrender.com/api/attendance/search", {
                    params: { date: selectedDate }
                });
                setAttendance(response.data);
            } catch (error) {
                console.error("Error fetching attendance:", error);
            }
        };

        fetchAttendance();
    }, [selectedDate]);

    return (
        <div style={{
            minHeight: "100vh",
            backgroundImage: "url('/path-to-your-image.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            padding: "40px 20px",
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
        }}>
            <div style={{
                background: "rgba(0, 0, 0, 0.7)",
                padding: "20px",
                borderRadius: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                width: "100%",
                maxWidth: "800px",
            }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#ffcc00",
                    marginBottom: "20px",
                    textAlign: "center"
                }}>Attendance for {selectedDate}</h2>

                <div style={{ marginBottom: "20px", textAlign: "center" }}>
                    <label htmlFor="date" style={{ marginRight: "10px" }}>Select Date:</label>
                    <input
                        type="date"
                        id="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{
                            padding: "8px",
                            borderRadius: "4px",
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                <table style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    color: "#fff",
                }}>
                    <thead>
                        <tr style={{ background: "#ffcc00", color: "#000" }}>
                            <th style={{ padding: "10px", textAlign: "left" }}>Gym - Id</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>Check-In</th>
                            <th style={{ padding: "10px", textAlign: "left" }}>Check-Out</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.length > 0 ? (
                            attendance.map((record, index) => (
                                <tr key={index} style={{
                                    background: index % 2 === 0 ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                                }}>
                                    <td style={{ padding: "10px" }}>{record.gymId}</td>
                                    <td style={{ padding: "10px" }}>{new Date(record.checkIn).toLocaleString()}</td>
                                    <td style={{ padding: "10px", color: record.checkOut ? "#0f0" : "#ff0000" }}>
                                        {record.checkOut ? new Date(record.checkOut).toLocaleString() : "Not Checked Out"}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="3" style={{ padding: "10px", textAlign: "center" }}>No records found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AttendanceHistory;
