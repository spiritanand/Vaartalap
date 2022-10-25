import React, {
  useEffect,
  useState
} from 'react';
import {
  doc,
  onSnapshot
} from "firebase/firestore";
import {db} from "../../../firebase.js";
import {useChatCtx} from "../../../store/chatContext.jsx";
import Message from "./Message.jsx";

function Messages(props) {
  const [messages, setMessages] = useState([]);
  const {chatData} = useChatCtx();
  
  useEffect(() => {
	const unsub = onSnapshot(doc(db, "chats", chatData.chatId), (doc) => {
	  doc.exists() && setMessages(doc.data().messages);
	})
	return () => {
	  unsub();
	};
  }, [chatData.chatId]);
  
  return (
	<div className = "messages">
	  {messages.map(message => (
		<Message key={message.id} message = {message}>
		</Message>
	  ))}
	</div>
  );
}

export default Messages;