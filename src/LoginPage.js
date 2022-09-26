import React, {useState} from 'react';
import "./LoginPage.css";
import {Link , useNavigate } from "react-router-dom";
import {auth} from "./firebase"

function LoginPage() {
  const [email,setEmail]=useState('');
  const [password, setPassword]=useState('');

  const navigate=useNavigate();

  const signin = e =>
  {
    e.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .then((auth)=> 
    {
    if(auth){
      navigate('/');
    }
  })
    .catch(error => alert(error.message))
  }
  
  const register= e =>{
    e.preventDefault();
    auth
        .createUserWithEmailAndPassword(email,password)
        .then((auth)=>{
       if(auth){
        navigate('/');
       }
    })
        .catch( error => alert(error.message))
  }


  return (
    <div className='loginpage'>
        <Link to="/">
        <img className="logo " src='./amazonlogo2.png'/>
        </Link>
        <div className='loginpage__info'>
            <h3 className='sign-in'>Sign-in</h3>
            <form>
                <h5>E-mail</h5>
                <input className="input__space" type="text" value={email} onChange= {e => setEmail(e.target.value)}/>
                <h5>Password</h5>
                <input className="input__space" type="password" value={password} onChange={e=> setPassword(e.target.value)}/>
                <p></p>
                <button type="submit" className='login__button1' onClick={signin}>Sign In</button>
                <p className='login__terms'>By signing-in you agree to the Amazon Clone Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.</p>
                <button className='login__button2' onClick={register}>Create your Amazon Account</button>
            </form>
        </div>
        

    </div>
  )
}

export default LoginPage