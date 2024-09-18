import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'reactstrap'

export const Registerpage = () => {
    const nav = useNavigate()
    const [register, setRegister] = useState({
        id:"",
        email:"",
        password:"",
        role:"user"
    })
    const [error, setError] = useState("")
    const [status, setStatus] = useState("")
    const registerClick = async () => {
        if (!register.email || !register.password) {
            setError("Either email or password is empty")
            setStatus("")
        }

        if (register.password.length <= 8) {
            setError("Password must be minimum of 8 characters long")
            setStatus("")
        }
        try {
            const response = await axios.get('http://localhost:3001/users')
            const res = await response.data
            const reg = {...register,id: res.length > 0 ? res.length+1 : 1}

            const matchFound = res.find(data=> data.email === register.email)
            if(matchFound){
                setStatus("User exist ")
                setError("")
                setTimeout(() => {
                    nav("/")
                }, 3000);
                setRegister({
                    email:"",
                    password:"",
                    role:"user"
                })
            }
            else{
                await axios.post(`http://localhost:3001/users`,reg)
                setStatus("Registered. Redirecting to login page...")
                setError("")
                setTimeout(() => {
                    nav("/")
                }, 3000);
                setRegister({
                    email:"",
                    password:"",
                    role:"user"
                })
            }
        } catch (error) {
            console.error(error);
        }
    }

    const registerChange = async(e) =>{
        const {name, value} = e.target
        setRegister({
            ...register,[name]:value
        })
    }
  return (
    <div className='out'>
    <div className='in'>
        <h1>REGISTER</h1>
        <div>
        <label>Email: </label><br/><input type='email' required name='email' placeholder='Enter your email...' value={register.email} onChange={registerChange}/><br/>
        </div><br/>
        <div>
        <label>Password:</label><br/><input type='password' required name='password' placeholder='Enter your password...' value={register.password} onChange={registerChange}/><br/>
        </div><br/>
        <Button className='button' onClick={registerClick}>Register</Button><br/>
        {error && <p style={{color:"red"}}>{error}</p>}
        {status && <p style={{color:"green"}}>{status}</p>}
        <p>Existing user? <a href='/'>Login here</a></p>
    </div>
    </div>
  )
}
