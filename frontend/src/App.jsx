import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import axios from 'axios';
// Layouts
import HomeLayout from './pages/User/HomeLayout'
import AuthLayout from './pages/Auth/AuthLayout.jsx';
// Auth Protection
import ProtectedRoute from './context/protectedRoute';
import AuthRoute from './context/authRoute';
// Auth forms
import LoginForm from './pages/Auth/LoginForm.jsx';
import RegisterForm from './pages/Auth/RegisterForm.jsx';
// User Pages
import { Home, Group, CreateGroup, Profile, UpdateProfile, CreatePost, PostDetail, EditPost } from './pages/User/Pages';
// Css styles

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

function App() {
  return (
    <main className='flex h-screen'>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
        <Routes>
          {/* Public Routes */}
            <Route element={<AuthRoute element={<AuthLayout />} />}>
              <Route path="/sign-in" element={<LoginForm />} />
              <Route path="/sign-up" element={<RegisterForm />} />
            </Route>
          {/* User Routes */}
            <Route element={<ProtectedRoute element={<HomeLayout />} />}>
              <Route index element={<Home />} />
              <Route path='/group' element={<Group />} />
              <Route path='/create-group' element={<CreateGroup />} />
              <Route path='/create-post' element={<CreatePost />} />
              <Route path='/update-post/:id' element={<EditPost />} />
              <Route path='/posts/:id' element={<PostDetail />} />
              <Route path='/profile/:id/*' element={<Profile />} />
              <Route path='/update-profile/:id/' element={<UpdateProfile />} />
            </Route>
          {/* Admin Routes */}
        </Routes>
    </main>
  );
}

export default App;
