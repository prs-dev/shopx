import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Dialog from '../components/Dialog'

// const Dashboard = ({role, layout, setLayout, token}) => {
const Dashboard = ({ role, token }) => {
  const location = useLocation()
  const [pendingVendors, setPendingVendors] = useState(null)
  const [activeVendor, setActiveVendor] = useState(null)

  useEffect(() => {
    const fetchVendorData = async () => {
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
    if (role === 'admin' && token) {
      fetchVendorData()
    }
  }, [role])

  const handleApprove = async() => {
    try {
      const res = await fetch(`/api/admin/vendor/${activeVendor}`, {
        method: "post",
        body: JSON.stringify({
          status: "approved"
        }),
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json"
        }
      })
      if(res.ok) {
        console.log("vendor approved")
        setActiveVendor(null)
      }
    } catch (error) {
      console.log("error in approving vendor", error)
    }
  }

  // console.log("admin", role, token)
  // console.log("testing", location.pathname.includes("/vendor/request"))
  if (role === "admin") return (
    <div>
      {location.pathname.includes("/vendor/request") && <div style={{padding: "10px", display: "flex", gap: "10px"}}>
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
            <button onClick={() => setActiveVendor(item._id)}>Approve Request</button>
            <button>Reject Request</button>
          </div>
          // in future implement a table to list all requests
        )}
      </div>}
      {activeVendor && <Dialog close={setActiveVendor} accept={handleApprove}/>}
    </div>
  )
  if (role === "vendor") return (
    <div>
      vendor
    </div>
  )
}

export default Dashboard