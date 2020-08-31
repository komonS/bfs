import React, { createContext, useReducer } from "react"
export const FriendContext = createContext({})


const initialState = {
    friend: []
}



const friendReducer = (state, action) => {
    switch (action.type) {
        case "SET_FRIEND":
            return {
                ...state, // copy state 
                friend: action.payload // set state counter
            }
    }
}

export const FriendProvider = ({ children }) => {
    const [friendState, friendDispatch] = useReducer(
        friendReducer,
        initialState
    )

    const {friend } = friendState

    const setFriend = payload =>
    friendDispatch({ type: "SET_FRIEND", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
    return (
        <FriendContext.Provider value={{ friend, setFriend }}>
            {children}
        </FriendContext.Provider>
    )
}