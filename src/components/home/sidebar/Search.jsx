import React, {useState} from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  doc
} from "firebase/firestore";
import {useAuthCtx} from "../../../store/authContext.jsx";
import {db} from "../../../firebase.js";
import searchIcon from "../../../images/search.png"
import {
  CHAT_ACTIONS as chatActions,
  useChatCtx
} from "../../../store/chatContext.jsx";
import calcChatId from "../../../utils/calcChatId.js";

function Search(props) {
  const currentUser = useAuthCtx();
  const {dispatch} = useChatCtx();
  const [searchedUserName, setSearchedUserName] = useState("");
  const [queriedUser, setQueriedUser] = useState(null);
  const [err, setErr] = useState(false);
  
  const handleKey = async (e) => {
	if (e.code === "Enter")
	  await handleSearch();
  }
  
  const handleSearch = async () => {
	setQueriedUser(null);
	const usersRef = collection(db, "users");
	const q = query(usersRef, where("displayName", "==", searchedUserName));
	try {
	  const querySnapshot = await getDocs(q);
	  querySnapshot.forEach((doc) => {
		setQueriedUser(doc.data());
	  });
	} catch (err) {
	  setErr(true);
	}
  }
  
  const handleSelectUser = async () => {
	// check whether chat exists, if not create.
	const combinedId = calcChatId(currentUser.uid, queriedUser.uid);
	
	try {
	  const res = await getDoc(doc(db, "chats", combinedId));
	  
	  if (!res.exists()) {
		// create chat in firestore db
		await setDoc(doc(db, "chats", combinedId), {messages: []})
		
		// update the userChats of both the users
		await updateDoc(doc(db, "userChats", currentUser.uid), {
		  [combinedId + ".userInfo"]: {
			uid        : queriedUser.uid,
			displayName: queriedUser.displayName,
			photoURL   : queriedUser.photoURL,
		  },
		  [combinedId + ".date"]    : serverTimestamp(),
		});
		await updateDoc(doc(db, "userChats", queriedUser.uid), {
		  [combinedId + ".userInfo"]: {
			uid        : currentUser.uid,
			displayName: currentUser.displayName,
			photoURL   : currentUser.photoURL,
		  },
		  [combinedId + ".date"]    : serverTimestamp(),
		});
	  }
	  
	  // dispatching reducer to make the other user active chat.
	  dispatch({
		type   : chatActions.CHANGE_USER,
		payload: queriedUser,
	  });
	  
	} catch (err) {
	}
	setSearchedUserName("");
	setQueriedUser(null);
  }
  
  return (
	<div className = "search">
	  <div className = "searchForm">
		<label htmlFor = "search">
		  <img src = {searchIcon}
			   alt = ""
		  />
		</label>
		<input id = "search"
			   type = "text"
			   placeholder = "Find friend"
			   value = {searchedUserName}
			   onChange = {(e) => setSearchedUserName(e.target.value)}
			   onKeyDown = {handleKey}
		/>
	  </div>
	  {err &&
		<p>User not found 🧐.</p>}
	  {queriedUser &&
		<div className = "userChat"
			 onClick = {handleSelectUser}
		>
		  <img src = {queriedUser.photoURL}
			   alt = "queried-user-dp"
		  />
		  <div className = "userChatInfo">
			<span className = "userName">{queriedUser.displayName}</span>
		  </div>
		</div>}
	</div>
  );
}

export default Search;