import React, { useState } from 'react'
import {Button} from 'reactstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Loginpage = () => {
    const nav = useNavigate()
    const [user, setUser] = useState({
        email:"",
        password:"",
        role:"user"
    })
    const [success, setSuccess] = useState("")
    const [error, setError] = useState("")
    const handleLogin = async() =>{
        try {
            const response = await axios.get(`http://localhost:3001/users`)
            const res = await response.data
            // console.log(res)
            const matchFound = res.find(data=> data.email === user.email && data.password === user.password)

            if (matchFound) {
                console.log("Success");
                setSuccess("");
                setTimeout(() => {
                    nav('/home')
                }, 0);
                setError("")
                setUser({
                    email:"",
                    password:"",
                    role:"user"
                })
            } else {
                console.log("Not success");
                setError("User doesn't exist. Kindly Signup...");
                setSuccess("")
                setUser({
                    email:"",
                    password:"",
                    role:"user"
                })
              }

        } catch (error) {
            console.error("The email or password you have entered is incorrect. Try again.",error)
        }
    }
    const handleChange = async(e)=>{
        const {name, value} = e.target
        setUser({
            ...user,[name]:value
        })
    }
  return (
    <div className='out'>
    <div className='in'>
        <h1>LOGIN</h1>
        <div><label>Email: </label><br/><input type='email' name='email' placeholder='Enter your email...'  value={user.email} onChange={handleChange} /></div><br/>
        <div><label>Password: </label><input type='password' name='password' placeholder='Enter your password...'  value={user.password} onChange={handleChange} /></div><br/>
        <div style={{display:"flex", justifyContent:"space-between",alignItems:"end"}}>
        <Button id='loginbutton' style={{flex:"1", backgroundColor:"rgb(60, 136, 89)"}} onClick={handleLogin}>Login</Button>
        <Button className='button' href='/register' style={{flex:"1"}}>Sign up</Button>
        </div><br/>
        {success && <p style={{ color: 'green' }}>{success}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <a href='/'>forgot password?</a>
        {/* <p>Not a existing user? <a href='/register'>Register here</a></p> */}
    </div>
    </div>
  )
}
