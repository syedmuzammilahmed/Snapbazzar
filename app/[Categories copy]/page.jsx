'use client';
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState, useEffect } from "react";
import Sidebar from '../../components/Sidebar'; // Sidebar import
// Header import

export default function Categories() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState(() => []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  // const IoMdEye = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdEye), { ssr: false });


  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter categories based on the search query
  const filteredCategories = categories.filter(
    (category) =>
      category.c_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.c_description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://192.168.1.44:3001/snapbazzar/categories");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    fetchCategories();
  }, []);
  

  const addCategory = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.44:3001/snapbazzar/addcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          c_name: categoryName,
          c_description: categoryDescription,
          thumbnail: "default-thumbnail.jpg",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add category.");
      }

      const data = await response.json();
      alert(data.message);

      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          c_name: categoryName,
          c_description: categoryDescription,
        },
      ]);

      setCategoryName("");
      setCategoryDescription("");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Error adding category. Please try again later.");
    }
  };

  const handleView = (id) => {
    alert(`Viewing user with ID: ${id}`);
  };

  const handleEdit = (id) => {
    alert(`Editing user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    alert(`Deleting user with ID: ${id}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* Sidebar component */}

      {/* Main Content */}
      <div className="flex-1 p-6 mt-20 ml-0 sm:ml-64">
        <div className="bg-white p-6 rounded-md shadow-md w-full mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Categories</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              placeholder="Enter category description"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <div className="flex justify-end">
              <button
                onClick={addCategory}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-32"
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Category List and Search Input */}
        <div className="bg-white p-6 rounded-md shadow-md w-full mb-4">
          {/* Title and Search Input in Row */}
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Category List</h3>
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by name or description"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>

          {/* Category List */}
          <div>
            {filteredCategories.length > 0 ? (
              <div className="space-y-5">
                {/* Table Header */}
                <div className="flex items-center font-semibold border-b pb-2">
                  <div className="w-1/12">ID</div>
                  <div className="w-2/12">Image</div>
                  <div className="w-3/12">Name</div>
                  <div className="w-4/12">Description</div>
                  <div className="w-2/12">Actions</div>
                </div>
                {/* Table Rows */}
                {filteredCategories.map((category) => (
                  <div key={category.id} className="flex items-center border-b py-2">
                    <div className="w-1/12">{category.id}</div>
                    <div className="w-2/12">
                      <img
                        src={category.thumbnail}
                        alt={category.c_name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </div>
                    <div className="w-3/12">{category.c_name}</div>
                    <div className="w-4/12">
                      {category.c_description.length > 40
                        ? `${category.c_description.slice(0, 40)}...`
                        : category.c_description}
                    </div>
                    <div className="w-2/12 flex items-center space-x-2">
                      <button
                        onClick={() => handleView(category.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <IoMdEye className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="text-yellow-500 hover:text-yellow-700"
                      >
                        <MdEdit className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <MdDelete className="text-xl" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No categories available. Add some!</p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
