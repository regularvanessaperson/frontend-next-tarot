import React, { useEffect, useState } from 'react'
import { Link } from 'next/link'
import { useRouter } from 'next/router'
import { getItem } from '../utilities/localStorage.utilities'
import Button from './common/Button'
import axios from 'axios'
import Cors from 'cors'

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_USER : process.env.REACT_APP_PRO_URL_USER;


const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [profile, setProfile] = useState([])
    const [currentFeed, setCurrentFeed] = useState([])
    const [current, setCurrent] = useState(false)
    const [id, setId] = useState('')

    const router = useRouter()
    const { idx } = router.query

    useEffect(() => {
        const newIdx = window.location.href.split('/').pop();
        if (!newIdx) {
            return
        }
        if (newIdx) {
            setId(idx)
        }
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
        userProfile(newIdx).then((response) => {
            const userInfo = response.data
            if (thisUser && userInfo._id === thisUser.id) {
                setCurrent(true)
            }
            const profile = getUserProfile(userInfo)
            setProfile(profile)
        })
        feed(thisUser.id).then(data => {
            let entryArray = data.data.entries
            let favoriteArray = []

            favoriteArray = entryArray.map((entry) => {
                if (entry.favorite === true) {
                    return entry
                }
            })
            setCurrentFeed(favoriteArray)
        })
    }, []);

    const goEdit = (value) => {
        router.push({
            pathname: '/entry/entry/[idx]',
            query: { idx: value },
        })
    }

    const makeFavorite = (value) => {
        // value.preventDefault()
        favorite(value)
        setCurrent(true)
        router.push('/entry/timeline')
    }


    const handleDelete = (value) => {
        deleteEntry(value).then(() => {
            router.push("/entry/timeline")
        })
    }


    const favoritesFeedShow = currentFeed.map((entry, index) => {
        if (entry !== undefined) {
            return (
                <div className="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" key={entry._id}>
                    <div className="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                        <div className="flex items-center space-between">
                            <h2 className="text-xl text-gray-800 font-medium mr-auto">{new Date(entry.date).toDateString()}</h2>
                            {(entry.readingId) && (
                                <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                                    <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.firstCard.image} alt="bag" />
                                    <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.secondCard.image} alt="bag" />
                                    <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.thirdCard.image} alt="bag" />
                                </div>
                            )}
                        </div>
                        <p className="text-sm text-gray-700 mt-1">
                            {entry.body}
                        </p>
                        <div className="flex items-center justify-end mt-4 top-auto">
                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" key={entry._id} label={(entry.favorite === true) ? 'Unfavorite' : 'Favorite'} handleClick={() => makeFavorite(entry._id)} />
                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Edit' handleClick={() => goEdit(entry._id)} />
                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Delete' handleClick={() => handleDelete(entry._id)} />
                        </div>
                    </div>
                </div>)
        }


    })




    const getUserProfile = (userInfo) => {
        return (
            <div >

                <div >
                    <div className="text-center ">
                        <h1 className="text-center text-2xl center-top nav-link">
                            <strong>User Information</strong>
                        </h1>
                        <h2>
                            <strong className="text-center text-1xl center-top">Username: {userInfo.username}</strong>
                        </h2>
                    </div>
                </div>
                <div className="card">
                    <h4 className="nav-link">
                        <h1 className="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Favorites</h1>
                    </h4>
                </div>
                {/* Links to followed, follows, favorites */}
            </div>
        )
    }

    return (
        <div>
            <div>
                {profile}
                {favoritesFeedShow}
            </div>
        </div>
    )
}




//get user profile
export const userProfile = (
    idx
) => {
    return axios.get(`${API_URL}/api/user/profile/${idx}`)
}

//get current user
export const getCurrentUser = () => {
    return getItem('user')
}

//Follow a user
export const feed = (
    idx
) => {
    return axios.get(`${API_URL}/api/user/entry/feed/${idx}`, {
        idx
    })
}


export const favorite = (
    _id
) => {
    return axios.put(`${API_URL}/api/entry/favorite`, {
        _id
    })
}

//delete an entry
export const deleteEntry = (
    _id
) => {
    return axios
        .delete(`${API_URL}/api/entry/delete`, {
            data: { _id: _id }
        })
}

export default UserProfile