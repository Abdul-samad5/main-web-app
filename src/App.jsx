import { BrowserRouter as Router, Route, Routes , Navigate} from "react-router-dom";
import { Register, Dashboard } from "./pages";
import { LoginContext } from "./context/LoginContext";
import React, {useContext} from "react";



function App() {
  const {isLoggedIn} = useContext(LoginContext);
  const PreventLogin = ({children}) => {
    return isLoggedIn ? children : <Navigate to="/"/>
  }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/dashboard" element={
          <PreventLogin>
            <Dashboard />
          </PreventLogin>
        } />
      </Routes>
    </Router>
  );
}

export default App;
