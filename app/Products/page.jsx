'use client';
import { IoMdEye } from "react-icons/io";
import { MdDelete, MdEdit } from "react-icons/md";
import { useState, useEffect, useCallback } from "react";
import { useDropzone } from 'react-dropzone'
// Header import

export default function Products() {
  const [productsName, setproductsName] = useState("");
  const [productsDescription, setproductsDescription] = useState("");
  const [products, setproducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredproducts = products.filter(
    (category) =>
      (category.p_name && category.p_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (category.p_description && category.p_description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        const response = await fetch("http://192.168.141.25:3001/snapbazzar/products");
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        setproducts(data.data); 
        console.log("data",data)
      } catch (error) { 
        console.error("Error fetching products:", error);
      }
    };

    fetchproducts();
  }, []);


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
  
    try {
      const response = await fetch("http://192.168.141.25:3001/snapbazzar/deleteproducts", {
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
      setproducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product. Please try again later.");
    }
  };
  

  const addProduct = async () => {
    if (!productsName.trim() || !productsDescription.trim() || !selectedImage) {
      alert("Please fill out all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("p_name", productsName);
    formData.append("p_description", productsDescription);
    formData.append("thumbnail", selectedImage);

    setLoading(true); // Show loading state
    setError(null); // Clear previous errors

    try {
      const response = await fetch("http://192.168.141.25:3001/snapbazzar/addproducts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to add product.");
      }

      const data = await response.json();
      alert(data.message);

      setproducts([
        ...products,
        {
          id: products.length + 1, // or use a proper ID if returned from the backend
          p_name: productsName,
          p_description: productsDescription,
          thumbnail: "default-thumbnail.jpg",
        },
      ]);

      // Reset the form after successful submission
      setproductsName("");
      setproductsDescription("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Error adding product. Please try again later.");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  const handleView = (id) => {
    alert(`Viewing product with ID: ${id}`);
  };

  const handleEdit = category => {
    setSelectedCategory(category)
    setproductsName(category.p_name)
    setproductsDescription(category.p_description)
    setModalVisible(true) // Show the modal
  }

  const handleUpdate = async () => {
    if (!(productsName?.trim() && productsDescription?.trim())) {
      alert('Please fill out all fields.');
      return;
    }

    
    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/updateproducts',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: selectedCategory.id,
            p_name: productsName,
            p_description: productsDescription,
            thumbnail: selectedImage
              ? selectedImage.name
              : 'default-thumbnail.jpg'
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to update category.')
      }

      const data = await response.json()
      alert(data.message)

      setproducts(
        products.map(category =>
          category.id === selectedCategory.id
            ? {
                ...category,
                p_name: productsName,
                p_description: productsDescription
              }
            : category
        )
      )

      setModalVisible(false) // Hide the modal after update
    } catch (error) {
      console.error('Error updating category:', error)
      alert('Error updating category. Please try again later.')
    }
  }

    const onDrop = useCallback(acceptedFiles => {
      // Process the first accepted file
      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0]
        setSelectedImage(
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      }
    }, [])
  
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: 'image/*'
    })

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 mt-20 ml-0 sm:ml-64">
        <div className="bg-white p-6 rounded-md shadow-md w-full mb-6">
          <h3 className="text-xl font-semibold mb-4">Add Products</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={productsName}
              onChange={(e) => setproductsName(e.target.value)}
              placeholder="Enter product name"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            <input
              type="text"
              value={productsDescription}
              onChange={(e) => setproductsDescription(e.target.value)}
              placeholder="Enter product description"
              className="p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
           <div
              {...getRootProps()}
              className={`border-dashed border-2 p-4 rounded-md ${
                isDragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
              }`}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className='text-blue-500'>Drop the image here...</p>
              ) : (
                <p className='text-gray-500'>
                  Drag & drop an image here, or click to select one
                </p>
              )}
              {selectedImage && (
                <div className='mt-4'>
                  <p className='text-gray-700'>Selected Image:</p>
                  <img
                    src={selectedImage.preview}
                    alt='Selected'
                    className='mt-2 w-30 h-20 object-cover rounded-md'
                  />
                </div>
              )}
            </div>
            <div className="flex justify-end">
              <button
                onClick={addProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-32"
                disabled={loading} // Disable button while loading
              >
                {loading ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
          {error && <p className="text-red-500 mt-2">{error}</p>} {/* Error message */}
        </div>

        {/* Category List and Search Input */}
        <div className="bg-white p-6 rounded-md shadow-md w-full mb-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Products List</h3>
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
            {filteredproducts.length > 0 ? (
              <div className="space-y-5">
                <div className="flex items-center font-semibold border-b pb-2">
                  <div className="w-1/12">ID</div>
                  <div className="w-2/12">Image</div>
                  <div className="w-3/12">Name</div>
                  <div className="w-4/12">Description</div>
                  <div className="w-2/12">Actions</div>
                </div>
                {filteredproducts.map((category) => (
                  <div key={category.id} className="flex items-center border-b py-2">
                    <div className="w-1/12">{category.id}</div>
                    <div className="w-2/12">
                      <img
                        src={"http://localhost:3001"+category.thumbnail}
                        alt={category.p_name}
                        className="w-10 h-10 object-cover rounded-full"
                      />
                    </div>
                    <div className="w-3/12">{category.p_name}</div>
                    <div className="w-4/12">
                      {category.p_description.length > 40
                        ? `${category.p_description.slice(0, 40)}...`
                        : category.p_description}
                    </div>
                    <div className="w-2/12 flex items-center space-x-2">
                      <button
                        onClick={() => handleView(category.id)}
                        className="text-blue-500 hover:text-blue-700"
                      >
                        <IoMdEye className="text-xl" />
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
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
              <p className="text-gray-500">No products available. Add some!</p>
            )}
          </div>
        </div>
      </div>
      {modalVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn animate__delay-20s'>
            <h3 className='text-xl font-semibold mb-4'>Edit Category</h3>
            <input
              type='text'
              value={productsName}
              onChange={e => setproductsName(e.target.value)}
              placeholder='Enter category name'
              className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4'
            />
            <input
              type='text'
              value={productsDescription}
              onChange={e => setproductsDescription(e.target.value)}
              placeholder='Enter category description'
              className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4'
            />
            <input
              type='file'
              name='thumbnail'
              accept='image/*'
              onChange={e => setSelectedImage(e.target.files[0])}
              className='p-2 w-full border border-gray-300 rounded-md mb-4'
            />
            <div className='flex justify-end space-x-2'>
              <button
                onClick={() => setModalVisible(false)}
                className='bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600'
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
