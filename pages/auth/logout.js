import axios from 'axios';

import {setItem, getItem, removeItem} from '../../utilities/localStorage.utilities'

const API_URL="http://localhost:8080/api/auth/"

//logout the user
export const logout = () => {
    removeItem('user')
}