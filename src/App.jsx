import {Fragment} from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Footer from "./components/footer/Footer.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import "./scss/styles.scss";
import {useAuthCtx} from "./store/authContext.jsx";

function App() {
  const currentUser = useAuthCtx();
  
  const ProtectedRoute = ({children}) => {
	if (!currentUser)
	  return (
		<Navigate to = "/register"></Navigate>
	  )
	
	return (
	  <Fragment>
		{children}
	  </Fragment>
	)
  }
  
  return (
	<BrowserRouter>
	  <Routes>
		<Route path = "/">
		  <Route index
				 element = {
				   <ProtectedRoute>
					 <Home></Home>
				   </ProtectedRoute>
				 }
		  ></Route>
		  <Route path = "login"
				 element = {<Login></Login>}
		  ></Route>
		  <Route path = "register"
				 element = {<Register></Register>}
		  ></Route>
		</Route>
	  </Routes>
	  <Footer></Footer>
	</BrowserRouter>
  )
}

export default App
