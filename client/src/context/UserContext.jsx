import { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        const userToken = localStorage.getItem("user-token")
        return userToken
    })
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user"))
    })
    const [loading, setLoading] = useState(false) //for future use
    const navigate = useNavigate()

    // console.log("userToken", token)

    useEffect(() => {
        if (token && token.length > 0) {
            localStorage.setItem("user-token", token)
        } else {
            localStorage.removeItem('user-token')
        }
    }, [token])

    //error handling for user data
    // useEffect(() => {
    //     if(user && user.role) {
    //         localStorage.setItem("user", userData)
    //     } else {
    //         localStorage.removeItem("user")
    //     }
    // }, [user])

    const logout = () => {
        localStorage.removeItem("user-token")
        setToken("")
        setUser(null)
    }

    // useEffect(() => {
    //     const userToken = localStorage.getItem("user-token")
    //     setToken(userToken)
    // }, [])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/user', {
                    method: "GET",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setUser(data.user)
                    // localStorage.setItem("user", JSON.stringify(data.user))
                    // console.log("data", data)
                }
            } catch (error) {
                console.log("error in fetching user details in context", error)
            }
        }
        if (token && token.length > 0) fetchUser()
    }, [token])

    // useEffect(() => {
    //     if(token && token.length > 0) {
    //         localStorage.setItem("user", JSON.stringify(user))
    //     } else {
    //         localStorage.removeItem('user')
    //     }
    // }, [token])
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [token, user])
    // return <UserContext.Provider value={{test: "test"}}>

    useEffect(() => {
        //will redirect according to the role, since i cant do this in login form
        //only works if user.role exists and triggered only when user value changes
        if (user?.role === 'admin') navigate('/admin')
        if (user?.role === 'vendor') navigate('/vendor')
        if (user?.role === 'user') navigate('/')
    }, [user])

    return <UserContext.Provider value={{ token, setToken, logout, user }}>
        {children}
    </UserContext.Provider>
}

//can be used from now to use token
export const userToken = () => {
    const { token } = useContext(UserContext)
    return token || ''
}

export const userData = () => {
    const { user } = useContext(UserContext)
    return user || {}
}
