import React from 'react';
import { auth,provider } from '../../config/firebase.js';
import {signInWithPopup} from 'firebase/auth';
import { useNavigate ,Navigate} from 'react-router-dom';
import { UseGetinfo } from '../../hooks/UseGetinfo.js';
import './sign.css'
export default function Sign() {
    const navigate=useNavigate();
    const {isauth}=UseGetinfo
    const signup=async()=>{
       const results=await signInWithPopup(auth,provider);
       const userinfo={
        userId:results.user.uid,
        name:results.user.displayName,
        profile:results.user.photoURL,
        isauth:true,
       };
       localStorage.setItem("auth",JSON.stringify(userinfo));
       navigate('/expense-tracker');
    }
    if(isauth){
      return <Navigate to='/expense-tracker'/>
    }
  return (
    <div>
      <div className='login-page'>
        <p>Sign in with Google to Continue</p>
        <button className='signin-button' onClick={signup}>Sign in</button>
      </div>
    </div>
  )
}
