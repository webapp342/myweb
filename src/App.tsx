import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import UserProfilePage from './UserProfilePage';
import UserData from './UserData';
import UserDetails from './UserDetails';
import { ExtendedWebAppUser } from './types';
import TapToEarn from './TapToEarn';
import { saveUserData } from './firestoreUtils';

function App() {
  const [username, setUsername] = useState('Kullanıcı adı yok');
  const [userId, setUserId] = useState<number>(0);
  const [photoUrl, setPhotoUrl] = useState('default-profile-pic.png');

  useEffect(() => {
    const fetchData = async () => {
      const user = WebApp.initDataUnsafe?.user as ExtendedWebAppUser;

      if (user) {
        setUsername(user.username || 'Kullanıcı adı yok');
        setUserId(user.id);
        setPhotoUrl(user.photo ? user.photo.big_file_id : 'default-profile-pic.png');
        await saveUserData(user);
        sessionStorage.setItem('userData', JSON.stringify(user));
      } else {
        const savedUserData = sessionStorage.getItem('userData');
        if (savedUserData) {
          const parsedUser = JSON.parse(savedUserData);
          setUsername(parsedUser.username || 'Kullanıcı adı yok');
          setUserId(parsedUser.id);
          setPhotoUrl(parsedUser.photo ? parsedUser.photo.big_file_id : 'default-profile-pic.png');
        }
      }
    };

    fetchData();
  }, []);

  return (
    <Router basename="/myweb">
      <div>
        <Link to="/user-data">
          <button>Kullanıcı Verilerine Git</button>
        </Link>
        <Link to="/tap-to-earn">
          <button>Oyna</button>
        </Link>

        <Routes>
          <Route path="/" element={<Navigate to="/profile" />} />
          <Route path="/profile" element={<UserProfilePage username={username} userId={userId} photoUrl={photoUrl} />} />
          <Route path="/user-data" element={<UserData userId={userId.toString()} />} />
          <Route path="/tap-to-earn" element={<TapToEarn userId={userId.toString()} />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
