import React from 'react';
import ChatBox from "../components/home/chat/ChatBox.jsx";
import Sidebar from "../components/home/sidebar/Sidebar.jsx";

const Home = () => {
  return (
	<div className = "container">
	  <div className = "wrapper homeWrapper">
		<Sidebar></Sidebar>
		<ChatBox></ChatBox>
	  </div>
	</div>
  );
};

export default Home;
