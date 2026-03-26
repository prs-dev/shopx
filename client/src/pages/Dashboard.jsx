import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, matchPath } from 'react-router-dom'
import Dialog from '../components/Dialog'
import { allProducts } from '../context/ProductContext'
import ProductForm from '../components/ProductForm'
import Table from '../components/Table'

// const Dashboard = ({role, layout, setLayout, token}) => {
const Dashboard = ({ role, token }) => {
  const location = useLocation()
  const [vendors, setVendors] = useState(null)
  const [pendingVendors, setPendingVendors] = useState(null)
  const [rejectedVendors, setRejectedVendors] = useState(null)
  const [activeVendor, setActiveVendor] = useState(null)
  const [vendorData, setVendorData] = useState(null)
  const products = allProducts()

  const fetchPendingVendors = async () => {
    try {
      const res = await fetch('/api/admin/vendor/requests', {
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (res.ok) {
        const data = await res.json()
        const pending = data?.vendors?.filter(item => item.status === 'pending')
        const rejected = data?.vendors?.filter(item => item.status === 'rejected')
        setVendors(data?.vendors)
        setPendingVendors(pending)
        setRejectedVendors(rejected)
        // console.log("testes", data)
        // console.log(await res.json())
      }
    } catch (error) {
      console.log("error in fetching vendor data", error)
    }
  }

  const fetchVendorData = async () => {
    try {
      const res = await fetch('/api/vendor', {
        method: "get",
        headers: {
          authorization: `Bearer ${token}`
        }
      })
      if (res.ok) {
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

  const approveRoute = (route) => {
    return matchPath({ path: route, exact: true }, location.pathname) ? true : false
  }

  // console.log("admin", role, token)
  // console.log("testing", location.pathname.includes("/vendor/request"))
  // console.log("pendingVendors", pendingVendors, "vendors", vendors, rejectedVendors, )
  console.log(matchPath({ path: '/login', exact: true }, location.pathname))
  if (role === "admin") return (
    <div>
      {approveRoute('/admin') && <div>
        Admin hun main
      </div>}
      {approveRoute('/admin/products') && <div>
        all products
      </div>}
      {approveRoute("/admin/vendor/requests/pending") && <div style={{ padding: "10px", display: "flex", gap: "10px" }}>
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
            <button onClick={() => setActiveVendor({ id: item._id, status: "approved" })}>Approve Request</button>
            <button onClick={() => setActiveVendor({ id: item._id, status: "rejected" })}>Reject Request</button>
          </div>
          // in future implement a table to list all requests
        )}
      </div>}
      {approveRoute("/admin/vendor/requests/all") && <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>All vendors</h2>
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          {vendors?.map(item =>
            <div style={{
              width: "200px",
              height: "200px",
              border: "1px solid #333",
              padding: "10px"
            }} key={item._id}>
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <p>Status: {item.status}</p>
              {/* <button onClick={() => setActiveVendor({id: item._id, status: "approved"})}>Approve Request</button> */}
              {/* <button onClick={() => setActiveVendor({id: item._id, status: "rejected"})}>Reject Request</button> */}
            </div>
            // in future implement a table to list all requests
          )}
        </div>
      </div>}
      {approveRoute('/admin/vendor/requests/rejected') && <div style={{ padding: "10px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <h2>Rejected vendors</h2>
        <div style={{
          display: "flex",
          gap: "10px"
        }}>
          {rejectedVendors?.map(item =>
            <div style={{
              width: "200px",
              height: "200px",
              border: "1px solid #333",
              padding: "10px"
            }} key={item._id}>
              <p>Name: {item.name}</p>
              <p>Description: {item.description}</p>
              <p>Status: {item.status}</p>
              {/* <button onClick={() => setActiveVendor({id: item._id, status: "approved"})}>Approve Request</button> */}
              {/* <button onClick={() => setActiveVendor({id: item._id, status: "rejected"})}>Reject Request</button> */}
            </div>
            // in future implement a table to list all requests
          )}
        </div>
      </div>}
      {activeVendor && <Dialog close={setActiveVendor} operation={activeVendor.status === "approved" ? handleApprove : handleReject} />}
    </div>
  )
  if (role === "vendor") return (
    <>
      {approveRoute('/vendor') && <div>
        vendor hun main
        <div>
          <p>Name: {vendorData?.vendor?.name}</p>
          <p>Description: {vendorData?.vendor?.description}</p>
        </div>
      </div>}

      {approveRoute("/vendor/products") && 
       
        <Table data={products}/>
        }

      {approveRoute("/vendor/product/new") && <div
        style={{
          display: 'flex',
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100vw"
        }}
      ><ProductForm /></div>}
    </>
  )
}

export default Dashboard