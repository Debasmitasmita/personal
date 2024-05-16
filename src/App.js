import Login from "./component/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signup from './component/Signup';
import Dashboard from "./component/Dashboard";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./ContextApi/AuthContext";
// import { Routes as Router, Route, Navigate } from "react-router-dom";
import {Privateroutes} from "./ContextApi/Privateroute";

function App() {


  // const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setisAuth, setAuthData, setAccessToken } = useContext(AuthContext);
  // const { setisAuth, setAuthData } = useContext(AuthContext);

  useEffect(() => {
    // Function to fetch access token
    const fetchAccessToken = async () => {
      console.log("Start Rebuild Login State");
      try {
        console.log("Rebuild Login State");
        // Make API call to get the access token
        // var apiData = {
        //   apiKey: "1234567",
        //   projectName: "projectOne"
        // }
        const response = await fetch(process.env.REACT_APP_API_BASE_URL + 'auth/session', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        // const data = await response.json();
        if (response.ok) {


          const loginRespose = await response.json();
          console.log(loginRespose);
          setisAuth(true);
          setAuthData(loginRespose.login_info);
          setAccessToken(loginRespose.accessToken);
          localStorage.setItem("token", loginRespose.accsessToken);
          setLoading(false)
          // return authorizationInfo; // Return any additional data if needed
        } else {
          setisAuth(false);
          setAuthData(null);
          setLoading(false);
        }

      } catch (error) {
        console.log("Rebuild Login State Faield");
        setisAuth(false)
        setAuthData(null)
        setLoading(false);
      } finally {

        console.log("hii");

      }
    }
    fetchAccessToken()
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <BrowserRouter >
      <Routes>
        <Route path='/' element={<Navigate to={"/login"} replace></Navigate>}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path="/dashboard" element={<Privateroutes> <Dashboard/> </Privateroutes>} />
      </Routes>

    </BrowserRouter >
  );
}

export default App;
