import {useEffect, useState} from 'react'
import { userToken } from '../context/UserContext'

// const dummy = [
//         {
//             id: 1,
//             name: "test 1",
//             description: "test category 1"
//         },
//         {
//             id: 2,
//             name: "test 2",
//             description: "test category 2"
//         },

//     ]

const CategoryPage = () => {
    const [categories, setCategories] = useState(null)
    const [state, setState] = useState()
    const token = userToken()

    const handleChange = e => setState(prev => ({...prev, [e.target.name]: e.target.value}))

    const fetchAllCategories = async() => {
        const res = await fetch('/api/category/all')
        if(res.ok) {
            const {categories: data} = await res.json()
            setCategories(data)
        }
    }

    useEffect(() => {
        if(token) fetchAllCategories()
    }, [])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const res = await fetch('/api/admin/category/create', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }

    console.log("categories", categories)
  return (
    <div>
        {/* category list */}
        <div>
            {categories?.map(item => <div>
                <h2>{item.name}</h2>
                <p>{item.description}</p>
                {item.products?.map(product => <div>{product}</div>)}
            </div>)}
        </div>
        {/* add category */}
        <form action="" onSubmit={handleSubmit}>
            <div>
                <h2>Add new category</h2>
            </div>
            <div>
                <label htmlFor="">Name</label>
                <input type="text" name="name" onChange={handleChange}/>
            </div>
            <div>
                <label htmlFor="">Description</label>
                <textarea type="text" name="description" onChange={handleChange}/>
            </div>
            <div><button>Save</button></div>
        </form>
    </div>
  )
}

export default CategoryPage