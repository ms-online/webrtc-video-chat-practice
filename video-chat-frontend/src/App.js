import { useEffect, useRef } from 'react';
import './App.css';
import { connectWithSocket } from './utils/wssConnection/wssConnection';

function App() {
  const firstRenderRef = useRef(true);
  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }
    connectWithSocket();
  }, []);

  return <div className='App'>video-chat-app</div>;
}

export default App;
