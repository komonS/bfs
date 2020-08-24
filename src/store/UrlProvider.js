import React, { createContext, useReducer } from "react"
export const UrlContext = createContext({})


const initialState = {
    url: {
        api: 'http://localhost/biker/'
    }
}



const urlReducer = (state, action) => {
    switch (action.type) {
        case "GET_URL":
            return {
                ...state, // copy state 
                url: action.payload // set state counter
            }
    }
}

export const UrlProvider = ({ children }) => {
    const [urlState, urlDispatch] = useReducer(
        urlReducer,
        initialState
    )

    const {url } = urlState

    const getUrl = payload =>
        urlDispatch({ type: "GET_URL", payload }) // ส่ง type ADD_COUNTER และ payload เพื่อให้ conterReducer ไปใช้งานต่อ
    return (
        <UrlContext.Provider value={{ url, getUrl }}>
            {children}
        </UrlContext.Provider>
    )
}