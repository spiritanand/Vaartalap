import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {AuthContextProvider} from "./store/authContext.jsx";
import ChatContextProvider from "./store/chatContext.jsx";

ReactDOM.createRoot(document.getElementById('root'))
		.render(
		  <AuthContextProvider>
			<ChatContextProvider>
			  <React.StrictMode>
				<App/>
			  </React.StrictMode>
			</ChatContextProvider>
		  </AuthContextProvider>
		)
