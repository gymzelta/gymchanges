import React, { useState } from "react";
import { addMember } from "../api";
import "./AddMember.css"; // Import CSS

const membershipPlans = {
  Monthly: { price: 999, months: 1 },
  Quarterly: { price: 2499, months: 3 },
  Yearly: { price: 8999, months: 12 },
};

const AddMember = () => {
  const today = new Date().toISOString().split("T")[0];

  const defaultExpiry = (months) => {
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return date.toISOString().split("T")[0];
  };

  const [member, setMember] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    membershipType: "Monthly",
    price: membershipPlans["Monthly"].price,
    startDate: today,
    expiryDate: defaultExpiry(membershipPlans["Monthly"].months),
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [gymId, setGymId] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "membershipType") {
      const plan = membershipPlans[value];
      const newStart = new Date(member.startDate);
      const expiry = new Date(newStart.setMonth(newStart.getMonth() + plan.months)).toISOString().split("T")[0];

      setMember({
        ...member,
        membershipType: value,
        price: plan.price,
        expiryDate: expiry,
      });
    } else if (name === "startDate") {
      const start = new Date(value);
      const months = membershipPlans[member.membershipType].months;
      const expiry = new Date(start.setMonth(start.getMonth() + months)).toISOString().split("T")[0];

      setMember({ ...member, startDate: value, expiryDate: expiry });
    } else {
      setMember({ ...member, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);
    setGymId("");

    if (!member.name || !member.email || !member.phone || !member.address) {
      setMessage("❌ All fields are required!");
      setLoading(false);
      return;
    }

    try {
      const response = await addMember(member);
      setMessage("✅ Member added successfully!");
      setGymId(response.gymId);

      setMember({
        name: "",
        email: "",
        phone: "",
        address: "",
        membershipType: "Monthly",
        price: membershipPlans["Monthly"].price,
        startDate: today,
        expiryDate: defaultExpiry(membershipPlans["Monthly"].months),
      });
    } catch (error) {
      setMessage("❌ Failed to add member. Check console for errors.");
      console.error("Submission Error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="add-member-container">
      <form className="add-member-form" onSubmit={handleSubmit}>
        <h2>🏋️ Add Gym Member</h2>
        {message && <p className="status-message">{message}</p>}
        {gymId && <p className="gym-id">🎟️ Gym ID: <strong>{gymId}</strong></p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={member.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={member.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={member.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={member.address}
          onChange={handleChange}
          required
        />

        <label>📦 Membership Type:</label>
        <select name="membershipType" value={member.membershipType} onChange={handleChange}>
          <option value="Monthly">Monthly - ₹999</option>
          <option value="Quarterly">Quarterly - ₹2499</option>
          <option value="Yearly">Yearly - ₹8999</option>
        </select>

        <label>📅 Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={member.startDate}
          onChange={handleChange}
          min={today}
        />

        <label>🔚 Expiry Date:</label>
        <input
          type="date"
          name="expiryDate"
          value={member.expiryDate}
          readOnly
        />

        <p className="membership-price">💰 Price: ₹{member.price}</p>

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? "Adding..." : "Add Member"}
        </button>
      </form>
    </div>
  );
};

export default AddMember;
