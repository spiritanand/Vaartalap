import React, {
  createContext,
  useContext,
  useReducer
} from 'react';
import calcChatId from "../utils/calcChatId.js";
import {useAuthCtx} from "./authContext.jsx";

const INITIAL_STATE = {
  user    : {},
  chatId  : "",
  isActive: false,
};

const ChatCtx = createContext(INITIAL_STATE);

export function useChatCtx() {
  return useContext(ChatCtx);
}

export const CHAT_ACTIONS = {
  CHANGE_USER  : "change user",
  MAKE_INACTIVE: "make user chat inactive",
}

function ChatContextProvider(props) {
  const currentUser = useAuthCtx();
  const [chatState, dispatch] = useReducer(chatReducer, INITIAL_STATE);
  
  function chatReducer(state, action) {
	switch (action.type) {
	  case CHAT_ACTIONS.CHANGE_USER:
		return {
		  user    : action.payload,
		  chatId  : calcChatId(currentUser.uid, action.payload.uid),
		  isActive: true,
		}
	  case CHAT_ACTIONS.MAKE_INACTIVE:
		return {
		  ...state,
		  isActive: false,
		}
	  default:
		return state;
	}
  }
  
  return (
	<ChatCtx.Provider value = {{
	  chatData: chatState,
	  dispatch
	}}
	>
	  {props.children}
	</ChatCtx.Provider>
  );
}

export default ChatContextProvider;