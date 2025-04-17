'use client'; // Ensure this is a client-side component

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Make the API call to login the admin
        const response = await fetch('http://192.168.1.42:3001/snapbazzar/adminlogin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.ok) {
          // On successful login, show success message and redirect to dashboard
          alert('Login successful');
          router.push('/Dashboard');
        } else {
          // On error, show the error message
          alert(data.error || 'Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
        alert('An error occurred during login');
      }
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-100 flex items-center justify-center relative overflow-hidden">
      {/* Background animation */}
      <div className="absolute inset-0 flex justify-center items-center opacity-30 animate-slideInFromLeft">
        <div className="flex gap-4">
          <div className="w-32 h-32 bg-blue-500 rounded-lg animate-float delay-300"></div>
          <div className="w-32 h-32 bg-red-500 rounded-lg animate-float delay-500"></div>
          <div className="w-32 h-32 bg-green-500 rounded-lg animate-float delay-700"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-cardGlow">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
