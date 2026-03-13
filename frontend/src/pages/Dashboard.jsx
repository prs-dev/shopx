import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Dialog from '../components/Dialog'

// const Dashboard = ({role, layout, setLayout, token}) => {
const Dashboard = ({ role, token }) => {
  const location = useLocation()
  const [pendingVendors, setPendingVendors] = useState(null)
  const [activeVendor, setActiveVendor] = useState(null)
  const [vendorData, setVendorData] = useState(null)

  const fetchPendingVendors = async () => {
    try {
      const res = await fetch('/api/admin/vendor/requests', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        setPendingVendors(data?.vendors)
        // console.log("testes", data)
        // console.log(await res.json())
      }
    } catch (error) {
      console.log("error in fetching vendor data", error)
    }
  }

  const fetchVendorData = async() => {
    try {
      const res = await fetch('/api/vendor', {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if(res.ok) {
        const data = await res.json()
        setVendorData(data)
      }
    } catch (error) {
      console.log("error in fetching vendor data")
    }
  }

  useEffect(() => {
    if (role === 'admin' && token) {
      fetchPendingVendors()
    }
  }, [role])

  useEffect(() => {
    if (role === 'vendor' && token) {
      fetchVendorData()
    }
  }, [role])

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/admin/vendor/${activeVendor.id}`, {
        method: "post",
        body: JSON.stringify({
          status: "approved"
        }),
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if (res.ok) {
        console.log("vendor approved")
        setActiveVendor(null)
      }
    } catch (error) {
      console.log("error in approving vendor", error)
    }
  }

  const handleReject = async () => {
    try {
      const res = await fetch(`/api/admin/vendor/${activeVendor.id}`, {
        method: "post",
        body: JSON.stringify({
          status: "rejected"
        }),
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if (res.ok) {
        console.log("vendor rejected")
        setActiveVendor(null)
      }
    } catch (error) {
      console.log("error in rejecting vendor", error)
    }
  }

  // console.log("admin", role, token)
  // console.log("testing", location.pathname.includes("/vendor/request"))
  if (role === "admin") return (
    <div>
      {location.pathname.includes("/vendor/request") && <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
        {pendingVendors?.map(item =>
          <div style={{
            width: "200px",
            height: "200px",
            border: "1px solid #333",
            padding: "10px"
          }} key={item._id}>
            <p>Name: {item.name}</p>
            <p>Description: {item.description}</p>
            <p>Status: {item.status}</p>
            <button onClick={() => setActiveVendor({id: item._id, status: "approved"})}>Approve Request</button>
            <button onClick={() => setActiveVendor({id: item._id, status: "rejected"})}>Reject Request</button>
          </div>
          // in future implement a table to list all requests
        )}
      </div>}
      {activeVendor && <Dialog close={setActiveVendor} operation={activeVendor.status === "approved" ? handleApprove : handleReject}/>}
    </div>
  )
  if (role === "vendor") return (
    <div>
      vendor hun main
      <div>
        <p>Name: {vendorData?.vendor?.name}</p>
        <p>Description: {vendorData?.vendor?.description}</p>
      </div>
    </div>
  )
}

export default Dashboard