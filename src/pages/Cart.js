import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, total } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      await API.post('/api/orders', {
        items: cartItems.map(({ _id, quantity }) => ({ _id, quantity })),
      });
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      toast.error('Failed to place order');
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success('Item removed from cart');
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Placing your order...</div>;

  return (
    <div style={{ maxWidth: 600, margin: '2rem auto', padding: '1rem' }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map((item) => (
              <li key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee', padding: '1rem 0' }}>
                <div>
                  <strong>{item.name}</strong> <br />₹{item.price} x {item.quantity}
                </div>
                <button onClick={() => handleRemove(item._id)} style={{ background: '#ef4444', color: '#fff', border: 'none', borderRadius: 4, padding: '0.5rem 1rem', cursor: 'pointer' }}>Remove</button>
              </li>
            ))}
          </ul>
          <div style={{ textAlign: 'right', marginTop: '1rem' }}>
            <strong>Total: ₹{total}</strong>
          </div>
          {error && <div style={{ color: 'red', marginTop: '1rem' }}>{error}</div>}
          <button onClick={handlePlaceOrder} style={{ marginTop: '2rem', padding: '0.75rem 2rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer', float: 'right' }} disabled={loading}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart; 