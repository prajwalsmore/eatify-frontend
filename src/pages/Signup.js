import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/api/auth/signup', { name, email, password });
      login(res.data);
      toast.success('Account created. Welcome!');
      navigate('/');
    } catch (err) {
      toast.error('Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '4rem auto', padding: '2rem', border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Signup Page</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required style={{ width: '100%', marginBottom: 12, padding: 8 }} />
        <button type="submit" disabled={loading} style={{ width: '100%', padding: 10, background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 4 }}>
          {loading ? 'Signing up...' : 'Signup'}
        </button>
      </form>
    </div>
  );
};

export default Signup; 