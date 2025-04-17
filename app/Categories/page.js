'use client'
import { IoMdEye } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Sidebar from '../../components/Sidebar' // Sidebar import

export default function Categories () {
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false) // Modal state
  const [selectedCategory, setSelectedCategory] = useState(null) // Store the category being edited

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  // Filter categories based on the search query
  const filteredCategories = categories.filter(
    category =>
      category.c_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.c_description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://192.168.141.25:3001/snapbazzar/categories'
        )
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/deletecategory',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id }) // Send the category ID in the request body
        }
      )

      if (!response.ok) {
        throw new Error('Failed to delete category.')
      }

      const data = await response.json()
      alert(data.message)

      // Update the categories state to remove the deleted category
      setCategories(categories.filter(category => category.id !== id))
    } catch (error) {
      console.error('Error deleting category:', error)
      alert('Error deleting category. Please try again later.')
    }
  }

  const addCategory = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert('Please fill out all fields.')
      return
    }

    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/addcategories',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            c_name: categoryName,
            c_description: categoryDescription,
            thumbnail: 'default-thumbnail.jpg'
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add category.')
      }

      const data = await response.json()
      alert(data.message)

      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          c_name: categoryName,
          c_description: categoryDescription
        }
      ])

      setCategoryName('')
      setCategoryDescription('')
    } catch (error) {
      console.error('Error adding category:', error)
      alert('Error adding category. Please try again later.')
    }
  }

  const handleView = id => {
    alert(`Viewing category with ID: ${id}`)
  }

  const handleEdit = category => {
    setSelectedCategory(category)
    setCategoryName(category.c_name)
    setCategoryDescription(category.c_description)
    setModalVisible(true) // Show the modal
  }

  const handleUpdate = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert('Please fill out all fields.')
      return
    }

    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/updatecategory',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: selectedCategory.id,
            c_name: categoryName,
            c_description: categoryDescription,
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

      // Update the categories state with the updated category
      setCategories(
        categories.map(category =>
          category.id === selectedCategory.id
            ? {
                ...category,
                c_name: categoryName,
                c_description: categoryDescription
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
    <div className='flex min-h-screen bg-gray-100'>
      <Sidebar /> {/* Include the Sidebar component here */}
      <div className='flex-1 p-6 mt-20 ml-0 sm:ml-64'>
        <div className='bg-white p-6 rounded-md shadow-md w-full mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Add Categories</h3>
          <div className='space-y-4'>
            <input
              type='text'
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              placeholder='Enter category name'
              className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
            />
            <input
              type='text'
              value={categoryDescription}
              onChange={e => setCategoryDescription(e.target.value)}
              placeholder='Enter category description'
              className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
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
            <div className='flex justify-end'>
              <button
                onClick={addCategory}
                className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 w-32'
              >
                Add
              </button>
            </div>
          </div>
        </div>

        {/* Category List and Search Input */}
        <div className='bg-white p-6 rounded-md shadow-md w-full mb-4'>
          <div className='flex items-center justify-between mb-4'>
            <h3 className='text-xl font-semibold'>Category List</h3>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearch}
              placeholder='Search by name or description'
              className='p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64'
            />
          </div>

          <div>
            {filteredCategories.length > 0 ? (
              <div className='space-y-5'>
                <div className='flex items-center font-semibold border-b pb-2'>
                  <div className='w-1/12'>ID</div>
                  <div className='w-2/12'>Image</div>
                  <div className='w-3/12'>Name</div>
                  <div className='w-4/12'>Description</div>
                  <div className='w-2/12'>Actions</div>
                </div>
                {filteredCategories.map(category => (
                  <div
                    key={category.id}
                    className='flex items-center border-b py-2'
                  >
                    <div className='w-1/12'>{category.id}</div>
                    <div className='w-2/12'>
                      <img
                        src={category.thumbnail}
                        alt={category.c_name}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </div>
                    <div className='w-3/12'>{category.c_name}</div>
                    <div className='w-4/12'>
                      {category.c_description.length > 40
                        ? `${category.c_description.slice(0, 40)}...`
                        : category.c_description}
                    </div>
                    <div className='w-2/12 flex items-center space-x-2'>
                      <button
                        onClick={() => handleView(category.id)}
                        className='text-blue-500 hover:text-blue-700'
                      >
                        <IoMdEye className='text-xl' />
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className='text-yellow-500 hover:text-yellow-700'
                      >
                        <MdEdit className='text-xl' />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className='text-red-500 hover:text-red-700'
                      >
                        <MdDelete className='text-xl' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className='text-gray-500'>
                No categories available. Add some!
              </p>
            )}
          </div>
        </div>
      </div>
      {/* Modal for Editing Category */}
      {modalVisible && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg shadow-lg w-96 animate__animated animate__fadeIn animate__delay-20s'>
            <h3 className='text-xl font-semibold mb-4'>Edit Category</h3>
            <input
              type='text'
              value={categoryName}
              onChange={e => setCategoryName(e.target.value)}
              placeholder='Enter category name'
              className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300 mb-4'
            />
            <input
              type='text'
              value={categoryDescription}
              onChange={e => setCategoryDescription(e.target.value)}
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
  )
}
