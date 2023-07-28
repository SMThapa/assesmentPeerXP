import { NavLink, useLocation  } from 'react-router-dom';
import img from '../asset/01.png';
import { useEffect, useState } from 'react';

export const Header = () => {

  const theUser = JSON.parse(localStorage.getItem('currentUser'))
  //to run useEffect on every path changed
  const {pathname} = useLocation()
  const [user, setUser] = useState(false)

  useEffect(()=>{
    if(theUser){
      setUser(true)
    }
  },[user, pathname, theUser])

  const handleLogout = () =>{
    localStorage.clear()
    setUser(false)
  }

  return (
    <div className='w-full h-20  flex justify-between items-center sm:px-12 p-5'>
        <NavLink to='/'>
          <img className='sm:h-10 h-8 w-full' src={img} alt="img" />
        </NavLink>
        {
          user ? 
          <div className='flex'>
            <h1>{theUser.username} |</h1>
            <button onClick={handleLogout} className='text-sm text-red-500'>&nbsp;Logout</button>
          </div>  :
          <NavLink to='/login'>
            <h1 className='text-lg text-blue-500'>Login</h1>
          </NavLink> 
        }
    </div>
  )
}
