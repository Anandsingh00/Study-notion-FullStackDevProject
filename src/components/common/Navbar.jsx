import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import logo from "../../assets/Logo/Logo-Full-Light.png"
import  NavBarLinks  from '../../data/navbar-links'
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  //useSelector hook is used to read data from redux store
    const {token} = useSelector((state) => state.auth );
    const {user} = useSelector((state) => state.profile );
    const {totalItems} = useSelector((state) => state.cart);
    const location = useLocation();
    const matchRoute = (route) =>{
      return matchPath({path:route} , location.pathname);
    }
    // 58.00
  return (
    <div className='flex h-14 items-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-around'>
        {/* Image */}
        <Link to="/">
            <img src={logo} alt="Study Notion logo" width={160} height={32} loading='lazy' />
        </Link>

         {/*Nav Links  */}
         <nav>
            <ul className='flex flex-row gap-4 text-richblack-25'>
              {
                NavBarLinks.map( (link, index) => (
                  <li key={index} >
                    {
                      link.title === "Catalog" ? (<div></div>) : (
                        <Link to={link?.path}>
                            <p className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                              {link.title}
                            </p>
                        </Link>
                      )
                    }
                  </li>
                ))

              }
            </ul>
         </nav>

         {/* login/signup/buttons */}
         <div className='flex gap-x-4 items-center'>

         </div>



        </div>        
    </div>
  )
}

export default Navbar