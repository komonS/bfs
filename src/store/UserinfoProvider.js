import React, { createContext, useReducer } from "react"

export const UserinfoContext = createContext({})


const initialState = {
    fname: '',
    lname: '',
    email: ''
}



const userinfoReducer = (state, action) => {
    switch (action.type) {
        case "SET_FNAME":
            return {
                ...state, // copy state 
                fname: action.payload // set state userinfo
            }
        case "SET_LNAME":
            return {
                ...state, // copy state 
                lname: action.payload // set state userinfo
            }
        case "SET_EMAIL":
            return {
                ...state, // copy state 
                email: action.payload // set state userinfo
            }
    }
}

export const UserinfoProvider = ({ children }) => {
    const [userinfoState, userinfoDispatch] = useReducer(
        userinfoReducer,
        initialState
    )

    const { fname,lname,email } = userinfoState

    const setFname = payload =>
        userinfoDispatch({ type: "SET_FNAME", payload })
    const setLname = payload =>
        userinfoDispatch({ type: "SET_LNAME", payload })
    const setEmail = payload =>
        userinfoDispatch({ type: "SET_EMAIL", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ

    return (
        <UserinfoContext.Provider value={{ fname,lname,email,setFname,setLname, setEmail }}>
            {children}
        </UserinfoContext.Provider>
    )
}