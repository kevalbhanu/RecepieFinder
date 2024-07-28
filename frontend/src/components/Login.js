import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css'

export default function Login() {
  const navigate = useNavigate();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const handleLogin = async()=>{
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', {email,password});
      if(response){
      localStorage.setItem("user",JSON.stringify(response.data.user));
      localStorage.setItem("token",JSON.stringify(response.data.token));
      navigate('/');
      }

    } catch (error) {
      console.log(error);
      alert(error.response.data.message)
    }
  }


  return (
    <div className='register-container'>
      <h1>Login</h1>
      <input 
        className='register-input'
        type="text" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        className='register-input'
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button className='register-button' onClick={handleLogin}>Login</button>
    </div>
  )
}
