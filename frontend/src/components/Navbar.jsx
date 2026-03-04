import React from 'react'

const Navbar = ({ logout, navigate, user }) => {
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
                {user && user.role !== 'vendor' ? <>
                    <li>
                        <span style={{
                            fontWeight: '700',
                            border: "1px solid white",
                            padding: "5px",
                            borderRadius: "5px"
                        }}>Become a vendor</span>
                    </li>
                    <li>Welcome {user?.name}</li>
                    <li onClick={logout}>Logout</li>
                </> : <>
                    <li onClick={() => navigate("/register")}>Register</li>
                    <li onClick={() => navigate("/login")}>Login</li>
                </>}

            </ul>
        </nav>
    )
}

export default Navbar