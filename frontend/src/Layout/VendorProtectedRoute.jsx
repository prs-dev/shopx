import { Outlet, Navigate } from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const VendorProtectedRoute = () => {
    const { token, user } = useContext(UserContext)
    // console.log("user", user)
  return (
   <>
     {token && user.role === 'vendor' ? <Outlet /> : <Navigate to='/login' replace/>}
   </>
  )
}

export default VendorProtectedRoute