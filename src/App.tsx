import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import UserProfilePage from './UserProfilePage';
import UserData from './UserData';
import UserDetails from './UserDetails';
import { ExtendedWebAppUser } from './types';
import Home from './Hom';
import TapToEarn from './TapToEarn';
import { saveUserData } from './firestoreUtils';

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
      if (user) {
        setUsername(user.username || 'Kullanıcı adı yok');
        setUserId(user.id);
        setPhotoUrl(user.photo ? user.photo.big_file_id : 'default-profile-pic.png');
        await saveUserData(user);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    navigate('/tap-to-earn'); // Burada yönlendirmek istediğiniz sayfayı belirleyin
  }, [navigate]);

  return (
    <Router>
      <div>
        <h1>Vite + React</h1>
        <nav>
          <Link to="/">Ana Sayfa</Link>
          <Link to="/profile">Profil Sayfası</Link>
          <Link to="/user-data">Kullanıcı Verileri</Link>
          <Link to="/tap-to-earn">Oyna</Link>
          <Link to="/user-details">Kullanıcı Detayları</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<UserProfilePage username={username} userId={userId} photoUrl={photoUrl} />} />
          <Route path="/user-data" element={<UserData userId={userId.toString()} />} />
          <Route path="/tap-to-earn" element={<TapToEarn userId={userId.toString()} />} />
          <Route path="/user-details" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
