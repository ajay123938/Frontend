import Header from '../Header/Header'
import './Login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
    const [username,setusername] = useState('');
  const [password,setpassword] = useState('');
const  handleSubmit = (e)=>{
  
  e.preventDefault();
  const formData = {
    username:username,
    password:password
  }



  fetch('https://backend-wqs5.onrender.com/login',{

    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(formData)

  })

  .then(res => res.json())
  .then(data => {
    if(data.accessToken){
    console.log(data)
    navigate('/studentPortal')
    }
    
}
)
  .catch(err => console.error(err));
  
}
    
   
  return (
      <>
 

      <Header logOut={false}/>
      <div class="login-container">
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Username" required value={username} onChange={(e)=>setusername(e.target.value)}/>
      <input type="password" placeholder="Password" required value={password} onChange={(e)=>setpassword(e.target.value)}/>
      <input type="submit" value="Sign In"/>
    </form>
   
  </div>
  
      </>
  )
}
