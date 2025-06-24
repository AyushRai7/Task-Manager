import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const { name, email, password } = form;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.post('/signup', form);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center">
      <form
        className="w-[23%] mx-auto mt-20 p-6 bg-gray-800 rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-white text-xl font-bold mb-6 text-center">Signup</h2>

        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChange}
            required
            placeholder='John Doe'
            className="shadow-xs bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
            required
            placeholder="name@example.com"
            className="shadow-xs bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
            required
            className="shadow-xs bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
        >
          Signup
        </button>
      </form>
    </div>
  );
}
