import React, {useState} from 'react';
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import {
  doc,
  setDoc
} from "firebase/firestore";
import {
  Link,
  useNavigate
} from "react-router-dom";
import {
  auth,
  storage,
  db
} from "../firebase.js"
import addAvatar from "../images/addAvatar.png"

const Register = () => {
  const [errMessage, setErrMessage] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const nav = useNavigate();
  
  const handleUserRegistration = async (e) => {
	e.preventDefault();
	setErrMessage("");
	setLoggingIn(true);
	const displayName = e.target[0].value.trim();
	const email = e.target[1].value.trim();
	const password = e.target[2].value.trim();
	const avatarFile = e.target[3].files[0];
	
	if (!displayName) {
	  setErrMessage("Enter a valid display name.")
	  setLoggingIn(false);
	  return;
	}
	
	try {
	  const res = await createUserWithEmailAndPassword(auth, email, password);
	  const uid = res.user.uid;
	  
	  const storageRef = ref(storage, displayName);
	  
	  const uploadTask = uploadBytesResumable(storageRef, avatarFile);
	  uploadTask.on(
		(err) => {
		  const errorCode = err.code;
		  setErrMessage(errorCode.slice(5));
		  setLoggingIn(false);
		},
		() => {
		  getDownloadURL(uploadTask.snapshot.ref)
			.then(async (downloadURL) => {
			  await updateProfile(res.user, {
				displayName,
				photoURL: downloadURL,
			  });
			  
			  await setDoc(doc(db, "users", uid), {
				uid     : uid,
				displayName,
				email,
				photoURL: downloadURL,
			  });
			  
			  await setDoc(doc(db, "userChats", uid), {});
			  
			  nav("/");
			});
		}
	  );
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
		<span className = "title">Register</span>
		<form onSubmit = {handleUserRegistration}>
		  <input type = "text"
				 placeholder = "Display Name"
		  />
		  <input type = "email"
				 placeholder = {`Email`}
		  />
		  <input type = "password"
				 placeholder = {`Password`}
		  />
		  <input type = "file"
				 name = "avatarFile"
				 id = "avatarFile"
				 placeholder = "avatar"
				 required
		  />
		  <label htmlFor = "avatarFile">
			<img src = {addAvatar}
				 alt = "avatar-icon"
			/>
			<span>Add an avatar</span>
		  </label>
		  <button disabled = {loggingIn}>Sign up</button>
		  {errMessage &&
			<span className = "errMessage">{errMessage}. Could not register 😔</span>}
		</form>
		<p>Have an account? <Link to = "/login">Login.</Link></p>
	  </div>
	</div>
  );
};

export default Register;
