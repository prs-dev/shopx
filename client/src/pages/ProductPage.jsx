import ProductCard from "../components/ProductCard"
import { allProducts } from "../context/ProductContext"

const ProductPage = () => {
  const products = allProducts()
  return (
    <div>
      {products?.map(product => <>
        <ProductCard {...{product}}/>
      </>)}
    </div>
  )
}

export default ProductPage