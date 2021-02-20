import { getCurrentUser } from './Profile'
// import Reading from './Reading'
import { useRouter } from 'next/router'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Button from './common/Button'

const EditEntry = () => {
    const [entry, setEntry] = useState("")
    const [entryId, setEntryId] = useState("")
    const [reading, setReading] = useState("")
    const [currentUser, setCurrentUser] = useState(undefined)
    const router = useRouter()
    const [disabledForm, setDisabledForm] = useState(true)
    useEffect(() => {
        const newIdx = window.location.href.split('/').pop();
        const thisUser = getCurrentUser()
        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);
        }
        getEntry(newIdx).then((value) => {
            if (value) {
                setEntryId(value.data._id)
                setEntry(value.data.body)
                setReading(value.data.readingId)
            }
        })
    }, []);


    const handleEntry = (e) => {
        const body = entry
        updateEntry(entryId, body)
    }
    const onMakeEntry = (e) => {
        const entryText = e.target.value
        setEntry(entryText)
    }

    const handleReading = (e) => {
        // e.preventDefault()
        if (entry) {
            generateReading(entryId).then((response) => {
                setReading(response.data)
                router.replace("/entry/entry/" + entryId)
            })
        }

    }

    const enableEditing = () => {
        setDisabledForm(false)
        router.replace("/entry/entry/" + entryId)
    }

    return (
        <div>
            <>
                {currentUser && (
                    <div>
                        <div className="heading text-center font-bold text-2xl m-5 text-gray-800">Welcome Back {currentUser.username}!</div>


                        {disabledForm && (
                            <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                                <fieldset disabled="disabled">
                                    <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none w-full" spellCheck="false" value={entry} onChange={onMakeEntry} placeholder="Write a new journal entry..."></textarea>
                                </fieldset>
                                <div className="buttons flex">
                                    {/* <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit">Save</button> */}
                                    <Button handleClick={enableEditing} label="Edit Entry" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit" />
                                </div>
                            </div>
                        )
                        }
                        {!disabledForm && (
                            <form onSubmit={handleEntry}>
                                <div className="editor mx-auto w-10/12 flex flex-col text-gray-800 border border-gray-300 p-4 shadow-lg max-w-2xl">
                                    <textarea className="description bg-gray-100 sec p-3 h-60 border border-gray-300 outline-none" spellCheck="false" value={entry} onChange={onMakeEntry} placeholder="Write a new journal entry..."></textarea>
                                    <div className="buttons flex">
                                        {/* <button class="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value="Submit">Save</button> */}
                                        <Button label="Update" className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" handleClick={handleEntry} />
                                    </div>
                                </div>
                            </form>
                        )
                        }


                        <div>
                            <div>
                                <div>
                                    <h1 className="text-center text-2xl font-bold p-4 bg-gray-800 text-gray-400">Generate Reading</h1>
                                    <div className="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                        <div className="w-full md:w-3/3 px-4 py-4 bg-white rounded-lg">
                                            <div className="flex items-center">
                                                <h2 className="text-xl text-gray-800 font-medium mr-auto">Three Card Spread</h2>
                                            </div>
                                            <div className="text-sm text-gray-700 mt-1">
                                                The three card spread will be generated below. You can ask a question for the day or simply read and write about your interpretation.
                                            <p>1. The first card represents past events or the subject you want to inquire about.</p>
                                                <p>2. The second card represents an action or solution.</p>
                                                <p>3. The third card represents the outcome.</p>
                                            </div>
                                            <div className="grid   justify-center mt-5 top-auto">
                                                <Button disableCondition={reading} label={!reading ? "Generate Reading" : "Reading for this entry has been generated"} className="btn border border-indigo-500 p-1 px-4 font-semibold cursor-pointer text-gray-200 ml-auto bg-indigo-500" type="submit" value={reading} handleClick={(e) => handleReading(entry.id)} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {reading ? (
                                    <div className="flex flex-col justify-center items-center">
                                        <div className="md:flex shadow-lg  mx-5 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.firstCard.image} alt="bag" />
                                            <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg ">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl text-gray-800 font-medium mr-auto">{reading.firstCard.name}</h2>
                                                    <p className="text-gray-800 font-semibold tracking-tighter">
                                                        Past</p>
                                                </div>

                                                <p className="text-sm text-gray-700 mt-1" >
                                                    Description: {reading.firstCard.description}
                                                </p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Meaning: {reading.firstCard.meaning}
                                                </p>

                                            </div>
                                        </div>

                                        <div className="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.secondCard.image} alt="bag" />
                                            <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl text-gray-800 font-medium mr-auto">{reading.secondCard.name}</h2>
                                                    <p className="text-gray-800 font-semibold tracking-tighter">
                                                        Present</p>
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Description: {reading.secondCard.description}
                                                </p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Meaning: {reading.thirdCard.meaning}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="md:flex shadow-lg  mx-6 md:mx-auto my-5 max-w-lg md:max-w-2xl h-page" >
                                            <img className="h-full w-full md:w-1/3  object-cover rounded-lg rounded-r-none pb-5/6" src={reading.thirdCard.image} alt="bag" />
                                            <div className="w-full md:w-2/3 px-4 py-4 bg-white rounded-lg">
                                                <div className="flex items-center">
                                                    <h2 className="text-xl text-gray-800 font-medium mr-auto">{reading.thirdCard.name}</h2>
                                                    <p className="text-gray-800 font-semibold tracking-tighter">
                                                        Future</p>
                                                </div>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Description: {reading.thirdCard.description}
                                                </p>
                                                <p className="text-sm text-gray-700 mt-1">
                                                    Meaning:{reading.thirdCard.meaning}
                                                </p>
                                            </div>
                                        </div >
                                    </div>
                                ) : (
                                        <div></div>
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
export const updateEntry = (
    _id,
    body
) => {
    return axios
        .put(API_URL + 'entry/edit', {
            _id,
            body
        })
}

//get reading from current day
export const getEntry = (
    id,
) => {
    return axios
        .get(API_URL + 'entry/' + id)
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

// //create a new reading
// export const generateFiveReading = (
//     entryId
// ) => {
//     return axios
//         .post(API_URL + 'five/reading', {
//             entryId
//         })
// }


export const getReading = (
    idx
) => {
    return axios.get(API_URL + 'reading' + idx)
}

export default EditEntry