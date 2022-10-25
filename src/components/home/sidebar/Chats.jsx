import React, {
  useEffect,
  useState
} from 'react';
import {
  doc,
  onSnapshot
} from "firebase/firestore";
import {db} from "../../../firebase.js";
import {useAuthCtx} from "../../../store/authContext.jsx";
import {
  CHAT_ACTIONS as chatActions,
  useChatCtx
} from "../../../store/chatContext.jsx";
import Chat from "./Chat.jsx";

function Chats(props) {
  const currentUser = useAuthCtx();
  const {dispatch} = useChatCtx();
  const [chats, setChats] = useState([]);
  
  useEffect(() => {
	const getUserChats = () => {
	  const ref = doc(db, "userChats", currentUser.uid);
	  const unsub = onSnapshot(ref, (doc) => {
		setChats(doc.data());
	  });
	  
	  return () => {
		unsub();
	  };
	}
	
	currentUser.uid && getUserChats();
  }, [currentUser.uid]);
  
  function handleSelect(otherUserInfo) {
	dispatch({
	  type   : chatActions.CHANGE_USER,
	  payload: otherUserInfo,
	});
  }
  
  return (
	<div className = "chats">
	  {Object.entries(chats)
			 ?.sort((a, b) => {
			   return b[1].date - a[1].date;
			 })
			 .map(chat => (
			   <Chat key = {chat[0]}
					 imgSrc = {chat[1].userInfo.photoURL}
					 displayName = {chat[1].userInfo.displayName}
					 latestMessage = {chat[1].lastMessage?.textMessage}
					 onClick = {() => handleSelect(chat[1].userInfo)}
			   ></Chat>
			 ))}
	</div>
  );
}

export default Chats;