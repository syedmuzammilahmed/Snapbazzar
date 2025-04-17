"use client"
import { useState, useRef  } from 'react';
import { FiShoppingCart, FiUser, FiSearch, FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
// Import Swiper and required modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from "lucide-react"; 
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

export default function EcommercePage() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;
    if (direction === "left") {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };

  const images = [
    {
      url: "https://e7.pngegg.com/pngimages/301/757/png-clipart-airplane-aircraft-transparency-airplane-mode-of-transport-flight.png",
      heading: "Every Wednesday Offer!",
      subheading: "Up to ₹4,750 Off"
    },
    {
      url: "data:image/jpeg;base64,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",
      heading: "Exclusive Beach Deals",
      subheading: "Get flat 10% off"
    },
    {
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfqdeO42P6L2QVDBPmax0e6MSP4N_brqzqDQ&s",
      heading: "Train & Hotel Combo",
      subheading: "Up to ₹2,000 Cashback"
    },
  ];
  
  const categories = [
    { 
      name: 'Kilos', 
      image: 'https://png.pngtree.com/png-clipart/20240428/original/pngtree-grocery-basket-and-a-list-of-products-png-image_14956705.png',
      subcategories: []
    },
    { 
      name: 'Mobiles', 
      image: 'https://w7.pngwing.com/pngs/230/802/png-transparent-vivo-2023-smartphone-feature-phone-mobile-phones-artist-growth-smartphone-android-phone.png',
      subcategories: ['All Mobile Phones', 'Apple', 'Samsung', 'Xiaomi', 'Realme', 'OPPO', 'Accessories']
    },
    { 
      name: 'Fashion', 
      image: 'https://www.pngarts.com/files/1/Fashion-PNG-Photo.png',
      subcategories: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids', 'Footwear', 'Accessories'],
      secondaryMenu: {
        'Men\'s Clothing': ['T-shirts', 'Shirts', 'Jeans', 'Trousers', 'Suits', 'Ethnic Wear'],
        'Women\'s Clothing': ['Sarees', 'Kurtas', 'Tops', 'Dresses', 'Jeans', 'Ethnic Wear'],
        'Kids': ['Boys Clothing', 'Girls Clothing', 'Toys', 'Baby Care', 'School Supplies'],
        'Footwear': ['Men\'s Footwear', 'Women\'s Footwear', 'Kids Footwear', 'Sports Shoes'],
        'Accessories': ['Watches', 'Bags', 'Sunglasses', 'Jewelry', 'Wallets']
      }
    },
    { 
      name: 'Electronics', 
      image: 'https://e7.pngegg.com/pngimages/63/912/png-clipart-black-microsoft-windows-laptop-computer-laptop-macbook-pro-refurbishment-macbook-air-laptops-gadget-electronics-thumbnail.png',
      subcategories: [
        'Audio',
        'Electronics GST Store',
        'Cameras & Accessories',
        'Computer Peripherals',
        'Gaming',
        'Health & Personal Care',
        'Laptop Accessories',
        'Laptop and Desktop',
        'MobileAccessory',
        'Powerbank',
        'Smart Home automation',
        'Smart Wearables'
      ],
      secondaryMenu: {
        'Audio': [
          'All',
          'Bluetooth Headphones',
          'Wired Headphones',
          'True Wireless Earbuds',
          'Bluetooth Speakers',
          'Soundbars',
          'Home Theatres',
          'TV Streaming Device',
          'Remote Control',
          'DTH Set top box',
          'Headphones Pouch & Case Covers'
        ],
        'Electronics GST Store': [
          'Televisions',
          'Washing Machines',
          'Refrigerators',
          'Air Conditioners',
          'Kitchen Appliances',
          'Personal Care'
        ],
        'Cameras & Accessories': [
          'DSLR Cameras',
          'Mirrorless Cameras',
          'Point & Shoot',
          'Camera Lenses',
          'Tripods',
          'Camera Bags'
        ],
        'Computer Peripherals': [
          'Printers',
          'Monitors',
          'Projectors',
          'Hard Drives',
          'Routers',
          'Keyboards & Mouse'
        ],
        'Gaming': [
          'Gaming Consoles',
          'Gaming Laptops',
          'Gaming Accessories',
          'Gaming Titles',
          'Gaming Components'
        ],
        'Health & Personal Care': [
          'Trimmers',
          'Shavers',
          'Hair Dryers',
          'Hair Straighteners',
          'Massage Equipment',
          'BP Monitors'
        ],
        'Laptop Accessories': [
          'Laptop Skins',
          'Laptop Bags',
          'Laptop Cooling Pads',
          'Keyboards',
          'Mouse',
          'USB Hubs'
        ],
        'Laptop and Desktop': [
          'Laptops',
          'Gaming Laptops',
          'Desktop PCs',
          'All-in-One PCs',
          'Mini PCs',
          'PC Components'
        ],
        'MobileAccessory': [
          'Cases & Covers',
          'Screen Guards',
          'Power Banks',
          'Chargers',
          'Cables',
          'Mobile Holders'
        ],
        'Powerbank': [
          '10000mAh & Above',
          '5000-10000mAh',
          'Below 5000mAh',
          'Fast Charging',
          'Multi-port'
        ],
        'Smart Home automation': [
          'Smart Lights',
          'Smart Speakers',
          'Smart Switches',
          'Smart Cameras',
          'Smart Locks',
          'Smart Displays'
        ],
        'Smart Wearables': [
          'Smart Watches',
          'Fitness Bands',
          'Smart Glasses',
          'Activity Trackers',
          'Smart Clothing',
          'Health Trackers'
        ]
      }
    },
    { 
      name: 'Home & Furniture', 
      image: 'https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTA4L3Jhd3BpeGVsb2ZmaWNlMl9taW5pbWFsX3NpbXBsZV9waG90b19vZl9jb3p5X2NoYWlyX29uX3doaXRlX2JhY19hNzNmNGVhZS0xNTVjLTQ0MjYtOGFlNC04ODYxNTQyODY4OWEucG5n.png',
      subcategories: ['Kitchen', 'Furniture', 'Home Decor', 'Tools', 'Dining'],
      secondaryMenu: {
        'Kitchen': ['Cookware', 'Utensils', 'Storage', 'Appliances', 'Tableware'],
        'Furniture': ['Beds', 'Sofas', 'Dining Tables', 'Wardrobes', 'TV Units'],
        'Home Decor': ['Curtains', 'Paintings', 'Clocks', 'Plants', 'Showpieces'],
        'Tools': ['Power Tools', 'Hand Tools', 'Electrical', 'Gardening Tools'],
        'Dining': ['Dinner Sets', 'Glasses', 'Cutlery', 'Coffee Mugs', 'Bar Accessories']
      }
    },
    { 
      name: 'Appliances', 
      image: 'https://e7.pngegg.com/pngimages/697/440/png-clipart-home-appliance-consumer-electronics-lg-electronics-laptop-laptop-kitchen-electronics.png',
      subcategories: ['TVs', 'Washing Machines', 'Refrigerators', 'Air Conditioners', 'Microwaves'],
      secondaryMenu: {
        'TVs': ['Smart TVs', 'LED TVs', 'OLED TVs', 'QLED TVs', '32 Inch', '43 Inch', '55 Inch'],
        'Washing Machines': ['Fully Automatic', 'Semi Automatic', 'Top Load', 'Front Load'],
        'Refrigerators': ['Single Door', 'Double Door', 'Side by Side', 'Convertible'],
        'Air Conditioners': ['Split ACs', 'Window ACs', 'Inverter ACs', 'Portable ACs'],
        'Microwaves': ['Solo', 'Grill', 'Convection', 'Built-in']
      }
    },
    { 
      name: 'Flight Bookings', 
      image: 'https://e7.pngegg.com/pngimages/301/757/png-clipart-airplane-aircraft-transparency-airplane-mode-of-transport-flight.png',
      subcategories: []
    },
    { 
      name: 'Beauty, Toys & More', 
      image: 'https://e7.pngegg.com/pngimages/638/700/png-clipart-kids-toys-web-page-early-learning.png',
      subcategories: ['Beauty', 'Toys', 'Baby Care', 'Sports', 'Books'],
      secondaryMenu: {
        'Beauty': ['Makeup', 'Skincare', 'Haircare', 'Fragrances', 'Personal Care'],
        'Toys': ['Remote Control', 'Learning Toys', 'Soft Toys', 'Puzzles', 'Board Games'],
        'Baby Care': ['Diapers', 'Baby Food', 'Baby Bath', 'Baby Gear', 'Baby Bedding'],
        'Sports': ['Cricket', 'Badminton', 'Football', 'Fitness Equipment', 'Yoga'],
        'Books': ['Fiction', 'Non-Fiction', 'School Textbooks', 'Children Books']
      }
    },
    { 
      name: 'Two Wheelers', 
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhJZeR1j5kMyvbSZwd4d8jyq6yAHLwzbWMQ&s',
      subcategories: ['Motorcycles', 'Scooters', 'Electric', 'Accessories', 'Spare Parts'],
      secondaryMenu: {
        'Motorcycles': ['Sport Bikes', 'Cruisers', 'Commuter', 'Off-Road'],
        'Scooters': ['Standard', 'Maxi', 'Electric'],
        'Electric': ['Bikes', 'Scooters', 'Cycles'],
        'Accessories': ['Helmets', 'Gloves', 'Jackets', 'Locks', 'Covers'],
        'Spare Parts': ['Batteries', 'Tyres', 'Lights', 'Engine Oil', 'Filters']
      }
    }
  ];
  
  // Product categories data
  const productCategories = [
    {
      title: "Summer Fashion",
      products: [
        { 
          name: "Men's Casual Shoes", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc8L2GHiRoec6nwj7CmSNn0NXxJVnaqyz30A&s",
          discount: "Min. 70% Off" 
        },
        { 
          name: "Backpacks", 
          image: "data:image/jpeg;base64,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",
          discount: "Min. 70% Off" 
        },
        { 
          name: "Men's Slippers & Flip Flops", 
          image: "data:image/jpeg;base64,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",
          discount: "Min. 50% Off" 
        },
        { 
          name: "Men's Sports Shoes", 
          image: "data:image/jpeg;base64,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",
          discount: "Min. 50% Off" 
        }
      ]
    },
    {
      title: "Festive Must-haves",
      products: [
        { 
          name: "Casual Shirts", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQXdsu8f_fiMg6PVJ2Jt9EIAxqimwn4N0jUw&s",
          discount: "Min. 50% Off" 
        },
        { 
          name: "Women's Ethnic Sets", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGoSYhopd6XJJOQeIdHmrSmlYrKqv6lgrKDA&s",
          discount: "Special Offer" 
        },
        { 
          name: "Speakers", 
          image: "data:image/jpeg;base64,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",
          discount: "Special Offer" 
        },
        { 
          name: "Men's T-shirts", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgisGObyQywgiZEWzhChHI3l1GxucqDRWbdw&s",
          discount: "Special Offer" 
        }
      ]
    },
    {
      title: "Appliance for Cool Summer",
      products: [
        { 
          name: "Home Theatre Systems", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRSuAYw9J6ORFQl_u1Chnzmub2zjdrEyvjpA&s",
          discount: "Special Offer" 
        },
        { 
          name: "Wireless Headphones", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhqAMERogkLCkf-eYJpPEbeCkO7HjwhAmSjA&s",
          discount: "Min. 50% Off" 
        },
        { 
          name: "Cameras", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn7wU_G-xQaRcLmMHLK4bZmhg0d25gXJx-ag&s",
          discount: "Min. 30% Off" 
        },
        { 
          name: "Fans", 
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLv2XmvrG944DtC5gZJ1-miOkuWHCufGjPNw&s",
          discount: "Min. 50% Off" 
        }
      ]
    }
  ];
  
  // Products section content
  const featuredProducts = [
    { name: 'Wireless Earbuds', price: '₹999', image: 'https://w7.pngwing.com/pngs/167/383/png-transparent-apple-airpods-headphones-apple-earbuds-apple-bluetooth-sound-fruit-nut-thumbnail.png' },
    { name: 'Laptop', price: '₹45,999', image: 'https://e7.pngegg.com/pngimages/63/912/png-clipart-black-microsoft-windows-laptop-computer-laptop-macbook-pro-refurbishment-macbook-air-laptops-gadget-electronics-thumbnail.png' },
    { name: 'Smart Watch', price: '₹2,499', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKEw9fCl5BbkzP10RoKhPZI3a7mRWgapx7ng&s' },
    { name: 'Printer', price: '₹8,999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2lSqkQmZStZH0_YIQaCH-n6Xr7dqKCNxwA&s' },
    { name: 'Laptop', price: '₹45,999', image: 'https://e7.pngegg.com/pngimages/63/912/png-clipart-black-microsoft-windows-laptop-computer-laptop-macbook-pro-refurbishment-macbook-air-laptops-gadget-electronics-thumbnail.png' },
    { name: 'Printer', price: '₹8,999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2lSqkQmZStZH0_YIQaCH-n6Xr7dqKCNxwA&s' },
    { name: 'Monitor', price: '₹12,999', image: 'https://img.favpng.com/13/12/21/computer-icons-computer-monitors-png-favpng-2eMa0jieQuMZXyrH0nKdzimdJ.jpg' },
    { name: 'Printer', price: '₹8,999', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn2lSqkQmZStZH0_YIQaCH-n6Xr7dqKCNxwA&s' },
    { name: 'Wireless Earbuds', price: '₹999', image: 'https://w7.pngwing.com/pngs/167/383/png-transparent-apple-airpods-headphones-apple-earbuds-apple-bluetooth-sound-fruit-nut-thumbnail.png' },
    { name: 'Laptop', price: '₹45,999', image: 'https://e7.pngegg.com/pngimages/63/912/png-clipart-black-microsoft-windows-laptop-computer-laptop-macbook-pro-refurbishment-macbook-air-laptops-gadget-electronics-thumbnail.png' },
  ];
  
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600 mr-4">Snapbazzar</h1>
          </div>
          
          <div className="flex-1 mx-4 relative">
            <div className="flex items-center bg-gray-100 rounded-sm overflow-hidden">
              <input
                type="text"
                placeholder="Search for Products, Brands and More"
                className="w-full py-2 px-4 bg-gray-100 focus:outline-none"
              />
              <button className="bg-gray-100 p-2 text-blue-500">
                <FiSearch size={20} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button className="flex items-center text-blue-600 font-medium">
              <FiUser className="mr-1" /> Login <FiChevronDown className="ml-1" />
            </button>
            <button className="flex items-center font-medium">
              <FiShoppingCart className="mr-1" /> Cart
            </button>
            <button className="flex items-center font-medium">
              Become a Seller
            </button>
          </div>
        </div>
      </header>
      
      {/* Navigation */}
      <nav className="container mx-auto px-4 py-2">
        <ul className="flex justify-between items-center">
          {categories.map((category, index) => (
            <li 
              key={index} 
              className="relative text-center px-2 py-1"
              onMouseEnter={() => setActiveCategory(index)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="flex flex-col items-center">
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-16 h-16 object-contain mb-1" 
                />
                <span className="flex items-center whitespace-nowrap">
                  {category.name}
                  {category.subcategories.length > 0 && (
                    <FiChevronDown className={`ml-1 transition-transform ${activeCategory === index ? 'rotate-180' : ''}`} />
                  )}
                </span>
              </div>
              
              {/* Primary Dropdown */}
              {activeCategory === index && category.subcategories.length > 0 && (
                <div className="absolute left-0 top-full mt-1 bg-white shadow-lg z-10 min-w-64 flex">
                  {/* Left panel with subcategories */}
                  <div className="w-64 border-r border-gray-200">
                    {category.subcategories.map((subcat, subIndex) => (
                      <div 
                        key={subIndex}
                        className="p-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                        onMouseEnter={() => setActiveSubcategory(subcat)}
                        onMouseLeave={() => setActiveSubcategory(null)}
                      >
                        <span>{subcat}</span>
                        {category.secondaryMenu && category.secondaryMenu[subcat] && (
                          <FiChevronDown className="ml-2 -rotate-90" />
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* Secondary dropdown (appears when hovering over subcategory) */}
                  {category.secondaryMenu && activeSubcategory && category.secondaryMenu[activeSubcategory] && (
                    <div className="w-64 bg-white shadow-lg absolute left-64 top-0 z-20">
                      <div className="p-3 font-medium border-b border-gray-200">
                        More in {activeSubcategory}
                      </div>
                      {category.secondaryMenu[activeSubcategory].map((item, itemIndex) => (
                        <div key={itemIndex} className="p-3 hover:bg-gray-100 cursor-pointer">
                          {item}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Travel Banner */}
        <div className='relative bg-indigo-600 rounded-lg shadow mb-8 overflow-hidden'>
          <div className='flex items-center'>
            {/* Banner content */}
            <div className='w-full relative'>
              <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                navigation={true}
                loop={true}
                className='w-full'
              >
                {images.map((img, idx) => (
                  <SwiperSlide key={idx}>
                    <div className='flex p-6 bg-blue-900'>
                      {/* Left image */}
                      <div className='w-1/3 relative'>
                        <img
                          src={img.url}
                          alt='Banner Image'
                          className='w-64 h-48 object-contain'
                        />
                        
                      </div>

                      {/* Right text */}
                      <div className='w-2/3 text-white flex flex-col justify-center'>
                        <div className='flex items-center mb-2'>
                          <span className='text-lg'>Snapbazzar Travel</span>
                          <div className='ml-6 px-3 py-1 bg-yellow-500 text-blue-900 font-bold rounded-md'>
                            EPIC TRAVEL DAYS
                          </div>
                        </div>
                        <h2 className='text-2xl font-semibold mb-1'>
                          {img.heading}
                        </h2>
                        <h3 className='text-3xl font-bold mb-2'>
                          {img.subheading}
                        </h3>
                        <button className='bg-white text-blue-700 font-medium py-1 px-4 rounded-sm w-24'>
                          Book now
                        </button>

                        <div className='flex mt-4 space-x-4'>
                          <div className='bg-white px-4 py-1 rounded-md font-semibold text-gray-800'>
                            FLYAXIS
                          </div>
                          <div className='flex items-center'>
                            <img
                              src='https://logos-download.com/wp-content/uploads/2016/10/Axis_Bank_logo-700x185.png'
                              alt='Axis Bank'
                              className='h-6'
                            />
                            <div className='ml-2 text-sm'>
                              <div>Flat 12% Off</div>
                              <div className='text-xs'>
                                on credit card & EMI txn
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
        
        {/* Products */}
        <div className="bg-white rounded-lg shadow p-6 mb-8 relative">
      <h2 className="text-2xl font-bold mb-6">Best of Electronics</h2>

      {/* Arrow Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("right")}
      >
        <ChevronRight />
      </button>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
      >
        {featuredProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-48 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600 font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
        <div className="bg-white rounded-lg shadow p-6 mb-8 relative">
      <h2 className="text-2xl font-bold mb-6">Best of Electronics</h2>

      {/* Arrow Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("right")}
      >
        <ChevronRight />
      </button>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
      >
        {featuredProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-48 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600 font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
        <div className="flex flex-wrap -mx-2 mb-8">
          {productCategories.map((category, index) => (
            <div key={index} className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <button className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600">
                    <FiChevronRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="border p-2 flex flex-col items-center">
                      <div className="h-40 flex items-center justify-center mb-2">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                      <h3 className="text-sm text-center mb-1">{product.name}</h3>
                      <p className="text-sm text-green-600 font-medium">{product.discount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap -mx-2 mb-8">
          {productCategories.map((category, index) => (
            <div key={index} className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <button className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600">
                    <FiChevronRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="border p-2 flex flex-col items-center">
                      <div className="h-40 flex items-center justify-center mb-2">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                      <h3 className="text-sm text-center mb-1">{product.name}</h3>
                      <p className="text-sm text-green-600 font-medium">{product.discount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-lg shadow p-6 mb-8 relative">
      <h2 className="text-2xl font-bold mb-6">Best of Electronics</h2>

      {/* Arrow Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("right")}
      >
        <ChevronRight />
      </button>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
      >
        {featuredProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-48 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600 font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="bg-white rounded-lg shadow p-6 mb-8 relative">
      <h2 className="text-2xl font-bold mb-6">Best of Electronics</h2>

      {/* Arrow Buttons */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("left")}
      >
        <ChevronLeft />
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full shadow p-2"
        onClick={() => scroll("right")}
      >
        <ChevronRight />
      </button>

      {/* Scrollable Products */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto pb-4 scroll-smooth scrollbar-hide"
      >
        {featuredProducts.map((product, index) => (
          <div key={index} className="flex-shrink-0 w-48 text-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-contain mb-2"
            />
            <h3 className="font-medium">{product.name}</h3>
            <p className="text-green-600 font-medium">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-wrap -mx-2 mb-8">
          {productCategories.map((category, index) => (
            <div key={index} className="w-full md:w-1/3 px-2 mb-4">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-xl font-bold">{category.title}</h2>
                  <button className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full text-blue-600">
                    <FiChevronRight size={20} />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-0.5">
                  {category.products.map((product, productIndex) => (
                    <div key={productIndex} className="border p-2 flex flex-col items-center">
                      <div className="h-40 flex items-center justify-center mb-2">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="max-h-full max-w-full object-contain" 
                        />
                      </div>
                      <h3 className="text-sm text-center mb-1">{product.name}</h3>
                      <p className="text-sm text-green-600 font-medium">{product.discount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="bg-gray-900 text-white text-xs">
      <div className="container mx-auto px-6 py-8">
        {/* Main footer sections */}
        <div className="grid grid-cols-5 gap-4">
          {/* ABOUT Section */}
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-medium mb-3">ABOUT</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Flipkart Stories</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
              <li><a href="#" className="hover:underline">Corporate Information</a></li>
            </ul>
          </div>

          {/* GROUP COMPANIES Section */}
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-medium mb-3">GROUP COMPANIES</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Myntra</a></li>
              <li><a href="#" className="hover:underline">Cleartrip</a></li>
              <li><a href="#" className="hover:underline">Shopsy</a></li>
            </ul>
          </div>

          {/* HELP Section */}
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-medium mb-3">HELP</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Payments</a></li>
              <li><a href="#" className="hover:underline">Shipping</a></li>
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
            </ul>
          </div>

          {/* CONSUMER POLICY Section */}
          <div>
            <h3 className="text-gray-400 uppercase text-xs font-medium mb-3">CONSUMER POLICY</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Cancellation & Returns</a></li>
              <li><a href="#" className="hover:underline">Terms Of Use</a></li>
              <li><a href="#" className="hover:underline">Security</a></li>
              <li><a href="#" className="hover:underline">Privacy</a></li>
              <li><a href="#" className="hover:underline">Sitemap</a></li>
              <li><a href="#" className="hover:underline">Grievance Redressal</a></li>
              <li><a href="#" className="hover:underline">EPR Compliance</a></li>
            </ul>
          </div>

          {/* Address and Contact Info */}
          <div className="col-span-1">
            <div className="border-l border-gray-700 pl-4 h-full">
              <div className="mb-6">
                <h3 className="text-gray-400 text-xs mb-2">Mail Us:</h3>
                <p className="text-gray-300 leading-relaxed">
                  Flipkart Internet Private Limited,<br />
                  Buildings Alyssa, Begonia &<br />
                  Clove Embassy Tech Village,<br />
                  Outer Ring Road, Devarabeesanahalli Village,<br />
                  Bengaluru, 560103,<br />
                  Karnataka, India
                </p>
              </div>

              <div>
                <h3 className="text-gray-400 text-xs mb-2">Social:</h3>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-white">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.059-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.977.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.977-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.977-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Second row with registered address */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="col-span-4"></div>
          <div className="col-span-1">
            <div className="border-l border-gray-700 pl-4">
              <h3 className="text-gray-400 text-xs mb-2">Registered Office Address:</h3>
              <p className="text-gray-300 leading-relaxed">
                Flipkart Internet Private Limited,<br />
                Buildings Alyssa, Begonia &<br />
                Clove Embassy Tech Village,<br />
                Outer Ring Road, Devarabeesanahalli Village,<br />
                Bengaluru, 560103,<br />
                Karnataka, India<br />
                CIN : U51109KA2012PTC066107<br />
                Telephone: <a href="tel:044-45614700" className="text-blue-400">044-45614700</a> / <a href="tel:044-67415800" className="text-blue-400">044-67415800</a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="flex items-center text-yellow-400 hover:underline">
              <span className="text-lg mr-1">⚡</span> Become a Seller
            </a>
            <a href="#" className="flex items-center text-yellow-400 hover:underline">
              <span className="text-lg mr-1">⚡</span> Advertise
            </a>
            <a href="#" className="flex items-center text-yellow-400 hover:underline">
              <span className="text-lg mr-1">⚡</span> Gift Cards
            </a>
            <a href="#" className="flex items-center text-yellow-400 hover:underline">
              <span className="text-lg mr-1">⚡</span> Help Center
            </a>
          </div>
          
          <div className="flex items-center">
            <span className="text-white mr-4">© 2007-2025 Flipkart.com</span>
            <div className="flex space-x-1">
              <img src="/api/placeholder/35/22" alt="Visa" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Mastercard" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Maestro" className="h-5" />
              <img src="/api/placeholder/35/22" alt="American Express" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Rupay" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Discover" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Paytm" className="h-5" />
              <img src="/api/placeholder/35/22" alt="PhonePe" className="h-5" />
              <img src="/api/placeholder/35/22" alt="UPI" className="h-5" />
              <img src="/api/placeholder/35/22" alt="Net Banking" className="h-5" />
            </div>
          </div>
        </div>
      </div>
    </footer>
    </div>
  );
}