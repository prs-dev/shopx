import { useEffect, useState } from "react"
import ProductCard from "../components/ProductCard"
import { allProducts, useSetToUpdate, updateExistingProduct } from "../context/ProductContext"
import useApi from "../utils/useApi"

const ProductPage = ({role}) => {
  const [categories, setCategories] = useState(null)
  const [activeCategory, setActiveCategory] = useState("")
  const [filterProducts, setFilterProducts] = useState(null)
  const products = allProducts()
  const [activeProduct, setActiveProduct] = useState(null)
  const {fetchCategories} = useApi()
  const setToUpdate = useSetToUpdate()
  const updateProduct = updateExistingProduct()

  useEffect(() => {
    // if(role === "admin") {
      fetchCategories()
      .then(data => setCategories(data))
    // }
  }, [])
  // console.log("categories", categories, activeProduct)

  useEffect(() => {
    if(activeCategory) {
      const productsFilter = products.filter(item => item.category === activeCategory)
      setFilterProducts(productsFilter)
    }
  }, [activeCategory])

  console.log("filter", activeCategory, filterProducts)

  return (
    <div style={{
      display: "flex",
      gap: "20px",
      flexWrap: 'wrap',
      padding: "5px",
      alignItems: "center",
      justifyContent: "center",
      margin: "auto"
    }}>
      <div style={{
        alignSelf: 'flex-start',
        width: "100%",
        padding: "10px",
        border: "1px solid #333"
      }}>
        {/* filter bar */}
        <select value={activeCategory} onChange={e => setActiveCategory(e.target.value)}>
          <option value="" disabled>Select</option>
          {categories?.map(item => <option value={item._id}>{item.name}</option>)}
        </select>
        <button onClick={() => {
          setActiveCategory("")
          setFilterProducts(null)
        }}>Clear Filter</button>
      </div>
      {filterProducts ? <>{filterProducts.map(item => <ProductCard {...{product: item}}/>)}</>: products?.map(product => <>
        <ProductCard {...{product}}/>
        {role === 'admin' && <div>
          <h2>Add Category</h2>
          <select value={product.category} onChange={e => {
            const updatedProduct = {...product, category: e.target.value}
            // console.log("upode", updatedProduct)
            setToUpdate(updatedProduct._id) //set update id
            setActiveProduct(updatedProduct) //a temporary holder for update body
            // console.log("upode", updatedProduct._id)
          }}>
            <option value="" disabled>Select</option>
            {categories?.map(item => <option value={item._id}>{item.name}</option>)}
          </select>
        </div>}
        {activeProduct && <button onClick={() => updateProduct(activeProduct)}>save</button>}
      </>)}
    </div>
  )
}

export default ProductPage