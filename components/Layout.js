import React, { useState, useEffect } from "react";
import Link from 'next/link'
import authHeader from '../utilities/authHeader.utilities'
import {getItem, removeItem} from '../utilities/localStorage.utilities'



const Layout = (props) => {
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

//   useEffect(function() {
//     console.log(window.localStorate);
// },[]);

  useEffect(() => {
    console.log(window.localStorage)
    // grab getCurrentuser from the auth service
    const user =  getCurrentUser();

    if (user) {
      // Set current user to the currentUser state
      setCurrentUser(user);

      // Check if the user.roles has "ROLE_ADMIN" return either true or false
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  
  const logOut = () => {
    setCurrentUser(undefined)
    logout()
  }

  
  let profUrl = null

  if (currentUser){
    // console.log('/userProfile/' + userProfile.id)
    profUrl = 'user/userProfile/' + currentUser.id 
  }

  return (
    <div>
      <nav >
        {/* Can't link to / need to figure out how to go home with */}
        <Link href="/" className="navbar-brand">
        <strong>TarotJournal</strong>  
        </Link>
        <div className="navbar-nav nav-tabs mr-auto">
          <li className="nav-item">
            <Link href="/"  className="nav-link">
            <a>Home</a>
            </Link>
          </li>
          {currentUser && (
            <li className="nav-item">
              {/* <Link href="profUrl" to={"/userProfile/[id]"} className="nav-link">
               {currentUser.username}'s Profile
              </Link> */}
            </li>
          )}
        </div>
        
        {currentUser ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href={profUrl} to={"/userProfile/[id]"} className="nav-link">
                {currentUser.username}
              </Link>
            </li>
            <li className="nav-item">
                <a href="/" className="nav-link" onClick={logOut}>
                  Logout
                </a>
              </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto">
              <li className="nav-item">
                  <Link href ="auth/login"to={"auth/login"} className="nav-link">
                      Login
                  </Link>
              </li>
              <li className="nav-item">
                  <Link href="/auth/register"to={'auth/register'} className="nav-link">
                  Sign Up
                  </Link>
              </li>
          </div>
        )}
      </nav>
      <div className="container mt-3">{props.children}</div>
    </div>
  );
};

//logout the user
export const logout = () => {
  removeItem('user')
}

//get current user
export const getCurrentUser = () => {
  return getItem('user')
}

//access Admins content
export const getAdminBoard = () => {
  return axios.get(API_URL + 'test/admin', {header: authHeader()})
}

export const userProfile = (
  idx
) => {
  return axios.get(API_URL + 'user/profile/' + idx)
}


export default Layout;