import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import { LoginProvider } from './store/LoginProvider'
import { UserProvider } from './store/UserProvider'
import { UserinfoProvider } from './store/UserinfoProvider'
import { UrlProvider } from './store/UrlProvider'
import { MenuProvider } from './store/MenuProvider'
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UserinfoProvider>
        <LoginProvider>
          <UserProvider>
            <UrlProvider>
              <MenuProvider>
              <App />
              </MenuProvider>
            </UrlProvider>
          </UserProvider>
        </LoginProvider>
      </UserinfoProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
