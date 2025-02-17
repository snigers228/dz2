import React from "react";
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <Link to={`/user/${user.id}`} className="block border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h3 className="text-lg font-semibold">{user.firstName} {user.lastName}</h3>
      <p className="text-gray-600">Email: {user.email}</p>
      <p className="text-gray-600">Username: {user.username}</p>
    </Link>
  );
};

export default UserCard;
