import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
    company: '',
    registrationNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, formData);
      setMessage('✅ Registration successful! Redirecting...');
      setTimeout(() => navigate('/inputs'), 1500);
    } catch (err) {
      setMessage('❌ ' + (err.response?.data?.message || 'Registration failed.'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white border shadow-md rounded-xl p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Create Your Account</h2>

        {message && <div className="text-sm mb-4 text-center text-blue-600">{message}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {['email', 'password', 'username', 'company', 'registrationNumber'].map((field) => (
            <div key={field}>
              <label className="block mb-1 font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="w-full p-2 border rounded-md"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </section>
  );
}
