import React , {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login.css'

export default function Register() {
  const navigate = useNavigate();
    const [username,setUsername]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

   const handleRegister = async ()=>{
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', {username,email,password});
      console.log(response);
      localStorage.setItem("user",JSON.stringify(response.data.response));
      localStorage.setItem("token",JSON.stringify(response.data.token));
      navigate('/');
    } catch (error) {
      console.error(error);
      alert(error.response.data.message);
    }
   }

  return (
    <div className='register-container'>
      <h1>Register</h1>
      <input 
        className='register-input'
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
       <input 
        className='register-input'
        type="email" 
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
      <button className='register-button' onClick={handleRegister}>Register</button>
    </div>
 
     
  )
}
