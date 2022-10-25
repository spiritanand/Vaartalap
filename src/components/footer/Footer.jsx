import React from 'react';
import github from "../../images/github-sign.png"

function Footer(props) {
  return (
	<div className = "footer">
	  <h1>Made with ♥️</h1>
		<a href = "https://github.com/spiritmonster/Vaartalap">
		  <img src = {github}
			   alt = "github-icon"
		  />
		</a>
	  <p>Spirit ✌️</p>
	</div>
  );
}

export default Footer;