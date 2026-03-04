import Login from './pages/Login'
import Register from './pages/Register'
import {Routes, Route} from 'react-router-dom'
import { useContext } from 'react'
import {UserContext} from './context/UserContext'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { useNavigate } from 'react-router-dom'

const App = () => {
  const {token, logout} = useContext(UserContext)
  // console.log("user", user.test)
  console.log("token-true", token)
  const navigate = useNavigate()
  return (
    <div>
      <div>
      <Navbar logout={logout} navigate={navigate}/>
    </div>
    <main style={{
      padding: "10px",
      maxWidth: "1024px",
      margin: "0 auto"
    }}>
      <Routes>
      {/* <Register /> */}
      <Route path="/" element={token ? <Homepage /> : <Register />} />
      <Route path="/register" element={token ? <Homepage /> : <Register />} />
      <Route path='/login' element={token ? <Homepage /> : <Login />} />
    </Routes>
    </main>
    </div>
  )
}

export default App