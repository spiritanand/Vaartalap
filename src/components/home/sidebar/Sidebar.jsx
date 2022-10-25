import React from 'react';
import {useChatCtx} from "../../../store/chatContext.jsx";
import {useMediaQuery} from "../../../utils/hooks/mediaQueryHook.js";
import Chats from "./Chats.jsx";
import Navbar from "./Navbar.jsx";
import Search from "./Search.jsx";

function Sidebar(props) {
  const {chatData} = useChatCtx();
  const isMobile = useMediaQuery('(max-width: 650px)');
  
  const sidebarStyle = {
	display: (chatData.isActive && isMobile)
			 ? "none"
			 : "block",
  };
  
  return (
	<div className="sidebar" style={sidebarStyle}>
	  <Navbar></Navbar>
	  <Search></Search>
	  <Chats></Chats>
	</div>
  );
}

export default Sidebar;