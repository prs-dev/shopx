import React, { useEffect, useState } from 'react'
import { createNewProduct } from '../context/ProductContext'

const ProductForm = () => {
    const [body, setBody] = useState(null)
    const [categories, setCategories] = useState(null)
    const createProduct = createNewProduct()
    const handleChange = e => {
        setBody(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))
    }

    useEffect(() => {
        const temp = async() => {
            const res = await fetch('/api/category/all')
            const {categories: data} = await res.json()
            setCategories(data)
            setBody({category: data[0]?._id})
        }
        temp()
    }, [])  
    // console.log("body", body)
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            // console.log("body", body)
            createProduct(body)
        }} style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            height: "100vh",
            gap: "10px"
        }}>
            <div style={formDivStyles}>
                <label htmlFor="">Product Name</label>
                <input type="text" name="name" value={body?.name} onChange={handleChange} />
            </div>
            <div style={formDivStyles}>
                <label htmlFor="">Product Description</label>
                <textarea name="description" value={body?.description} onChange={handleChange} />
            </div>
            <div style={formDivStyles}>
                <label htmlFor="">Product Price</label>
                <input type="number" name="price" value={body?.price} onChange={handleChange} />
            </div>
            <div style={formDivStyles}>
                <label htmlFor="">Product Stock</label>
                <input type="number" name="stock" value={body?.stock} onChange={handleChange} />
            </div>
            <div style={formDivStyles}>
                <label htmlFor="">Category</label>
                <select name="category" onChange={handleChange} value={body?.category}>
                    <option disabled value="">Select</option>
                    {categories?.map(item => <option value={item._id}>{item.name}</option>)}
                </select>
            </div>
             <div>
                <button>Save New Product</button>
             </div>
        </form>
    )
}

export default ProductForm

const formDivStyles = {
                display: "flex",
                alignItems: 'center',
                justifyContent: "space-between",
                width: "30%"
            }