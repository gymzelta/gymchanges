import React from "react";
import MemberList from "../components/memberList";
import AddMember from "../components/AddMember";

const Members = () => {
  return (
    <div>
      <h1>Members</h1>
      <AddMember />
      <MemberList />
    </div>
  );
};

export default Members;
