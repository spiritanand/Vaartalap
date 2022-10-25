import {
  signInWithEmailAndPassword
} from "firebase/auth";
import React, {useState} from 'react';
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  auth,
} from "../firebase.js";


const Login = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const nav = useNavigate();
  
  const handleUserLogin = async (e) => {
	e.preventDefault();
	setLoggingIn(true);
	const email = e.target[0].value;
	const password = e.target[1].value;
	
	try {
	  await signInWithEmailAndPassword(auth, email, password);
	  nav("/");
	} catch (err) {
	  const errorCode = err.code;
	  setErrMessage(errorCode.slice(5));
	  setLoggingIn(false);
	}
  }
  
  return (
	<div className = "container">
	  <div className = "wrapper formWrapper">
		<span className = "logo">Vaartalap</span>
		<span className = "title">Login</span>
		<form onSubmit = {handleUserLogin}>
		  <input type = "email"
				 placeholder = {`Email`}
		  />
		  <input type = "password"
				 placeholder = {`Password`}
		  />
		  <button disabled={loggingIn}>Sign In</button>
		  {errMessage &&
			<span className = "errMessage">{errMessage}. Could not login 😔</span>}
		</form>
		<p>Don't have an account? <Link to = "/register">Register.</Link></p>
	  </div>
	</div>
  );
};

export default Login;
