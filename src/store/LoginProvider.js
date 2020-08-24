import React, { createContext, useReducer } from "react"

export const LoginContext = createContext({})


const initialState = {
  login: false
}

if(localStorage.userID != null){
  console.log(localStorage.userID)
  initialState.login = true
}



const loginReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOGIN":
      return {
        ...state, // copy state 
        login: action.payload // set state counter
      }
  }
}

export const LoginProvider = ({ children }) => {
  const [loginState, loginDispatch] = useReducer(
    loginReducer,
    initialState
  )

  const { login } = loginState

  const setLogin = payload =>
    loginDispatch({ type: "SET_LOGIN", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      {children}
    </LoginContext.Provider>
  )
}