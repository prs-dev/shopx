import Sidebar from '../components/Sidebar'
import Dashboard from '../pages/Dashboard'

const Homepage = () => {
  return (
    <div style={{
      display: "flex"
    }}>
      <div>
        <Sidebar />
      </div>
      <div>
        <Dashboard />
      </div>
    </div>
  )
}

export default Homepage