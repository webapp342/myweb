import React from 'react';
import Profile from './Profile';

interface UserProfilePageProps {
  username: string;
  userId: number; // Burayı number olarak tanımlayın
  photoUrl: string;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ username, userId, photoUrl }) => {
  return (
    <div>
      <h1>Profil Sayfası</h1>
      <Profile username={username} userId={userId} photoUrl={photoUrl} />
    </div>
  );
};

export default UserProfilePage;
