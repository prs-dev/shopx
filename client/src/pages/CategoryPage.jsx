import { useEffect, useState } from 'react'
import { userToken } from '../context/UserContext'
import useApi from '../utils/useApi'
import Dialog from '../components/Dialog'

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
    const [active, setActive] = useState(null) //active category data to update
    const [toDel, setToDel] = useState(null)
    const [state, setState] = useState()
    const token = userToken()

    const { fetchCategories, createCategory, updateCategory, deleteCategory } = useApi()

    const handleChange = e => {
        if (active) {
            setActive(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
        setState(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    useEffect(() => {
        if (token) {
            fetchCategories()
                .then(data => setCategories(data))
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        createCategory(state, token)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        updateCategory(active, token)
    }

    console.log("categories", categories, active)
    return (
        <div style={{
            display: 'flex',
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            {/* category list */}
            <div style={{
                padding: "20px",
                display: 'flex',
                flexDirection: "column",
                flex: 1,
                gap: "10px"
            }}>
                {categories?.map(item => <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px"
                }}>
                    <h2>{item.name}</h2>
                    <p>{item.description}</p>
                    {item.products?.map(product => <div>{product}</div>)}
                    <div>
                        <button onClick={() => setActive(item)}>update</button>
                        <button onClick={() => setToDel(item)}>delete</button>
                    </div>
                </div>)}
            </div>
            {/* add category */}
            <form style={{
                padding: "20px",
                flex: 1
            }} action="" onSubmit={active ? handleUpdate : handleSubmit}>
                <div>
                    <h2>{active ? 'Update' : "Add new"} category</h2>
                </div>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" value={active ? active?.name : state?.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="">Description</label>
                    <textarea type="text" name="description" value={active ? active?.description : state?.description} onChange={handleChange} />
                </div>
                <div><button>{active ? "Update" : "Save"}</button></div>
            </form>
            {toDel && <Dialog close={setToDel} operation={() => deleteCategory(toDel._id, token)}/>}
        </div>
    )
}

export default CategoryPage