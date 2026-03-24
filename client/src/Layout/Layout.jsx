import { Link, Navigate, Outlet } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import Navbar from '../components/Navbar'
import { useNavigate } from 'react-router-dom'

const Layout = () => {
    const { token, logout, user } = useContext(UserContext)
    const navigate = useNavigate()
    return (
        <>
            <header>
                    <Navbar logout={logout} navigate={navigate} user={user} />
            </header>
            <main>
                {token ? <Outlet /> : <Navigate to='/login' /> }
            </main>
            <footer>
                &#169; prs-dev
            </footer>
        </>
    )
}

export default Layout