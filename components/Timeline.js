import { getCurrentUser } from './Profile'
import { useEffect, useState } from 'react'
import Button from './common/Button'
import { useRouter } from 'next/router'
import axios from 'axios'
import e from 'cors'


const Timeline = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentFeed, setCurrentFeed] = useState([])
    const [displayReading, setDisplayReading] = useState({})
    const [newState, setNewState]= useState(false)
    const router = useRouter()

    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser)
        }
        feed(thisUser.id).then(data => {
            let entryArray = data.data.entries
            console.log("what is here", entryArray)
            setCurrentFeed(entryArray)
        })
        setNewState(true)
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
        // setNewState(false)
        router.replace('/entry/timeline')
    }







const returnTimeline = currentFeed.map(entry => {


    return (
        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" key={entry._id}>
            <div class="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                <div class="flex items-center">
                    <h2 class="text-xl text-gray-800 font-medium mr-auto">{entry.date}</h2>
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
                    <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" key={entry._id} label={(entry.favorite === true) ? 'Unfavorite': 'Favorite'} handleClick={()=> makeFavorite(entry._id )}/>
                    <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Edit' handleClick={()=> goEdit(entry._id)} />
                    <Button className="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline" label='Delete' />
                </div>
            </div>
        </div>
    )
})


return (
    <div>
        <div>
            <div>
                <h1 class="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Generate Daily Reading</h1>
                {returnTimeline}
            </div>
        </div>
    </div>
)
}



const API_URL = "http://localhost:8000/api/"
//Follow a user
export const feed = (
    idx
) => {
    return axios.get(API_URL + 'user/entry/feed/' + idx, {
        idx
    })
}

export const favorite = (
    _id
) => {
    return axios.put(API_URL+"entry/favorite", {
        _id
    })
}

export default Timeline