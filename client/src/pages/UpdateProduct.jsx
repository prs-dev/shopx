import React, { useEffect, useState } from 'react'
import { updateExistingProduct, useFetchSingleProduct } from '../context/ProductContext'

const UpdateProduct = () => {
    const fetchSingleProduct = useFetchSingleProduct()
    const updateProduct = updateExistingProduct()
    const [body, setBody] = useState()
    useEffect(() => {
       fetchSingleProduct()
       .then(data => setBody({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
       }))
    }, [])
    // console.log("fetchsiog", fetchSingleProduct)
    const handleChange = e => {
        setBody(prev => ({ ...prev, [e.target.name]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))
    }
    console.log("bpodydydyd", body)
  return (
    <form onSubmit={(e) => {
            e.preventDefault()
            updateProduct(body)
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
                <button>Update Product</button>
             </div>
        </form>
  )
}

export default UpdateProduct