import { useEffect } from 'react';
import { useContext } from 'react';
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";
import { callLogout } from '@/apiCall';

const Topbar = () => {
  const { user, dispatch } = useContext(AuthContext);

  const signOut = async () => {
    await callLogout(dispatch);
    sessionStorage.removeItem("user");
    window.location.href = '/sign-in';
  };

  useEffect(() => {
    console.log('Current user:', user);
  }, [user]);

  return (
    <section className='topbar'>
        <div className='flex-between py-4 px-5'>
          <Link to='/' className='flex gap-3 items-center'>
            <img 
              className='custom-icon'
              src='/assets/icon/appIcon.svg' 
              alt='logo'
            />
            <span className='icon-text'>Fakebook</span>
          </Link>
          <div className="flex gap-4">
            <Button variant='ghost' className="shad-button_ghost" onClick={signOut} >
              <img className="custom-icon" src='/assets/icon/logout.svg' alt='logout' />
            </Button>
            {user && (
            <Link to={`/profile/${user.email}`} className='flex gap-3 items-center'>
              <img className="custom-icon" src={user.imageUrl || "/assets/icon/profile-placeholder.svg"} alt='profile' />
            </Link>
          )}
          </div>
        </div>
    </section>
  )
}

export default Topbar;