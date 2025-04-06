import React, { useEffect, useState } from "react";
import { getMembers, deleteMember } from "../api";
import { Table, Button, Container, Card } from "react-bootstrap";

const MemberInfo = () => {
  const [latestMember, setLatestMember] = useState(null);

  useEffect(() => {
    fetchLatestMember();
  }, []);

  const fetchLatestMember = async () => {
    const data = await getMembers();
    if (data.length > 0) {
      setLatestMember(data[data.length - 1]); // Fetch last added member
    }
  };

  const handleDelete = async () => {
    if (latestMember) {
      await deleteMember(latestMember.gymId);
      setLatestMember(null); // Remove member from UI
    }
  };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-lg custom-card animate-fade-in">
        <h2 className="fw-bold text-gold text-center">🏋️ Latest Gym Member</h2>

        {latestMember ? (
          <Table bordered hover responsive className="mt-3 member-table">
            <tbody>
              <tr>
                <th>🆔 Gym ID</th>
                <td>{latestMember.gymId}</td>
              </tr>
              <tr>
                <th>👤 Name</th>
                <td>{latestMember.name}</td>
              </tr>
              <tr>
                <th>📧 Email</th>
                <td>{latestMember.email}</td>
              </tr>
              <tr>
                <th>📞 Phone</th>
                <td>{latestMember.phone}</td>
              </tr>
              <tr>
                <th>🏠 Address</th>
                <td>{latestMember.address}</td>
              </tr>
              <tr>
                <th>🎟️ Membership</th>
                <td>{latestMember.membershipType}</td>
              </tr>
              <tr>
                <th>📅 Expiry Date</th>
                <td>{latestMember.expiryDate}</td>
              </tr>
            </tbody>
          </Table>
        ) : (
          <p className="text-center text-white mt-3">No member added yet.</p>
        )}

        
      </Card>

      <style>{`
        body {
          background-color: #121212;
          color: white;
        }
        .custom-card {
          background: #1e1e1e;
          border-radius: 15px;
          box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
          transition: transform 0.2s ease-in-out;
          padding: 20px;
        }
        .custom-card:hover {
          transform: scale(1.02);
        }
        .member-table {
          background: #222;
          color: #fff;
          border-radius: 10px;
          overflow: hidden;
        }
        .member-table th {
          background: #f5c518;
          color: #121212;
          padding: 12px;
          text-align: left;
        }
        .member-table td {
          padding: 12px;
          border-bottom: 1px solid #444;
        }
        .custom-btn {
          background: linear-gradient(90deg, #ff9900, #ff5c00);
          color: white;
          border: none;
          border-radius: 8px;
          padding: 12px 20px;
          font-size: 1rem;
          transition: 0.3s ease-in-out;
        }
        .custom-btn:hover {
          background: linear-gradient(90deg, #ff5c00, #ff9900);
          transform: scale(1.05);
        }
        .animate-fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .text-gold {
          color: #f5c518;
        }
      `}</style>
    </Container>
  );
};

export default MemberInfo;
