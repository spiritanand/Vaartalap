import React, {useState} from 'react';

function Chat(props) {
  return (
	<div className = "userChat"
		 onClick = {props.onClick}
	>
	  <img src = {props.imgSrc}
		   alt = ""
	  />
	  <div className = "userChatInfo">
		<span className = "userName">{props.displayName}</span>
		<p className = "userMessage">{props.latestMessage?.slice(0,8)}...</p>
	  </div>
	</div>
  );
}

export default Chat;