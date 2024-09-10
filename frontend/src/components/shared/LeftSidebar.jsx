import { useEffect } from 'react';
import { useContext } from 'react';
import { Link, NavLink, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { AuthContext } from "@/context/authContext";
import { sidebarLinks } from '@/constants';
import { callLogout } from '@/apiCall';

const LeftSidebar = () => {
  const { pathname} = useLocation();
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
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
            <img 
              className='custom-icon-full'
              src='/assets/icon/appIcon.svg' 
              alt='logo'
            />
          <span className='icon-text-full'>Fakebook</span>
        </Link>
        <Link to={`/profile/${user.email}`} className='flex gap-3 items-center'>
          <img 
            src={user.imageUrl || '/assets/icon/profile-placeholder.svg'} 
            alt="profile"
            className='custom-icon'
          />
          <div className='flex flex-col'>
            <p className='body-bold icon-text'>
              {user.name}
            </p>
            <p className='small-regular text-light-3'>
              {user.email}
            </p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link) =>{
            const isActive = pathname === link.route;
            return (
              <li key={link.label} className= {`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                <NavLink 
                  className='flex gap-4 items-center p-4'
                  to={link.route}>
                  <img 
                    src={link.imgURL}
                    alt={link.label} 
                    className={`group-hover:invert-white ${isActive && 'invert-white'}`}
                  />
                  {link.label}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
      <Button variant='ghost' className="shad-button_ghost" onClick={signOut}>
        <img className="custom-icon" src='/assets/icon/logout.svg' alt='logout' />
        <p className='small-medium lg:base-medium'>Logout</p>
      </Button>
    </nav>
  )
}

export default LeftSidebar
