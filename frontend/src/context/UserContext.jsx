import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState(() => {
        const userToken = localStorage.getItem("user-token")
       return userToken
    })
    console.log("userToken", token)

    useEffect(() => {
        if(token && token.length > 0) {
            localStorage.setItem("user-token", token)
        } else {
            localStorage.removeItem('user-token')
        }
    }, [token])

    // useEffect(() => {
    //     const userToken = localStorage.getItem("user-token")
    //     setToken(userToken)
    // }, [])

    // useEffect(() => {
    //     const fetchUser = async() => {
    //         try {
                
    //         } catch (error) {
    //             console.log("error in context")
    //         }
    //     }
    // }, [])
    // return <UserContext.Provider value={{test: "test"}}>
    return <UserContext.Provider value={{token, setToken}}>
        {children}
    </UserContext.Provider>
}

