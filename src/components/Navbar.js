import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <NavLink to="/" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Eatify
      </NavLink>
      <NavLink to="/restaurant/1" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>
        Test Restaurant
      </NavLink>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {!user ? (
          <>
            <NavLink to="/login" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Login</NavLink>
            <NavLink to="/signup" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Signup</NavLink>
          </>
        ) : (
          <>
            <NavLink to="/cart" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Cart</NavLink>
            <NavLink to="/orders" style={({ isActive }) => ({ fontWeight: isActive ? 'bold' : 'normal' })}>Orders</NavLink>
            <span style={{ marginRight: '0.5rem' }}>{user?.name && `Hi, ${user.name}`}</span>
            <button onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 