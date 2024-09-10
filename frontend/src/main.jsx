import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/authContext.jsx';
import { PostProvider } from './context/postContext.jsx';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './global.css';
import { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <PostProvider>
        <App />
        <Toaster/>
      </PostProvider>
    </AuthContextProvider>
  </BrowserRouter>
);