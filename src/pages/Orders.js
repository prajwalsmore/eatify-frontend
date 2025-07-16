import React, { useEffect, useState } from 'react';
import API from '../api/api';
import { toast } from 'react-hot-toast';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/api/orders');
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load orders.');
        toast.error('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading orders...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', padding: '1rem' }}>
      <h1>Order History</h1>
      {orders.length === 0 ? (
        <div>No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 20, marginBottom: 24, boxShadow: '0 2px 8px #eee' }}>
            <div style={{ marginBottom: 8 }}><strong>Order ID:</strong> {order._id}</div>
            <div style={{ marginBottom: 8 }}><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</div>
            <div style={{ marginBottom: 8 }}><strong>Total:</strong> ₹{order.total}</div>
            <div><strong>Items:</strong>
              <ul style={{ margin: 0, paddingLeft: 20 }}>
                {order.items.map((item, idx) => (
                  <li key={idx}>{item.name} - ₹{item.price} x {item.quantity}</li>
                ))}
              </ul>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders; 