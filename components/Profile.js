import { useEffect, useState } from 'react'
//Helper funciton to get access to token for header
import { getItem } from '../utilities/localStorage.utilities'


const Profile = () => {
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        console.log(window.localStorage)
        // grab getCurrentuser from the auth service
        const thisUser = getCurrentUser();

        if (thisUser) {
            // Set current user to the currentUser state
            setCurrentUser(thisUser);

        }
    }, [currentUser]);


    return (

        <div className="container">

            {currentUser && (
                <div>
                    <header className="jumbotron">
                        <h3>
                            <strong>{currentUser.username}</strong>
                        </h3>
                    </header>
                    <p>
                        <strong>Token:</strong>{currentUser.accessToken.substring(0, 20)}...{" "}
                    </p>
                    <p>
                        <strong>Id: </strong>{currentUser.id}
                    </p>
                    <p>
                        <strong>Email: </strong>{currentUser.email}
                    </p>
                    {/* if current user has roles map through those roles */}
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <li key={index}>{role}</li>)
                    }
                </div>
            )}


        </div>
    )
}



//get current user
export const getCurrentUser = () => {
    return getItem('user')
}



export default Profile
