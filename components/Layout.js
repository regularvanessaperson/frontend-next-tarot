import React, { useState, useEffect } from "react";
import Link from 'next/link'
import { getItem, removeItem } from '../utilities/localStorage.utilities'
import { useRouter } from "next/router";



const Layout = (props) => {
  // const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const router = useRouter()

  useEffect(() => {

    // grab getCurrentuser from the auth service
    const user = getCurrentUser();
    if (user) {
      // Set current user to the currentUser state
      setCurrentUser(user);
   
    }
  }, []);

  const logOut = () => {
    
    logout()
    setCurrentUser(undefined)
    // router.push("/")
  }


  return (

    <div> {currentUser ? (
      <div className="flex flex-wrap bg-gray-100 w-full h-screen bg-gradient-to-tr from-green-400 to-blue-500 ">
        <div className="w-3/12 bg-white rounded p-3 shadow-lg ">
          <div className="flex items-center space-x-4 p-2 mb-5">
            <Link href="/" to={"/"}>
              <h4>Tarot Journal</h4>
            </Link>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/entry/makeEntry" to={"/entry/makeEntry"}>
                <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                  <span className="text-gray-600">
                  </span>
                  <span>Make New Entry</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/entry/timeline" to={"/entry/timeline"}>
                <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                  <span className="text-gray-600">
                  </span>
                  <span>Timeline</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/entry/calendar" to={"/entry/calendar"}>
                <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                  <span className="text-gray-600">
                  </span>
                  <span>Calendar View</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href={"/user/userProfile/" + currentUser.id} to="/user/userProfile/[idx]">
                <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                  <span className="text-gray-600">
                  </span>
                  <span>{currentUser.username} Profile</span>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/"  >
                <a onClick={logOut} className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                  <span className="text-gray-600">
                  </span>
                  <span>Logout</span>
                </a>
              </Link>
            </li>
          </ul>
        </div>


        <div className="w-9/12 bg-gradient-to-tr from-green-400 to-blue-500">
          <div className="p-4 text-gray-500">
            {props.children}
          </div>
        </div>
      </div >

    ) : (
        <div>
          <div className="flex flex-wrap bg-gray-100 w-full h-screen" >
            <div className="w-3/12 bg-white rounded p-3 shadow-lg">
              <div className="flex items-center space-x-4 p-2 mb-5">
                <Link href="/" to={"/"}>
                  <h4>Tarot Journal</h4>
                </Link>
              </div>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/auth/login" to={"/auth/login"} >
                    <a href="" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                      <span className=" text-gray-600">
                      </span>
                      <span>Login</span>
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" to={'/auth/register'}>
                    <a href="#" className="flex items-center space-x-3 text-gray-700 p-2 rounded-md font-medium hover:bg-gray-200 focus:bg-gray-200 focus:shadow-outline">
                      <span className="text-gray-600">
                      </span>
                      <span>Signup</span>
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="w-9/12 bg-gradient-to-tr from-green-400 to-blue-500">
              <div className="p-4 text-gray-500">
                {props.children}
              </div>
            </div>
          </div >


        </div>
      )}
    </div>

  )
};

//logout the user
export const logout = () => {
  removeItem('user')
}

//get current user
export const getCurrentUser = () => {
  return getItem('user')
}



export const userProfile = (
  idx
) => {
  const API_URL = "http://localhost:8000/"//get user profile
  return axios.get(API_URL + 'user/profile/' + idx)
}


export default Layout;