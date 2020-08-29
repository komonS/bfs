import React, { useEffect, useContext } from 'react';
import Header from './component/layout/Header'
import Home from './component/content/Home'
import Login from './component/content/Login'
import MyBike from './component/content/MyBike'
import EditBike from './component/content/EditBike'
import Profile from './component/content/Profile'
import Register from './component/content/Register'
import { Switch, Route, useHistory } from "react-router-dom";
import { LoginContext } from './store/LoginProvider'
import Sidebar from './component/layout/Sidebar'
import Friend from './component/layout/Friend'
import './App.css'
import { MenuContext } from './store/MenuProvider'
function App() {
  const { login, setLogin } = useContext(LoginContext)
  const history = useHistory();
  const { menu, setMenu } = useContext(MenuContext)
  const ShowSidebar = () => {
    return <div className="col-md-3 ">
      <div className="Menu d-none d-xl-block">
        <Sidebar />
      </div>
    </div>

  }
  const ShowFriend = () => {
    return <div className="col-md-3 ">
      {/*<div className="Menu d-none d-xl-block">*/}
      <div>
        <Friend />
      </div>
    </div>

  }
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="row">
          {login ? <ShowSidebar /> : <div className="col-md-3"></div>}


          <div className="col-md-12 col-lg-12 col-xl-6">
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
              <Route path="/register" >
                <Register />
              </Route>
              <Route path="/" >
                <Home />
              </Route>
            </Switch>
          </div>
          {login ? <ShowFriend /> : <div className="col-md-3"></div>}
        </div>

      </div>

    </div>
  )
}


export default App;
