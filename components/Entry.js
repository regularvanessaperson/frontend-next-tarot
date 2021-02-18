import { getCurrentUser } from './Profile'
// import Reading from './Reading'
import React, { useEffect, useState } from 'react'

const Entry = () => {
    const [entry, setEntry] = useState("")
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
    }, []);

    const onMakeEntry = (e) => {
        const entryText = e.target.value
        setEntry(entryText)
    }

    const handleEntry = (e) => {
        const favorite = false
        makeEntry(currentUser.id, entry, favorite)
    }

    return (
        <div>
            <>
                {currentUser && (

                    <div>
                        <div class="heading text-center font-bold text-2xl m-5 text-gray-800">Date</div>
                        <form onSubmit={handleEntry}>
                            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                                <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" value={entry} onChange={onMakeEntry} placeholder="Write a new journal entry..."></textarea>
                                <div class="buttons flex">
                                    <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit">Save</button>
                                </div>
                            </div>
                        </form>
                        <div>
                            <div>
                                <h1 class="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Generate Daily Reading</h1>

                                <div class="flex flex-col justify-center items-center">


                                    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64" >
                                        <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                        <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                            <div class="flex items-center">
                                                <h2 class="text-xl text-gray-800 font-medium mr-auto">Your Travel Buddy</h2>
                                                <p class="text-gray-800 font-semibold tracking-tighter">
                                                    only $48</p>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-4">
                                                Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                                     </p>
                                            <div class="flex items-center justify-end mt-4 top-auto">
                                                <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Delete</button>
                                                <button class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2">Edit</button>
                                                <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64" >
                                        <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                        <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                            <div class="flex items-center">
                                                <h2 class="text-xl text-gray-800 font-medium mr-auto">Your Travel Buddy</h2>
                                                <p class="text-gray-800 font-semibold tracking-tighter">
                                                    only $48</p>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-4">
                                                Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                                     </p>
                                            <div class="flex items-center justify-end mt-4 top-auto">
                                                <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Delete</button>
                                                <button class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2">Edit</button>
                                                <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-40 max-w-lg md:max-w-2xl h-64" >
                                        <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                        <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                            <div class="flex items-center">
                                                <h2 class="text-xl text-gray-800 font-medium mr-auto">Your Travel Buddy</h2>
                                                <p class="text-gray-800 font-semibold tracking-tighter">
                                                    only $48</p>
                                            </div>
                                            <p class="text-sm text-gray-700 mt-4">
                                                Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                                     </p>
                                            <div class="flex items-center justify-end mt-4 top-auto">
                                                <button class="bg-white text-red-500 px-4 py-2 rounded mr-auto hover:underline">Delete</button>
                                                <button class=" bg-gray-200 text-blue-600 px-2 py-2 rounded-md mr-2">Edit</button>
                                                <button class=" bg-blue-600 text-gray-200 px-2 py-2 rounded-md ">Publish</button>
                                            </div>
                                        </div>
                                    </div >
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </div >
    )
}





const API_URL = "http://localhost:8080/api/"

//create a new post
export const makeEntry = (
    creator,
    date,
    body,
    readingId,
    favorite
) => {
    return axios
        .post(API_URL + "entry/make", {
            creator,
            date,
            body,
            readingId,
            favorite
        })
}


export default Entry