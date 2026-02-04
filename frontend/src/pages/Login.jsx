import {useState} from 'react'

const Login = () => {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: ''
  })

  const [success, setSuccess] = useState('')

  const [error, setError] = useState("")

  const handleChange = e => setState(prev => ({...prev, [e.target.name]: e.target.value}))

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(state),
        headers: {
          'content-type': "application/json"
        }
      })
      if(!res.ok) {
        const errorMsg = await res.text()
        setError(JSON.parse(errorMsg)?.msg)
        return 
      }
      const data = await res.json()
      console.log("ok", data)
      setSuccess(data?.msg)
      // console.log("response", await res.text())
    } catch (error) {
      console.log("error in login user", error)
    }
  }

  console.log("state", state, error)

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
      {error && <p style={{color: "red"}}>{error}</p>}
      {success && <p style={{color: "green"}}>{success}</p>}
    </form>
  )
}

export default Login