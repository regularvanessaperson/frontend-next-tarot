import React, { useEffect, useState } from 'react'
import { Link } from 'next/link'
import { useRouter } from 'next/router'
import { getItem } from '../utilities/localStorage.utilities'
import Button from './common/Button'
import axios from 'axios'
import Cors from 'cors'

const API_URL = "http://localhost:8000/api"


const UserProfile = () => {

    const [currentUser, setCurrentUser] = useState(undefined);
    const [profile, setProfile] = useState([])
    const [currentFeed, setCurrentFeed] = useState([])
    const [current, setCurrent] = useState(false)
    const [id, setId] = useState('')

    const router = useRouter()
    // console.log(router.query);
    const { idx } = router.query

    useEffect(() => {
        const newIdx = window.location.href.split('/').pop();
        if (!newIdx) {
            return
        }
        console.log(newIdx)
        if (newIdx) {
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
        feed(thisUser.id).then(data => {
            let entryArray = data.data.entries
            console.log("what is here", entryArray)
            setCurrentFeed(entryArray)
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
        console.log("what's the value", value)
        setCurrent(true)
        router.push('/entry/timeline')
    }


    const handleDelete = (value) => {
        deleteEntry(value).then(() => {
            router.push("/entry/timeline")
        })
    }


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
                    {currentFeed.map((favorite, index) => {
                        if (favorite.favorite === true) {
                            return (
                                <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" key={entry._id}>
                                    <div class="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                                        <div class="flex items-center space-between">
                                            <h2 class="text-xl text-gray-800 font-medium mr-auto">{new Date(entry.date).toDateString()}</h2>
                                            {(entry.readingId) && (
                                                <div className="holder mx-auto w-10/12 grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
                                                    <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.firstCard.image} alt="bag" />
                                                    <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.secondCard.image} alt="bag" />
                                                    <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6 tracking-tighter" src={entry.readingId.thirdCard.image} alt="bag" />
                                                </div>
                                            )}
                                        </div>
                                        <p class="text-sm text-gray-700 mt-1">
                                            {entry.body}
                                        </p>
                                        <div class="flex items-center justify-end mt-4 top-auto">
                                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" key={entry._id} label={(entry.favorite === true) ? 'Unfavorite' : 'Favorite'} handleClick={() => makeFavorite(entry._id)} />
                                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Edit' handleClick={() => goEdit(entry._id)} />
                                            <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Delete' handleClick={() => handleDelete(entry._id)} />
                                        </div>
                                    </div>
                                </div>
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

//Follow a user
export const feed = (
    idx
) => {
    return axios.get(API_URL + '/user/entry/feed/' + idx, {
        idx
    })
}


export const favorite = (
    _id
) => {
    return axios.put(API_URL + "/entry/favorite", {
        _id
    })
}

//delete an entry
export const deleteEntry = (
    _id
) => {
    console.log("this should be the id for axios", _id)
    return axios
        .delete(API_URL + "/entry/delete", {
            data: { _id: _id }
        })
}

export default UserProfile