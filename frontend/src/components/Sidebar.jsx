import { useNavigate } from "react-router-dom"

const Sidebar = ({role}) => {
  // console.log("layout", layout, setLayout)
  const navigate = useNavigate()
  if(role === "admin") return (
    <div style={{
      maxWidth: "200px",
      background: "#333",
      height: "100vh",
      color: "white",
      padding: "10px",
    }}>
      <ul style={{
        display: "flex",
        flexDirection: 'column',
        listStyle: "none",
        gap: "20px"
      }}>
        {/* <li onClick={() => setLayout("admin-vendor")}> */}
        <li onClick={() => navigate('/admin/vendor/requests/all')}>
          All Vendors
        </li>
        <li onClick={() => navigate('/admin/vendor/requests/pending')}>
          Vendor Requests Pending
        </li>
        <li onClick={() => navigate('/admin/vendor/requests/rejected')}>
          Vendor Requests Rejected
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
        <li onClick={() => navigate('/vendor/products')}>
          All Products
        </li>
      </ul>
    </div>
  )
}

export default Sidebar