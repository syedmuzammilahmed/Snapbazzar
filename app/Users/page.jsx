'use client';
import { useState, useEffect } from "react";
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import Sidebar from '../../components/Sidebar'; // Sidebar import
 // Header import

export default function Users() {
  const [users, setUsers] = useState([]);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter users based on the search query
  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
  
    try {
      const response = await fetch("http://192.168.141.25:3001/snapbazzar/deleteusers", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }), // Ensure the key matches the backend requirement
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete product.");
      }
  
      const data = await response.json();
      alert(data.message);
  
      // Update the state by filtering out the deleted product
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://192.168.141.25:3001/snapbazzar/users"); // Replace with your actual API endpoint
        if (!response.ok) throw new Error("Failed to fetch users");
        const data = await response.json();
        setUsers(data.data); // Assuming the API returns a `data` object containing the categories
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleView = (id) => {
    alert(`Viewing user with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing user with ID: ${id}`);
  };


  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      

      {/* Main Content */}
      <div className="flex-1 p-6 mt-20 ml-0 sm:ml-64"> {/* Adjust margin-left for responsive */}
      <div className="bg-white p-6 rounded-md shadow-md w-full mb-4">
          {/* Title and Search Input in Row */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Users List</h3>
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name or email"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* Category List */}
          <div>
          {filteredUsers.length > 0 ? (
            <div className="space-y-2">
              {/* Table Header */}
              <div className="flex items-center font-semibold border-b pb-2">
                <div className="w-1/12">ID</div>
                <div className="w-3/12">Name</div>
                <div className="w-5/12">E-mail</div>
                <div className="w-3/12">Actions</div>
              </div>

              {/* Table Rows */}
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center border-b py-2">
                  <div className="w-1/12">{user.id}</div>
                  <div className="w-3/12">{user.name}</div>
                  <div className="w-5/12">{user.email}</div>
                  <div className="w-3/12 flex items-center space-x-2">
                    <button
                      onClick={() => handleView(user.id)} // Fixed to use user.id
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <IoMdEye className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleEdit(user.id)} // Fixed to use user.id
                      className="text-yellow-500 hover:text-yellow-700"
                    >
                      <MdEdit className="text-xl" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)} // Fixed to use user.id
                      className="text-red-500 hover:text-red-700"
                    >
                      <MdDelete className="text-xl" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No users available. Add some!</p>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
