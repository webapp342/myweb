// Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div>
      <h2>Ana Sayfa</h2>
      <p>Hoş geldiniz!</p>
      <Link to="/profile">
        <button>Profil Sayfasına Git</button>
      </Link>
      <Link to="/user-data">
        <button>Kullanıcı Verilerine Git</button>
      </Link>
    </div>
  );
};

export default Home;
