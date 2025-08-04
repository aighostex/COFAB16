import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import api from '../api/api';




const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    

    // API call
    try {
      const res = await api.post('/login', { 
        email, 
        password 
      });
      localStorage.setItem('adminAuth', res.data.token);


      const redirectTo = location.state?.from || '/dashboard';
      navigate(redirectTo, { replace: true });

    } catch (err) {
      setError('Network Error or invalid credentials');
      console.error('Admin login error:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block mb-1 font-medium">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#ad3435] text-white py-2 px-4 rounded-md hover:bg-[#ce2e31]"
          >
            Login
          </button>
           {/* <Link 
          to="/admin-register" 
          className=""
        >
          REGISTER NOW
        </Link> */}
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;