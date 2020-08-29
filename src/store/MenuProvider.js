import React, { createContext, useReducer } from "react"
export const MenuContext = createContext({})


const initialState = {
    menu: 'Hide'
}



const menuReducer = (state, action) => {
    switch (action.type) {
        case "SET_MENU":
            return {
                ...state, // copy state 
                menu: action.payload // set state counter
            }
    }
}

export const MenuProvider = ({ children }) => {
    const [menuState, menuDispatch] = useReducer(
        menuReducer,
        initialState
    )

    const {menu } = menuState

    const setMenu = payload =>
        menuDispatch({ type: "SET_MENU", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
    return (
        <MenuContext.Provider value={{ menu, setMenu }}>
            {children}
        </MenuContext.Provider>
    )
}