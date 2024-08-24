
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../image/image.png';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:6700/api/auth/login', { email, pass: password });
      localStorage.setItem('token', response.data.token); // Save token
      localStorage.setItem('rol', response.data.rol);
      localStorage.setItem('names', response.data.names);
      toast.success('Login successful!', {
        position: "top-center",
        autoClose: 3000,
      });
      window.location.href = "/Dashboard"; 
    } catch (error) {
      toast.error('Login failed. Please check your credentials.', {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <section
    style={{ backgroundImage: `url(${logo})`, height: '100vh' }}
    className="bg-center max-h-screen bg-no-repeat bg-cover bg-gray-700 bg-blend-multiply"
  >
    <div className='h-screen'>
      <div className='h-screen max-w-sm mx-auto grid items-center'>
        <div className='p-6 shadow-gray-500 rounded-lg bg-slate-400'>
          <div className='text-center'>
            <h1 className='p-6 text-5xl text-white font-bold'>Login</h1>
          </div>
          <form onSubmit={handleLogin}>
            <div className='mb-5'>
              <label className='block mb-2 text-sm font-bold text-white'>Your Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                placeholder="Email"
                required
              />
            </div>
            <div className='mb-5'>
              <label className='block mb-2 text-white w-full text-sm font-bold'>Your Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
                required
                placeholder="Password"
              />
            </div>
            <div className='flex justify-center py-7'>
              <button
                type="submit"
                className='text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5'
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </section>
  );
};

export default Login;
