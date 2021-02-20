import { getCurrentUser } from './Profile'
// import Reading from './Reading'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from './common/Button'

const MakeEntry = () => {
    const [entry, setEntry] = useState("")
    const [entryId, setEntryId] = useState("")
    const [reading, setReading] = useState("")
    const [viewReading, setViewReading] = useState("")
    const [currentUser, setCurrentUser] = useState(undefined)
    const router = useRouter()
    

    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
        if (reading !== "") {
            sendReadingInfo()
        }
        getTodaysEntry(thisUser.id).then((value)=>{
            if (value) {
                setEntryId(value.data._id)
                setEntry(value.data.body)
                setReading(value.data.readingId)
            }
        })
    }, []);

    // const goToEntry = () => {
    //     router.push("/entry/entry/[idx]");
    //   }
    

    const handleEntry = (e) => {
        e.preventDefault()
        console.log("we are handling this entry", entry)
        const body = entry
        if (reading) {
            const readingId = reading.id
            makeEntry(currentUser.id, body, readingId).then(newEntry=>{
                router.push({
                    pathname: `/entry/entry/[idx]`,
                    query: {idx: newEntry.data._id}
                })
            })
        } else {
            makeEntry(currentUser.id, body).then(newEntry=>{
                console.log("we are doing this", newEntry)
                router.push({
                    pathname: `/entry/entry/[idx]`,
                    query: {idx: newEntry.data._id}
                })
            })
        }


    }

    const onMakeEntry = (e) => {
        const entryText = e.target.value
        setEntry(entryText)
    }

    const handleReading = (e) => {
        // e.preventDefault()
        if (entry) {
            generateReading(entryId).then((reading) => {
                setReading(reading.data)
                router.replace('/entry/today')
                console.log(reading)
            })
            

        }

    }

    return (
        <div>
            <>
                {currentUser && (
                    <div>
                        <div class="heading text-center font-bold text-2xl m-5 text-gray-800">Welcome Back {currentUser.username}!</div>
                        <form onSubmit={handleEntry}>
                            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                                <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" value={entry} onChange={onMakeEntry} placeholder="Write a new journal entry..."></textarea>
                                <div class="buttons flex">
                                    {/* <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit">Save</button> */}
                                    <Button label="Save" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit"  />
                                </div>
                            </div>
                        </form>
                        <div>
                            <div>
                                <div>
                                    <h1 class="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Generate Daily Reading</h1>
                                    <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
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
                                                <Button label="Generate Reading" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value={reading} handleClick={(e)=> handleReading(entry.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {reading ? (
                                    <div class="flex flex-col justify-center items-center">
                                        <div class="md:flex shadow-lg  mx-5 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.firstCard.image} alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg ">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">{reading.firstCard.name}</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Past</p>
                                                </div>
                                                
                                                <p class="text-sm text-gray-700 mt-1" >
                                                    Description: {reading.firstCard.description}
                                                </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning: {reading.firstCard.meaning}
                                                </p>
                                               
                                            </div>
                                        </div>

                                        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.secondCard.image} alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">{reading.secondCard.name}</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Present</p>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Description: {reading.secondCard.description}
                                            </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning: {reading.thirdCard.meaning}
                                            </p>
                                            </div>
                                        </div>
                                        <div class="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img class="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.thirdCard.image} alt="bag" />
                                            <div class="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div class="flex items-center">
                                                    <h2 class="text-xl text-gray-800 font-medium mr-auto">{reading.thirdCard.name}</h2>
                                                    <p class="text-gray-800 font-semibold tracking-tighter">
                                                        Future</p>
                                                </div>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Description: {reading.thirdCard.description}
                                            </p>
                                                <p class="text-sm text-gray-700 mt-1">
                                                    Meaning:{reading.thirdCard.meaning}
                                            </p>
                                            </div>
                                        </div >
                                    </div>
                                ): (
                                    <div>No reading yet</div>
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

//get reading from current day
export const getTodaysEntry = (
    creator,
) => {
    return axios
        .get(API_URL + 'entry/date/'+new Date().toISOString().split('T')[0]+'/creator/'+creator)
        .catch((error) => {

            return null
        })
}


//create a new reading
export const generateReading = (
    entryId
) => {
    return axios
        .post(API_URL + 'reading', {
            entryId
        })
}



export const getReading = (
    idx
) => {
    return axios.get(API_URL + 'reading' + idx)
}



export default MakeEntry