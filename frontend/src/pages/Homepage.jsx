import { useContext } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import { UserContext } from '../context/UserContext'
import Profile from './Profile'

const Homepage = () => {
  const { user } = useContext(UserContext)
  console.log(user)
  return (
    <div style={{
      display: "flex"
    }}>
      {user?.role === "admin" || user?.role === "vendor" ? <>
        <div>
          <Sidebar role={user?.role} />
        </div>
        <div>
          <Dashboard role={user?.role} />
        </div>
      </> : <Profile />}
    </div>
  )
}

export default Homepage