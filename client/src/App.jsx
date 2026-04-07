import Login from './pages/Login'
import Register from './pages/Register'
import { Routes, Route } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './context/UserContext'
import Homepage from './pages/Homepage'
import Navbar from './components/Navbar'
import { useNavigate } from 'react-router-dom'
import VendorRegister from './pages/VendorRegister'
import { useState } from 'react'
import Layout from './Layout/Layout'
import VendorProtectedRoute from './Layout/VendorProtectedRoute'
import AdminProtectedRoute from './Layout/AdminProtectedRoute'
import { userToken } from './context/UserContext'
import ProductPage from './pages/ProductPage'
import Profile from './pages/Profile'

const App = () => {
  const { token, logout, user } = useContext(UserContext)
  // console.log("user", userToken())

  console.log("token-true", token)
  const navigate = useNavigate()
  return (
    <div>
      <div>
      <Navbar logout={logout} navigate={navigate} user={user}/>
    </div>
    <main style={{
      // padding: "10px",
      margin: "0 auto"
    }}>
      <Routes>
      {/* <Register /> */}
      <Route path="/" element={token ? <Homepage role={user?.role}/> : <Login />} />
      <Route path="/profile" element={token ? <Profile user={user}/> : <Login />} />
      <Route path="/register" element={token ? <Homepage role={user?.role}/> : <Register />} />
      <Route path='/login' element={token ? <Homepage role={user?.role}/> : <Login />} />
      <Route path='/vendor/new' element={token ? <VendorRegister token={token}/> : <Login />} />
      <Route path='/products' element={<ProductPage />} />
      {/* <Route path='/vendor' element={token && user?.role === "vendor" ? <Homepage role={"vendor"}/> : <Login />} /> */}
      <Route element={<VendorProtectedRoute />}>
        <Route path='/vendor' element={<Homepage role={'vendor'}/>} />
        <Route path='/vendor/products' element={<Homepage role={"vendor"} />} />
        <Route path='/vendor/product/update/:id' element={<Homepage role={"vendor"} />} />
        <Route path='/vendor/product/new' element={<Homepage role={"vendor"} />} />
      </Route>
      <Route element={<AdminProtectedRoute />}>
        <Route path='/admin' element={<Homepage role="admin" />} />
        <Route path='/admin/products' element={<Homepage role="admin" />} />
        <Route path='/admin/vendor/requests' element={<Homepage role="admin" />} />
        <Route path='/admin/vendor/requests/all' element={<Homepage role="admin" />} />
        <Route path='/admin/vendor/requests/pending' element={<Homepage role="admin" />} />
        <Route path='/admin/vendor/requests/rejected' element={<Homepage role="admin" />} />
      </Route>
      {/* <Route path='/admin' element={token && user?.role === "admin" ? <Homepage role={"admin"}/> : <Login />} />
      <Route path='/admin/vendor/requests' element={token && user?.role === "admin" ? <Homepage role={"admin"}/> : <Login />} /> */}
    </Routes>
    </main>
    </div>
    // <Routes>
    //   <Route path='/login' element={<Login />} />
    //   <Route element={<Layout />}>
    //     <Route index element={<Homepage />} />
    //   </Route>
    // </Routes>
  )
}

export default App