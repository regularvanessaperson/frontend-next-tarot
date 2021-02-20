import React, { useEffect, useState } from 'react'
import { Link } from 'next/link'
import { useRouter } from 'next/router'
import { getItem } from '../utilities/localStorage.utilities'
import Button from './common/Button'
import axios from 'axios'
import Cors from 'cors'

const API_URL="http://localhost:8000/api"


const UserProfile = () => {
  
    const [currentUser, setCurrentUser] = useState(undefined);
    const [profile, setProfile] = useState([])
    const [current, setCurrent] = useState(false)
    const [id, setId] = useState('')

    const router = useRouter()
    // console.log(router.query);
    const {idx} = router.query

    useEffect(() => {
        const newIdx = window.location.href.split('/').pop();
        if(!newIdx) {
            return
        }
        console.log(newIdx)
        if(newIdx) {
            setId(idx)
        }
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
        userProfile(newIdx).then((response) => {
            console.log(response)
            const userInfo = response.data
            // console.log("Ids: ", userInfo._id, currentUser.id)
            if (thisUser && userInfo._id === thisUser.id) {
                setCurrent(true)
            }
            const profile = getUserProfile(userInfo)
            setProfile(profile)
        })
        
    }, []);


    function getUserProfile(userInfo) {
        return (
            <div className="container">

                <div className="card">
                    <div>
                        <h2 className="center-top nav-link">
                            <strong>User Information</strong>
                        </h2>
                        <h3>
                            <strong className="nav-link">{userInfo.username}</strong>
                        </h3>
                    </div>
                    <div>
                        <h2>Favorite Posts </h2>
                    </div>
                </div>
                <div className="card">
                    <h4 className="nav-link">
                        <strong>Favorites</strong>
                    </h4>
                    {userInfo.favorites.map((favorite, index) => {
                        if (favorite.length === 0) {
                            return <div className="nav-link">You have no favorites yet.</div>
                        } else {
                            return (
                                <div> Someday the favorites will be here</div>
                                // <Entry key={favorite.id} favorite={favorite} />
                            )
                        }
                    })}
                </div>
                {/* Links to followed, follows, favorites */}
            </div>
        )
    }

    return <div>
        <div>
            {profile}
        </div>



    </div>
}




//get user profile
export const userProfile = (
    idx
) => {
    return axios.get(API_URL + '/user/profile/' + idx)
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}

export default UserProfile