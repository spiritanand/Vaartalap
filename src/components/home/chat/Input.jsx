import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc
} from "firebase/firestore";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable
} from "firebase/storage";
import React, {useState} from 'react';
import {v4 as uuid} from "uuid";
import {
  db,
  storage
} from "../../../firebase.js";
import attach from "../../../images/attach.png"
import {useAuthCtx} from "../../../store/authContext.jsx";
import {useChatCtx} from "../../../store/chatContext.jsx";

const Input = () => {
  const currentUser = useAuthCtx();
  const {chatData} = useChatCtx();
  const [textMessage, setTextMessage] = useState("");
  const [img, setImg] = useState(null);
  const [isSending, setIsSending] = useState(false);
  
  const handleSend = async (e) => {
	e.preventDefault();
	// basic validation
	
	setIsSending(true);
	if (!img && !textMessage.trim()) {
	  setImg(null);
	  setTextMessage("");
	  setIsSending(true);
	  return;
	}
	
	// add messages
	if (img) {
	  const storageRef = ref(storage, uuid());
	  const uploadTask = uploadBytesResumable(storageRef, img);
	  
	  uploadTask.on(
		(error) => {
		  // Handle unsuccessful uploads
		},
		() => {
		  // Handle successful uploads on complete
		  getDownloadURL(uploadTask.snapshot.ref)
			.then(async (downloadURL) => {
			  await updateDoc(doc(db, "chats", chatData.chatId), {
				messages: arrayUnion({
				  id      : uuid(),
				  textMessage,
				  img     : downloadURL,
				  senderId: currentUser.uid,
				  date    : Timestamp.now(),
				})
			  });
			});
		}
	  );
	  
	} else {
	  // update chats
	  await updateDoc(doc(db, "chats", chatData.chatId), {
		messages: arrayUnion({
		  id      : uuid(),
		  textMessage,
		  senderId: currentUser.uid,
		  date    : Timestamp.now(),
		})
	  });
	  
	  //  update last message for both users
	  await updateDoc(doc(db, "userChats", currentUser.uid), {
		[chatData.chatId + ".lastMessage"]: {
		  textMessage
		},
		[chatData.chatId + ".date"]       : serverTimestamp(),
	  });
	  await updateDoc(doc(db, "userChats", chatData.user.uid), {
		[chatData.chatId + ".lastMessage"]: {
		  textMessage
		},
		[chatData.chatId + ".date"]       : serverTimestamp(),
	  });
	}
	
	// resetting state
	setTextMessage("");
	setImg(null);
	setIsSending(false);
  }
  
  return (
	<form className = "input"
		  onSubmit = {handleSend}
	>
	  <input type = "text"
			 placeholder = "Type..."
			 onChange = {(e) => setTextMessage(e.target.value)}
			 value = {textMessage}
	  />
	  <div className = "send">
		<input type = "file"
			   id = "attachFile"
			   onChange = {(e) => setImg(e.target.files[0])}
		/>
		<label htmlFor = "attachFile">
		  <img src = {attach}
			   alt = "attach-icon"
		  />
		</label>
		<button disabled = {isSending}>Send</button>
	  </div>
	</form>
  );
};

export default Input;
