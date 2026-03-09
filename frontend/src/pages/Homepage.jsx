import { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import { UserContext } from '../context/UserContext'
import Profile from './Profile'

const Homepage = () => {
  const { user, token } = useContext(UserContext)
   const [layout, setLayout] = useState(null)
  console.log(user)
  return (
    <div style={{
      display: "flex"
    }}>
      {user?.role === "admin" || user?.role === "vendor" ? <>
        <div>
          <Sidebar {...{setLayout, layout}} role={user?.role} />
        </div>
        <div>
          <Dashboard {...{setLayout, layout, token}} role={user?.role} />
        </div>
      </> : <Profile />}
    </div>
  )
}

export default Homepage