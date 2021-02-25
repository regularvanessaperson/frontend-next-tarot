import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator"
import axios from 'axios';
import { useRouter } from 'next/router'
import {setItem, getItem, removeItem} from '../utilities/localStorage.utilities'

//Component
import FormGroup from './common/FormGroup'
import ButtonSpinner from './common/ButtonSpinner'

//Helper
// import { register } from '../pages/auth/register'
import {resMessage} from '../utilities/functions.utilities'

import {login} from './Login'
import { getCurrentUser } from "./Layout";

const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_DEV_URL_USER : process.env.REACT_APP_PRO_URL_USER;

//Function given to react-validator
const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

//Function validates username
const vusername = (value) => {
    if (value.length <= 3 || value.length >= 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 3 and 20 characters.
            </div>
        )
    }
}

//Functions that validates password
const vpassword = (value) => {
    if(value.length < 6 || value.length >= 40) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 6 and 40 characters.
            </div>
        )
    }
}

//Function that validates email and checks if it is in the correct format
const vemail = (value) => {
    if(!isEmail(value)){
        return(
            <div className="alert alert-danger" role="alert">
                This is not a valid email.
            </div>
        )
    }
}

const Register = () => {
    const form = useRef()
    const checkBtn = useRef()
    const router = useRouter()
    //
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [successful, setSuccessful] = useState(false)
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

    //Store the password in our password state
    const onChangeEmail = (e) => {
    const email = e.target.value
        setEmail(email)
    }

    const handleSignup = (e) => {
        e.preventDefault()

        setMessage("")
        setSuccessful(false)

        //validates all the fields
        form.current.validateAll()

        //validator stores errors and we can check if errors exist
        if(checkBtn.current.context._errors.length === 0){
            register(username, email, password).then(
                (response) => {
                    setMessage(response.data.message)
                    setSuccessful(true)
                    
                    //if successful, login the new user and redirect to home page
                    login(username, password).then(
                        () => {
                            router.replace("/auth/login")
                        }
                    )
                },
                (error) => {
                    setMessage(resMessage(error))
                    setSuccessful(false)
                }
            )
        }
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">

                <Form onSubmit={handleSignup} ref={form}>
                    <FormGroup text="username">
                        <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required, vusername]}
                        />
                    </FormGroup>
                    <FormGroup text="email">
                        <Input
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required, vemail]}
                        />
                    </FormGroup>
                    <FormGroup text="password">
                        <Input
                            type="password"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required, vpassword]}
                        />
                    </FormGroup>
                    <ButtonSpinner text="Sign Up" />

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
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

export const register =(username, email, password) => {
    return axios
    .post(`${API_URL}/auth/signup`, {
        username,
        email,
        password
    })
}



export default Register