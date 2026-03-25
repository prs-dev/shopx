import React from 'react'

const ProductCard = ({product}) => {
  return (
    <div>
        <div>
            <h2>{product?.name}</h2>
        </div>
        <div>
            <p>{product?.description}</p>
        </div>
        <div>
            <p>Cost: {product?.price}</p>
        </div>
        <div>
            <p>Currently in stock: {product?.stock}</p>
        </div>
    </div>
  )
}

export default ProductCard