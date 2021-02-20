import DayPicker, { DateUtils } from 'react-day-picker'
import 'react-day-picker/lib/style.css';
import { getCurrentUser } from './Profile'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { data } from 'autoprefixer'

const Calendar = () => {
    const [dates, setDates] = useState([])
    const [dateLinks, setDateLinks] = useState({})
    const [currentUser, setCurrentUser] = useState(undefined)
    const modifierStyles = {
        journalDay: {
            color: 'white',
            backgroundColor: '#ffc107'
        }
    }

    useEffect(() => {
        const thisUser = getCurrentUser()
        if (thisUser) {
            //Set current user to the currentUser state
            setCurrentUser(thisUser)
        }
        getMonthsEntry(thisUser.id, new Date().toISOString().split('T')[0]).then(value => {

            if (value) {
                //returns value for month
                let modifiers = {}
                let theDates = []
                let theDateLinks = {}
                value.data.forEach(data => {
                    //returns data for calendar
                    const id = data._id
                    const entryDate = new Date(data.date)
                    theDates.push(entryDate)
                    theDateLinks[entryDate.toISOString().split('T')[0]] = id
                })
                modifiers['journalDay'] = theDates[1]
                setDates(theDates)
                setDateLinks(theDateLinks)
            }
        })
    }, []);

    const renderDay = (day) => {
        const date = day.getDate()
        const links = dateLinks
        const trimmedDay = day.toISOString().split('T')[0]
        const dateStyle = {
            position: 'absolute',
            color: 'lightgray',
            bottom: 0,
            right: 0,
            fongSize: 20,
        }
        const birthdayStyle = { fontSize: '0.8em', textAlign: 'left' }
        const cellStyle = {
            height: 60,
            width: 60,
            position: 'relative'
        }
        //links to the day
        return (
            <div style={cellStyle}>
                <div style={dateStyle}>{date}</div>
                {links[trimmedDay] && (
                    <div style={birthdayStyle}>
                        <div>
                            <Link href={'/entry/entry/'+links[trimmedDay]} to='/entry/entry/[idx]'>🔮</Link>
                        </div>
                    </div>
                )}
            </div>
        )
    }


    return (
        <div>
            <>
                {currentUser && (
                    <div>
                        <div className='heading text-center font-bold text-2x1 m-5 text-gray-800 h-page'>Calendar</div>
                        {dates && (
                            <div>
                                <div>
                                    <DayPicker renderDay={renderDay} selectedDays={dates} modifierStyles={modifierStyles} />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </>
        </div>
    )


}

const API_URL = 'http://localhost:8000/api/'

//get a months worth of entrys
export const getMonthsEntry = (
    creator,
    theDate
) => {
    return axios
        .get(API_URL + 'entry/month/' + theDate + '/creator/' + creator)
        .catch((error) => {
            return null
        })
}


export default Calendar