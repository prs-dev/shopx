import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div style={{
        border: "1px solid #333",
        padding: "10px",
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center",
        width: "300px",
        height: "200px",
        borderRadius: "10px",
        gap: "10px",
        boxShadow: "2px 2px 10px rgba(0,0,0,0.5)"
    }}>
        <div>
            <h2>{product?.name}</h2>
        </div>
        <div>
            <p style={{
                fontSize: "14px",
                oveflow: "hidden",
                width: "200px"
            }}>{product?.description}</p>
        </div>
        <div>
            <p><span style={{
                fontWeight: 700
            }}>Cost:</span> {product?.price}</p>
        </div>
        <div>
            <p><span style={{
                fontWeight: 700
            }}>Currently in stock:</span> {product?.stock}</p>
        </div>
    </div>
  )
}

export default ProductCard