import { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import { UserContext } from '../context/UserContext'
import Profile from './Profile'
import { Navigate } from 'react-router-dom'

const Homepage = ({role}) => {
  const { user, token } = useContext(UserContext)
  //  const [layout, setLayout] = useState(null) //need to change to routes, this is not good
  // console.log("test", user, role)
  return (
    <div style={{
      display: "flex"
    }}>
      {role === "admin" || role === "vendor" ? <>
        <div>
          <Sidebar role={role} />
        </div>
        <div>
          {/* <Dashboard {...{setLayout, layout, token}} role={role} /> */}
          <Dashboard role={role} token={token}/>
        </div>
      </> : <Profile user={user}/>}
    </div>
  )
}

export default Homepage