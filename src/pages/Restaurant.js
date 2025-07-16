import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';
import { useCart } from '../context/CartContext';

const Restaurant = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const res = await API.get(`/api/restaurants/${id}`);
        setRestaurant(res.data);
      } catch (err) {
        setError('Failed to load restaurant.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurant();
  }, [id]);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading restaurant...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'red' }}>{error}</div>;
  if (!restaurant) return null;

  return (
    <div style={{ maxWidth: 800, margin: '2rem auto', padding: '1rem' }}>
      <h1>{restaurant.name}</h1>
      <p>{restaurant.cuisine} | {restaurant.rating} ★ | {restaurant.deliveryTime} mins</p>
      <h2 style={{ marginTop: '2rem' }}>Menu</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', marginTop: '1rem' }}>
        {restaurant.menu && restaurant.menu.length > 0 ? (
          restaurant.menu.map((dish) => (
            <div key={dish._id} style={{ border: '1px solid #eee', borderRadius: 8, padding: 20, width: 240, boxShadow: '0 2px 8px #eee' }}>
              <h3>{dish.name}</h3>
              <p>{dish.description}</p>
              <p>₹{dish.price}</p>
              <button onClick={() => addToCart(dish)} style={{ marginTop: 10, padding: '0.5rem 1rem', background: '#4f46e5', color: '#fff', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <div>No menu items found.</div>
        )}
      </div>
    </div>
  );
};

export default Restaurant; 