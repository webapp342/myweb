import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import UserProfilePage from './UserProfilePage';
import UserData from './UserData'; // UserData bileşenini içe aktar
import { ExtendedWebAppUser } from './types';

function App() {
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;
    if (user) {
      setUsername(user.username || 'Kullanıcı adı yok');
      setUserId(user.id);
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
          <Link to="/user-data">Kullanıcı Verileri</Link> {/* UserData sayfasına yönlendiren link */}
        </nav>
        <Routes>
          <Route path="/" element={
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
          } />
          <Route path="/profile" element={<UserProfilePage username={username} userId={userId} photoUrl={photoUrl} />} />
          <Route path="/user-data" element={<UserData userId={userId.toString()} />} /> {/* UserData bileşenini ekle */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
