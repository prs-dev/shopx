import Login from './pages/Login'
import Register from './pages/Register'
// import { useContext } from 'react'
// import {UserContext} from '../context/UserContext'

const App = () => {
  // const user = useContext(UserContext)
  // console.log("user", user.test)
  return (
    <div>
      {/* <Register /> */}
      <Login />
    </div>
  )
}

export default App