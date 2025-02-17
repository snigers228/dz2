import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserCard from "./UserCard";


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users); // Initialize filteredUsers with all users
      setLoading(false);
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const handleSearch = setTimeout(() => {
      if (searchTerm) {
        const filtered = users.filter((user) =>
          `${user.firstName} ${user.lastName}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      } else {
        setFilteredUsers(users);
      }
    }, 300);

    return () => clearTimeout(handleSearch);
  }, [searchTerm, users]);

  // Handle pagination
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / usersPerPage);
  const displayedUsers = filteredUsers.slice(
    (page - 1) * usersPerPage,
    page * usersPerPage
  );

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <input
        type="text"
        placeholder="Search users..."
        className="border border-gray-300 rounded p-2 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`mx-1 px-3 py-1 border rounded ${
              page === index + 1 ? "bg-blue-500 text-white" : "border-gray-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserList;
