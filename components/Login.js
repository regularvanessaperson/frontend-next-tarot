import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Layout from './Layout'
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from 'axios';
import { useRouter } from 'next/router'

import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'


//Component
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

//Helper
// import { login } from '../pages/auth/login'
import { resMessage } from '../utilities/functions.utilities'

console.log(process.env)
const API_URL = process.env.NODE_ENV === 'development' ? process.env.NEXT_PUBLIC_REACT_APP_DEV_URL_USER : process.env.NEXT_PUBLIC_REACT_APP_PRO_URL_USER

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}


const Login = (props) => {
    const form = useRef()
    const checkBtn = useRef()
    const router = useRouter()
    //
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")

    //grab what is entered as our username
    const onChangeUsername = (e) => {
        const username = e.target.value
        setUsername(username)
    }

    //Store the password in our password state
    const onChangePassword = (e) => {
        const password = e.target.value
        setPassword(password)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        setMessage("")
        console.log("This is the API URL", API_URL)
        //validates all the fields
        form.current.validateAll()
        //validator stores errors and we can check if errors exist
        if (checkBtn.current.context._errors.length === 0) {
            
            login(username, password).then(
                (data) => {
                    setLoading(true)
                    window.location.replace("/")
                    // router.push('/entry/makeEntry')
                },
                (error) => {
                    //Setting loading to false and return the error
                    setLoading(false)
                    //checking all the data received from our backend
                    setMessage(resMessage(error))
                }
            )
        } else {
            setLoading(false)
        }

    }

    return (
        <div className="self-center">
            <div className="card card-container justify-self-auto">

                <Form onSubmit={handleLogin} ref={form}>
                    <FormGroup text="username">
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                        />
                    </ FormGroup>

                    <FormGroup text="password">
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </FormGroup>

                    <ButtonSpinner text="Login" login={loading} />

                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    {/*needs to be used for react validation to submit the form */}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
}


export const login = (username, password) => {
    console.log(API_URL)
    return axios
    .post(`${API_URL}/api/auth/signin`, {
        username,
        password
    })
    .then((response)=> {
        //Check if the response of user has accessToken
        if(response.data.accessToken){
            setItem('user', response.data)
        }
        return response.data
    })
}


export default Login