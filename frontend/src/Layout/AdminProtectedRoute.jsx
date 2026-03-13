import { Outlet, Navigate } from "react-router-dom"
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const AdminProtectedRoute = () => {
    const { token, user } = useContext(UserContext)
  return (
    <>
        {token && user.role === 'admin' ? <Outlet /> : <Navigate to='/login' replace/>}
    </>
  )
}

export default AdminProtectedRoute