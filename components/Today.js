import { getCurrentUser } from './Profile'
// import Reading from './Reading'
import { Router, useRouter } from 'next/router'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from './common/Button'

const Today = () => {
    const [entry, setEntry] = useState("")
    const [reading, setReading] = useState("")
    const [viewReading, setViewReading] = useState("")
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
        if (reading !== "") {
            sendReadingInfo()
        }
    }, []);



    const handleEntry = (e) => {
        console.log("we are handling this entry")
        const body = entry
        if (reading) {
            const readingId = reading.id
            makeEntry(currentUser.id, body, readingId)
            // setEntry(entry)
        } else {
            console.log("we are doing this")
            makeEntry(currentUser.id, body)
            // setEntry(entry)
        }


    }
    const onMakeEntry = (e) => {
        const entryText = e.target.value
        setEntry(entryText)
        console.log(entry)
    }

    const createReading = (e) => {
        if (entry) {
            generateReading(entry._id)
            setReading(reading)
            router.push("/entry/entry/[idx]")
            console.log(reading)

        }

    }

    const sendReadingInfo = () => {
        getReading(reading._id).then(currentReading => {
            setViewReading(currentReading)
        })
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
                                    {/* <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit">Save</button> */}
                                    <Button label="Save" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit" />
                                </div>
                            </div>
                        </form>
                        <div>
                            <div>
                                <div>
                                    <h1 class="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Generate Daily Reading</h1>
                                    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-64" >
                                        <div class="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                                            <div class="flex items-center">
                                                <h2 class="text-xl text-gray-800 font-medium mr-auto">Three Card Spread</h2>
                                                <p class="text-gray-800 font-semibold tracking-tighter">
                                                    top right corner</p>
                                            </div>
                                            <div class="text-sm text-gray-700 mt-1">
                                                The three card spread will be generated below. You can ask a question for the day or simply read and write about your interpretation.
                                            <p>1. The first card represents past events or the subject you want to inquire about.</p>
                                                <p>2. The second card represents an action or solution.</p>
                                                <p>3. The third card represents the outcome.</p>
                                            </div>
                                            <div class="grid   justify-center mt-5 top-auto">
                                                <Button label="Generate Reading" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" handleClick={createReading} />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {reading && (
                                    <div class="flex flex-col justify-center items-center">
                                        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-64" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">{viewReading.firstCard.name}</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Past</p>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Description: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                            </div>
                                        </div>

                                        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-64" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">Card Name</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Present</p>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Description: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                            </div>
                                        </div>
                                        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-64" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">Card Name</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Future</p>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Description: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning: Lorem, ipsum dolor sit amet consectetur Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequ adipisicing elit. Amet veritatis ipsam reiciendis numquam tempore commodi ipsa suscipit laboriosam, sit earum at sequi.
                                            </p>
                                            </div>
                                        </div >
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                )}
            </>
        </div >
    )
}





const API_URL = "http://localhost:8000/api/"

//create a new reading
export const makeEntry = (
    creator,
    body,
    readingId
) => {
    return axios
        .post(API_URL + 'entry/make', {
            creator,
            body,
            readingId
        })
}


//create a new reading
export const generateReading = (
    entryId
) => {
    return axios
        .post(API_URL + 'reading', {
            entryId,
            date,
            firstCard,
            secondCard,
            thirdCard
        })
}

export const getReading = (
    idx
) => {
    return axios.get(API_URL + 'reading' + idx)
}

export default Today