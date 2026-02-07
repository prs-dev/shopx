import Login from './pages/Login'
import Register from './pages/Register'
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from './context/UserContext'
import Homepage from './pages/Homepage'

const App = () => {
  const {token} = useContext(UserContext)
  // console.log("user", user.test)
  console.log("token-true", token)
  return (
    <Routes>
      {/* <Register /> */}
      <Route path="/" element={token ? <Homepage /> : <Login />} />
      <Route path="/register" element={token ? <Homepage /> : <Register />} />
      <Route path='/login' element={token ? <Homepage /> : <Login />} />
    </Routes>
  )
}

export default App