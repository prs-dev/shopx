import React from 'react'

const Dashboard = ({role}) => {
  if (role === "admin") return (
    <div>
      admin
    </div>
  )
  if (role === "vendor") return (
    <div>
      vendor
    </div>
  )
}

export default Dashboard