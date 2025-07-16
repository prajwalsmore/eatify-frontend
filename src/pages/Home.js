import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const res = await API.get('/api/restaurants');
        setRestaurants(res.data);
      } catch (err) {
        setError('Failed to load restaurants.');
      } finally {
        setLoading(false);
      }
    };
    fetchRestaurants();
  }, []);

  if (loading) return <div style={{ textAlign: 'center', marginTop: '4rem' }}>Loading restaurants...</div>;
  if (error) return <div style={{ textAlign: 'center', marginTop: '4rem', color: 'red' }}>{error}</div>;

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '1rem' }}>
      <h1 style={{ textAlign: 'center' }}>Eatify Frontend is Ready!</h1>
      <p style={{ textAlign: 'center' }}>Welcome to Eatify – Your food delivery platform.</p>
      <p style={{ textAlign: 'center' }}>Start building your delicious experience 🚀</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', marginTop: '2rem' }}>
        {restaurants.length === 0 ? (
          <div>No restaurants found.</div>
        ) : (
          restaurants.map((rest) => (
            <div key={rest._id} className="restaurant-card" style={{ border: '1px solid #eee', borderRadius: 8, padding: 20, width: 260, boxShadow: '0 2px 8px #eee' }}>
              <h2>{rest.name}</h2>
              <p>{rest.cuisine}</p>
              <p>{rest.rating} ★</p>
              <p>{rest.deliveryTime} mins</p>
              <Link to={`/restaurant/${rest._id}`}>View Menu</Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home; 