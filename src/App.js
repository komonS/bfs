import React, { useEffect,useContext } from 'react';
import Header from './component/layout/Header'
import Home from './component/content/Home'
import Login from './component/content/Login'
import MyBike from './component/content/MyBike'
import EditBike from './component/content/EditBike'
import Profile from './component/content/Profile'
import { Switch, Route, useHistory } from "react-router-dom";
import { LoginContext } from './store/LoginProvider'
function App() {
  const { login,setLogin } = useContext(LoginContext)
  const history = useHistory();
 

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
        <Route path="/mybike/:bike" >
            <EditBike />
          </Route>
          <Route path="/mybike" >
            <MyBike />
          </Route>
          <Route path="/login" >
            <Login />
          </Route>
          <Route path="/profile" >
            <Profile />
          </Route>
          <Route path="/" >
            <Home />
          </Route>
        </Switch>
      </div>

    </div>
  )
}


export default App;
