import React from 'react'

const Sidebar = ({role, layout, setLayout}) => {
  // console.log("layout", layout, setLayout)
  if(role === "admin") return (
    <div style={{
      width: "200px",
      background: "#333",
      height: "100vh",
      color: "white",
      padding: "10px"
    }}>
      <ul>
        <li onClick={() => setLayout("admin-vendor")}>
          Vendor Requests
        </li>
      </ul>
    </div>
  )
  if(role === 'vendor') return (
    <div style={{
      width: "200px",
      background: "#333",
      height: "100vh",
      color: "white",
      padding: "10px"
    }}>
      <ul>
        <li>
          All Shops
        </li>
      </ul>
    </div>
  )
}

export default Sidebar