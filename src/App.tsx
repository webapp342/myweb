import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import UserProfilePage from './UserProfilePage';
import { ExtendedWebAppUser } from './types';

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number>(0); // userId'yi number olarak tanımlayın
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
    if (user) {
      setUsername(user.username || 'Kullanıcı adı yok');
      setUserId(user.id); // id'yi direkt kullanabilirsiniz
      setPhotoUrl(user.photo ? user.photo.big_file_id : 'default-profile-pic.png');
    }
  }, []);

  return (
    <Router>
      <div>
        <h1>Vite + React</h1>
        <nav>
          <Link to="/">Ana Sayfa</Link>
          <Link to="/profile">Profil Sayfası</Link>
        </nav>
        <Routes>
          <Route path="/" element={<div>Hoş geldiniz!</div>} />
          <Route path="/profile" element={<UserProfilePage username={username} userId={userId} photoUrl={photoUrl} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
