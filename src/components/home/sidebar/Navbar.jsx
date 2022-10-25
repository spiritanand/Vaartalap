import React from 'react';
import userPic from "../../../images/Users/user.webp";
import {signOut} from "firebase/auth";
import {auth} from "../../../firebase.js";
import {useAuthCtx} from "../../../store/authContext.jsx";

function Navbar(props) {
  const currentUser = useAuthCtx();
  const displayName = currentUser.displayName;
  let displayAnagram = "";
  
  if (displayName)
	displayAnagram = displayName.split(" ")
								.reduce(
								  (
									nameAnagram,
									name
								  ) => nameAnagram + name[0].toUpperCase(), "");
  
  function handleLogout() {
	signOut(auth);
  }
  
  return (
	<div className = "navbar">
	  <span className = "logo">V</span>
	  <div className = "user">
		<img src = {currentUser.photoURL || userPic}
			 alt = ""
		/>
		<span>{displayAnagram || `U`}</span>
		<button onClick = {handleLogout}>Logout</button>
	  </div>
	</div>
  );
}

export default Navbar;