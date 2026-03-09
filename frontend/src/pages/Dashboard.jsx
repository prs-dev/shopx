import React, {useState} from 'react'
import { useEffect } from 'react'

const Dashboard = ({role, layout, setLayout, token}) => {
  const [vendorData, setVendorData] = useState(null)
  useEffect(() => {
    const fetchVendorData = async() => {
      try {
        const res = await fetch('/api/vendor', {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        if(res.ok) {
          console.log(await res.json())
        }
      } catch (error) {
        console.log("error in fetching vendor data", error)
      }
    }
    if(role === 'vendor' && token) {
      fetchVendorData()
    }
  }, [role])
  if (role === "admin") return (
    <div>
      {layout === "admin-vendor" && <div>allvendors</div>}
    </div>
  )
  if (role === "vendor") return (
    <div>
      
    </div>
  )
}

export default Dashboard