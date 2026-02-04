import {useState} from 'react'

const Register = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ''
  })

  const handleChange = e => setState(prev => ({...prev, [e.target.name]: e.target.value}))

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          'content-type': "application/json"
        }
      })
      if(!res.ok) {
        console.log("error occured", await res.text())
        return 
      }
      const data = await res.json()
      console.log("ok", data)
      // console.log("response", await res.text())
    } catch (error) {
      console.log("error in registering user", error)
    }
  }

  console.log("state", state)

  return (
    <form onSubmit={handleSubmit} style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "10px"
    }}>
      <div>
        <label htmlFor="">Name</label>
        <input type="text" name="name" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="">Email</label>
        <input type="email" name="email" onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor="">Password</label>
        <input type="password" name="password" onChange={handleChange}/>
      </div>
      <div>
        <button>Save</button>
      </div>
    </form>
  )
}

export default Register