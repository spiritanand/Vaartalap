import {
  useEffect,
  useRef
} from "react";
import {useAuthCtx} from "../../../store/authContext.jsx";
import {useChatCtx} from "../../../store/chatContext.jsx";
import calcDiffInDays from "../../../utils/caclDiffInDays.js";

function Message(props) {
  const currentUser = useAuthCtx();
  const {chatData} = useChatCtx();
  const message = props.message;
  const messageRef = useRef();
  const currentUserChat = currentUser.uid === message.senderId;
  
  useEffect(() => {
	messageRef.current?.scrollIntoView({
	  behavior: 'smooth',
	  block   : 'nearest',
	  inline  : 'start'
	});
  }, [message]);
  
  const time = calcDiffInDays(new Date(), message.date.toDate());
  
  return (
	<div className = {`message ${currentUserChat
								 ? "owner"
								 : ""}`}
		 ref = {messageRef}
	>
	  <div className = "messageInfo">
		<img src = {currentUserChat
					? currentUser.photoURL
					: chatData.user.photoURL}
			 alt = ""
		/>
		<span>{time}</span>
	  </div>
	  <div className = "messageContent">
		{message.textMessage &&
		  <p>{message.textMessage}</p>}
		{message.img && <img src = {message.img}
							 alt = "Unable to load"
		/>}
	  </div>
	</div>
  );
}

export default Message;