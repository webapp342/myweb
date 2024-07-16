import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

import WebApp from '@twa-dev/sdk';

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = WebApp.initDataUnsafe?.user; // Kullanıcı bilgilerini al
    if (user) {
      setUsername(user.username || 'Kullanıcı adı yok');
    } else {
      setUsername('Kullanıcı adı alınamadı');
    }
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <h2>Kullanıcı Adı: {username}</h2>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </div>
      <div className="card">
        <button onClick={() => WebApp.showAlert(`Hello World! Current count is ${count}`)}>
          Show Alert
        </button>
      </div>
    </>
  );
}

export default App;
