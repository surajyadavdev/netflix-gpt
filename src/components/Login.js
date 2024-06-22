import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import {createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';


const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null||'');
  const navigate = useNavigate();
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const dispatch = useDispatch();


  const handleButtonClick =()=>{
    // console.log(email.current.value);
    // setErrorMessage(password.current.value);
    // const email = email.current.value;
    // const password = passwordRef.current.value;
    // const fullName = fullNameRef.current?.value || '';

    // Validate form data
    // const message = checkValidData(email, password, fullName);

    // validate form data 
    const message = checkValidData(email.current.value,password.current.value);

    // const message = checkValidData(email.current.value,password.current.value || name.current.value ,email.current.value,password.current.value);
    setErrorMessage(message);
    if(message) return;
    if(!isSignInForm){
      //Signup Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://avatars.githubusercontent.com/u/12824231?v=4",
            }).then(() => {
              // Profile updated!
              // ...
              // const {uid,email,displayName,photoURL} = user;//old user so update with auth
              const {uid,email,displayName,photoURL} = auth.currentUser;
              dispatch(addUser({
                uid:uid,
                email:email,
                displayName:displayName,
                photoURL:photoURL}));
              navigate("/browse");
            }).catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message)
            });
            // console.log(user);// it will give me user object

          // navigate("/browse")

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage) 
        });

    }
    else{
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value, 
        password.current.value
      )
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          console.log(user);
          navigate("/browse")// main page 

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });

    }


  }
  const toggleSignInForm =()=>{
    setIsSignInForm(!isSignInForm)
  };
  return (
    <div>
        <Header/>
      <div className='absolute'>
        <img 
          src ="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt = "Logo"
        />      
        </div>
        <form onSubmit={(e)=>e.preventDefault()} className="w-4/12 absolute p-12 bg-black my-32 mx-auto right-0 left-0 text-white bg-opacity-70" >
          <h1 className='font-bold text-3xl py-4'>
            {isSignInForm?"Sign In":"Sign Up"}
            </h1>
            {!isSignInForm && (
            <input 
            ref={name}
            type="text" 
            placeholder="Full Name" 
            className="p-2 my-2 w-full bg-gray-700 rounded-[4px]"
          />
          )}
          <input 
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-2 my-2 w-full bg-gray-700 rounded-[4px]"
          />
          <input 
            ref={password}
            type="password" 
            placeholder="Password" 
            className="p-2 my-2 w-full bg-gray-700 rounded-[4px]"
          />
          <p className='text-red-500 font-bold text-lg py-2'>{errorMessage}</p>

          <button className='p-3 my-4 bg-red-700 w-full rounded-lg' onClick={handleButtonClick}>{isSignInForm?"Sign In":"Sign Up"}</button>
          <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>
            {isSignInForm
            ? "New to Netflix? Sign up now."
            : "Already registered? Sign In Now."} </p>

        </form>
    
    </div>
  )
}

export default Login