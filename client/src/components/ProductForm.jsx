import React, { useState } from 'react'
import { createNewProduct } from '../context/ProductContext'

const ProductForm = () => {
    const [body, setBody] = useState(null)
    const createProduct = createNewProduct()
    const handleChange = e => {
        setBody(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))
    }
    // console.log("body", body)
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            createProduct(body)
        }} style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%"
        }}>
            <div>
                <label htmlFor="">Product Name</label>
                <input type="text" name="name" value={body?.name} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Product Description</label>
                <textarea name="description" value={body?.description} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Product Price</label>
                <input type="number" name="price" value={body?.price} onChange={handleChange} />
            </div>
            <div>
                <label htmlFor="">Product Stock</label>
                <input type="number" name="stock" value={body?.stock} onChange={handleChange} />
            </div>
             <div>
                <button>Save New Product</button>
             </div>
        </form>
    )
}

export default ProductForm