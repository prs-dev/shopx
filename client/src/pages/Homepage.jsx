import { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'
import { UserContext } from '../context/UserContext'
import { Navigate } from 'react-router-dom'
import ProductPage from './ProductPage'

const Homepage = ({role}) => {
  const { user, token } = useContext(UserContext)
  //  const [layout, setLayout] = useState(null) //need to change to routes, this is not good
  // console.log("test", user, role)
  return (
    <div style={{
      display: "flex",
      width: "100%"
    }}>
      {role === "admin" || role === "vendor" ? <>
        <div>
          <Sidebar role={role} />
        </div>
        <div style={{width: '100%'}}>
          {/* <Dashboard {...{setLayout, layout, token}} role={role} /> */}
          <Dashboard role={role} token={token}/>
        </div>
      </> : <ProductPage />}
    </div>
  )
}

export default Homepage