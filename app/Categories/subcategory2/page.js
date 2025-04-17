'use client'
import { IoMdEye } from 'react-icons/io'
import { MdDelete, MdEdit } from 'react-icons/md'
import { useState, useEffect, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'

export default function SubCategory2 () {
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const [existingImage, setExistingImage] = useState('')
  const [categories, setCategories] = useState(() => [])
  const [categories1, setCategories1] = useState(() => [])
  const [categories2, setCategories2] = useState(() => [])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null) // Store selected category
  const [selectedCategory1, setSelectedCategory1] = useState(null) // Store selected category
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)

  const handleSearch = event => {
    setSearchQuery(event.target.value)
  }

  const filteredCategories = categories.filter(category => {
    const name = category.title || ''
    const description = category.description || ''
    return (
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  //   useEffect(() => {
  //     const fetchCategories = async () => {
  //       try {
  //         const response = await fetch(
  //           'http://192.168.141.25:3001/snapbazzar/Subcategories1'
  //         )
  //         if (!response.ok) throw new Error('Failed to fetch categories')
  //         const data = await response.json()
  //         setCategories(
  //           data.data.map(category => ({
  //             id: category.id || '',
  //             title: category.title || 'Unnamed Category',
  //             description: category.description || 'No description provided',
  //             thumbnail: category.thumbnail || 'default-thumbnail.jpg'
  //           }))
  //         )
  //       } catch (error) {
  //         console.error('Error fetching categories:', error)
  //       }
  //     }

  //     fetchCategories()
  //   }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://192.168.141.25:3001/snapbazzar/categories'
        )
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories2(
          data.data.map(category => ({
            id: category.id || '',
            title: category.c_name || 'Unnamed Category',
            description: category.c_description || 'No description provided',
            thumbnail: category.thumbnail || 'default-thumbnail.jpg'
          }))
        )
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://192.168.141.25:3001/snapbazzar/Subcategories1'
        )
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories1(
          data.data.map(category => ({
            id: category.id || '',
            title: category.title || 'Unnamed Category',
            description: category.description || 'No description provided',
            thumbnail: category.thumbnail || 'default-thumbnail.jpg'
          }))
        )
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchCategories()
  }, [])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'http://192.168.141.25:3001/snapbazzar/Subcategories2'
        )
        if (!response.ok) throw new Error('Failed to fetch categories')
        const data = await response.json()
        setCategories(data.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchCategories()
  }, [refresh])

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this category?')) {
      return
    }

    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/deletesubcategory2',
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

  const addSubCategory2 = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert('Please fill out all fields.')
      return
    }

    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/addSubcategories2',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            category_id: selectedCategory1?.id,
            category_id1: selectedCategory?.id,
            title: categoryName,
            description: categoryDescription,
            thumbnail: selectedImage
              ? selectedImage.name
              : 'default-thumbnail.jpg'
          })
        }
      )

      if (!response.ok) {
        throw new Error('Failed to add subcategory.')
      }

      const data = await response.json()
      alert(data.message)

      setCategories([
        ...categories,
        {
          id: categories.length + 1,
          title: categoryName,
          description: categoryDescription,
          thumbnail: selectedImage
            ? selectedImage.name
            : 'default-thumbnail.jpg'
        }
      ])

      setCategoryName('')
      setCategoryDescription('')
    } catch (error) {
      console.error('Error adding subcategory:', error)
      alert('Error adding subcategory. Please try again later.')
    }
  }

  const handleView = id => {
    alert(`Viewing user with ID: ${id}`)
  }

  const handleEdit = category => {
    console.log('category: ', category)

    setSelectedCategory(category.id)
    setCategoryName(category.title)
    setCategoryDescription(category.description)
    setExistingImage(category.thumbnail)
    setModalVisible(!modalVisible) // Show the modal
  }

  const handleUpdate = async () => {
    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert('Please fill out all fields.')
      return
    }
    console.log('selectedCategory: ', selectedCategory)
    console.log('existingImage: ', existingImage)
    console.log('selectedImage: ', selectedImage)
    // return
    try {
      const response = await fetch(
        'http://192.168.141.25:3001/snapbazzar/updatesubcategory2',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: selectedCategory,
            title: categoryName,
            description: categoryDescription,
            thumbnail: selectedImage === null ? existingImage : selectedImage
          })
        }
      )

      // console.log('id', selectedCategory.id)

      if (!response.ok) {
        throw new Error('Failed to update category.')
      }

      const data = await response.json()

      alert(data.message)

      // Update the categories state with the updated category
      setCategories2(
        categories2.map(category =>
          category.id === selectedCategory.id
            ? {
                ...category,
                title: categoryName,
                description: categoryDescription
              }
            : category
        )
      )

      setModalVisible(!modalVisible) // Hide the modal after update
      setRefresh(!refresh)
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
      <div className='flex-1 p-6 mt-20 ml-0 sm:ml-64'>
        <div className='bg-white p-6 rounded-md shadow-md w-full mb-6'>
          <h3 className='text-xl font-semibold mb-4'>Add SubCategories2</h3>
          <div className='space-y-4'>
            <div className='flex items-center space-x-2'>
              <select
                id='categorySelect'
                value={selectedCategory1 ? selectedCategory1.id : ''}
                onChange={e => {
                  const selectedCat = categories2.find(
                    category => category.id === parseInt(e.target.value)
                  )
                  setSelectedCategory1(selectedCat)
                }}
                className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
              >
                <option value=''>Select a category</option>
                {categories2.map(category => (
                  <option key={category.id} value={category.id}>
                    <img
                      src={category.thumbnail}
                      alt={category.title}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Display image and title of selected category */}
            {selectedCategory1 && (
              <div className='mt-2 flex flex-row items-center'>
                <img
                  src={selectedCategory1.thumbnail || 'default-thumbnail.jpg'} // fallback to default image if thumbnail is not available
                  alt={selectedCategory1.title}
                  className='w-10 h-10 object-cover rounded-full'
                />
                <span className='ml-2 font-semibold'>
                  {selectedCategory1.title}
                </span>
              </div>
            )}

            <div className='flex items-center space-x-2'>
              <select
                id='categorySelect'
                value={selectedCategory ? selectedCategory.id : ''}
                onChange={e => {
                  const selectedCat = categories1.find(
                    category => category.id === parseInt(e.target.value)
                  )
                  setSelectedCategory(selectedCat)
                }}
                className='p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300'
              >
                <option value=''>Select a category</option>
                {categories1.map(category => (
                  <option key={category.id} value={category.id}>
                    <img
                      src={category.thumbnail}
                      alt={category.title}
                      className='w-10 h-10 object-cover rounded-full'
                    />
                    {category.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Display image and title of selected category */}
            {selectedCategory && (
              <div className='mt-2 flex flex-row items-center'>
                <img
                  src={selectedCategory.thumbnail || 'default-thumbnail.jpg'} // fallback to default image if thumbnail is not available
                  alt={selectedCategory.title}
                  className='w-10 h-10 object-cover rounded-full'
                />
                <span className='ml-2 font-semibold'>
                  {selectedCategory.title}
                </span>
              </div>
            )}

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
                onClick={addSubCategory2}
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
            <h3 className='text-xl font-semibold'>Subcategory2 List</h3>
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
                        alt={category.title}
                        className='w-10 h-10 object-cover rounded-full'
                      />
                    </div>
                    <div className='w-3/12'>{category.title}</div>
                    <div className='w-4/12'>
                      {category.description.length > 40
                        ? `${category.description.slice(0, 40)}...`
                        : category.description}
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
                onClick={() => setModalVisible(!modalVisible)}
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
