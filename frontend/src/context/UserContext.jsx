import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState('')
    console.log("userToken", token)
    // useEffect(() => {
    //     const fetchUser = async() => {
    //         try {
                
    //         } catch (error) {
    //             console.log("error in context")
    //         }
    //     }
    // }, [])
    // return <UserContext.Provider value={{test: "test"}}>
    return <UserContext.Provider value={{setToken}}>
        {children}
    </UserContext.Provider>
}

