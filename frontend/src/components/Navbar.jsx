import React from 'react'

const Navbar = ({logout, navigate}) => {
    return (
        <nav style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: "space-between",
            height: "50px",
            padding: "10px",
            background: "#333",
            color: 'white'
        }}>
            <h2 onClick={() => navigate('/')} style={{
                cursor: "pointer"
            }}>
                ShopX
            </h2>
            <ul style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                listStyle: "none",
                cursor: "pointer"
            }}>
                <li onClick={() => navigate("/register")}>Register</li>
                <li onClick={() => navigate("/login")}>Login</li>
                <li onClick={logout}>Logout</li>
            </ul>
        </nav>
    )
}

export default Navbar