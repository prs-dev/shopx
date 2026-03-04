import { createContext, useEffect, useState } from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [token, setToken] = useState(() => {
        const userToken = localStorage.getItem("user-token")
       return userToken
    })
    const [user, setUser] = useState(null)
    console.log("userToken", token)

    useEffect(() => {
        if(token && token.length > 0) {
            localStorage.setItem("user-token", token)
        } else {
            localStorage.removeItem('user-token')
        }
    }, [token])

    const logout = () => {
        localStorage.removeItem("user-token")
        setToken("")
    }

    // useEffect(() => {
    //     const userToken = localStorage.getItem("user-token")
    //     setToken(userToken)
    // }, [])

    useEffect(() => {
        const fetchUser = async() => {
            try {
                const res = await fetch('/api/user', {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if(res.ok) {
                    const data = await res.json()
                    setUser(data?.user)
                    // console.log("data", data)
                }
            } catch (error) {
                console.log("error in fetching user details in context", error)
            }
        }
        if(token) fetchUser()
    }, [token])
    // return <UserContext.Provider value={{test: "test"}}>
    return <UserContext.Provider value={{token, setToken, logout, user}}>
        {children}
    </UserContext.Provider>
}

