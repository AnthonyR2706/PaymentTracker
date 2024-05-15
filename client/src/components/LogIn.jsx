import { React, useState, useEffect } from 'react'
import axios from "axios"

const initialState = {
    username: "",
    password: "",
    confirmPassword: ""
}


const LogIn = ({isLoggedIn, setLoggedIn, getAccountId, setAccountId}) => {
    const [form, setForm] = useState(initialState)
    const [isSignup, setIsSignup] = useState(false)
    const [error, setError] = useState()

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        let link = 'http://localhost:4000/'
        link += (isSignup ? 'signup' : 'login') +`?username=${form.username}&password=${form.password}&confirmPassword=${form.confirmPassword}`
        await axios.get(link)
        .then(res => {
            setError(res.data)
            if(res.data == "success") {
                console.log("here")
                handleSignUp(link)
            }
        })
    }

    const handleSignUp = async(link) => {
        console.log(link)
        await axios.post(link)
        .then(res => {
            console.log(res.data)
        })
    }

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
        console.log(form)
    }

  return (
    <div>
        <center>
            {isSignup ? "Signup" : "Sign In"}
        </center>
            <form onSubmit = {handleSubmit}>
                <label htmlFor = "username">
                    Username
                </label>
                <input 
                    name = "username"
                    type = "text"
                    placeholder = "Username"
                    onChange = {handleChange}
                    required
                />
                <label htmlFor = "password">
                    Password
                </label>
                <input 
                    name = "password"
                    type = "password"
                    placeholder = "Password"
                    onChange = {handleChange}
                    required
                />
                {isSignup && (
                    <div className = "authFormFieldsContentI">
                        <label htmlFor = "password">
                            Confirm Password
                        </label>
                        <input 
                            name = "confirmPassword"
                            type = "password"
                            placeholder = "Confirm Password"
                            onChange = {handleChange}
                            required
                        />
                </div>
                )}
                <div className = "authFormFieldsContentB">
                    <button>{isSignup ? "Sign Up" : "Sign In"}</button>
                </div>
            </form>
            <div className = "authFormFieldsChange">
                <center>
                    {isSignup ? "Already signed up?" : "Don't have an account?"}
                    <p className = "authFromFieldsSwitch" onClick = {switchMode}>
                        {isSignup ? "Sign In Instead" : "Sign Up Instead"}
                    </p>
                    <p>{error}</p>
                </center>
            </div>
    </div>
  )
}

export default LogIn