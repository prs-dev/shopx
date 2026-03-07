import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const VendorRegister = ({token}) => {
  const [state, setState] = useState(null)
  const navigate = useNavigate()
  const handleChange = (e) => {
    setState(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch('/api/vendor/create', {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`
        }
      })
      if(res.ok) {
        console.log("vendor created", await res.json())
        navigate('/vendor')
      }
    } catch (error) {
      console.log("error in new vendor creation", error)
    }
  }
  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="">Name</label>
          <input type="text" name="name" onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="">Description</label>
          <input type="text" name="description" onChange={handleChange} />
        </div>
        <div>
          <button>Save</button>
        </div>
      </form>
    </div>
  )
}

export default VendorRegister