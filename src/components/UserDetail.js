import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetail = async () => {
      const response = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    };

    fetchUserDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{user.firstName} {user.lastName}</h1>
      <p>Email: {user.email}</p>
      <p>Username: {user.username}</p>
      <p>Age: {user.age}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address.street}, {user.address.city}</p>
      <Link to="/" className="text-blue-500 underline">Back to Users</Link>
    </div>
  );
};

export default UserDetail;
