import axios from 'axios'
//Helper funciton to get access to token for header
import authHeader from '../utilities/authHeader.utilities'

const API_URL= "http://localhost:8080/api/"

//Follow a user
export const feed = (
    idx
) => {
    return axios.put(API_URL + 'user/entry/feed/'+idx, {
        idx
    })
}