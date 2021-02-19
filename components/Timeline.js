import { getCurrentUser } from './Profile'
import { useEffect, useState } from 'react'
import axios from 'axios'


const Timeline = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const [currentFeed, setCurrentFeed] = useState([])
    const [displayReading, setDisplayReading] = useState({})


    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser)
        }
        feed(thisUser.id).then(data => {
            let entries = data.data.entries
            console.log("what is here", data.data.entries)
            setCurrentFeed(entries)
            if(entries.some(entry =>entry.readingId)){
                entries.map(eachEntry=>{
                    console.log(eachEntry)
                    getReading(eachEntry.readingId).then(readingId=>{
                        setDisplayReading(readingId)
                    })
                })
            }
        })


    }, []);

    // const findIfReading = (eachEntry) => {
    //     if (eachEntry.readingId) {
    //         getReading(eachEntry.readingId).then(readingInfo => {
    //             console.log("reading info", readingInfo)
    //             setDisplayReading(readingInfo)
    //         })
    //     }
    // }





    const returnTimeline = currentFeed.map(entry => {
    // if(entry.readingId){
    //     getReading(entry.readingId).then(readingInfo=>{
    //         setDisplayReading(readingInfo)
    //     }) 
    // }
       

        return (
            <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" key={entry._id}>
                <div class="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                    <div class="flex items-center">
                        <h2 class="text-xl text-gray-800 font-medium mr-auto">{entry.date}</h2>
                    </div>
                    <p class="text-sm text-gray-700 mt-1">
                        {entry.body}
                    </p>
                    <div class="flex items-center justify-end mt-4 top-auto">
                        <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Favorite</button>
                        <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Edit</button>
                        {(entry.readingId === displayReading._id) && (
                            <div>
                                <img class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2"/>
                                <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
                            </div>
                        )}

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


export const getReading = (
    idx
) => {
    return axios.get(API_URL + 'reading/' + idx)
}

export default Timeline