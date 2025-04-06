import React, { useEffect, useState } from "react";
import { getAllMembers, deleteMember } from "../api";
import "../styles/AllMembers.css"; // Import CSS for styling

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await getAllMembers();
      setMembers(response);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await deleteMember(id);
      setMembers(members.filter((member) => member._id !== id)); // Remove from UI
    } catch (error) {
      console.error("Error deleting member:", error);
    }
  };

  const filteredMembers = members.filter((member) =>
    `${member.name} ${member.email} ${member.phone}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="all-members-container">
      <h2>🏋️ All Gym Members</h2>

      <input
        type="text"
        className="search-bar"
        placeholder="🔍 Search by Name, Email, or Phone"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      {loading ? (
        <p>Loading members...</p>
      ) : (
        <table className="members-table">
          <thead>
            <tr>
              <th>Gym ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Membership</th>
              <th>Start Date</th>
              <th>Expiry Date</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length > 0 ? (
              filteredMembers.map((member) => (
                <tr key={member._id}>
                  <td>{member.gymId}</td>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.phone}</td>
                  <td>{member.membershipType}</td>
                  <td>{new Date(member.startDate).toLocaleDateString()}</td>
                  <td>{new Date(member.expiryDate).toLocaleDateString()}</td>
                  <td>₹{member.price}</td>
                  <td>
                    <button className="delete-btn" onClick={() => handleDelete(member._id)}>🗑 Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9">No members found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllMembers;
