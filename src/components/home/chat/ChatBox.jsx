import React, {Fragment} from 'react';
import {
  CHAT_ACTIONS,
  useChatCtx
} from "../../../store/chatContext.jsx";
import {useMediaQuery} from "../../../utils/hooks/mediaQueryHook.js";
import Input from "./Input.jsx";
import Messages from "./Messages.jsx";
import backButton from "../../../images/backButton.png"
import logo from "../../../images/chat.png"
import cam from "../../../images/cam.png"
import addFriend from "../../../images/add.png"
import more from "../../../images/more.png"

function ChatBox(props) {
  const {
		  dispatch,
		  chatData
		} = useChatCtx();
  const isMobile = useMediaQuery('(max-width: 650px)');
  
  function handleBack() {
	dispatch({type: CHAT_ACTIONS.MAKE_INACTIVE});
  }
  
  const chatStyle = {
	display: (!chatData.isActive && isMobile)
			 ? "none"
			 : "block",
  };
  
  return (
	<div className = "chat"
		 style = {chatStyle}
	>
	  {chatData.isActive &&
		<Fragment>
		  <div className = "chatInfo">
			<div className = "userInfo">
			  <img src = {backButton}
				   alt = ""
				   className = "backButton"
				   onClick = {handleBack}
			  />
			  <img src = {chatData.user?.photoURL}
				   alt = ""
			  />
			  <span>{chatData.user?.displayName}</span>
			</div>
			<div className = "chatIcons">
			  <img src = {cam}
				   alt = ""
			  />
			  <img src = {addFriend}
				   alt = ""
			  />
			  <img src = {more}
				   alt = ""
			  />
			</div>
		  </div>
		  <Messages></Messages>
		  <Input></Input>
		</Fragment>
	  }
	  {!chatData.isActive &&
		<div className = "noChat">
		  <img src = {logo}
			   alt = ""
		  />
		  <h3>Click friend to start a</h3>
		  <h1>VAARTALAP</h1>
		</div>
	  }
	</div>
  );
}

export default ChatBox;