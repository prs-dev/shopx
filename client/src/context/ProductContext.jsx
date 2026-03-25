import { createContext, useEffect, useState, useContext } from "react";
import { userData, userToken } from "./UserContext";

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null)
    const user = userData()
    const token = userToken()
    useEffect(() => {
        // if(role === "vendor") console.log("here is VENDOR!@")
        const fetchProducts = async () => {
            try {
                const res = await fetch(`/api/products${user.role === "vendor" ? `?vendorId=${user.vendorId}` : ''}`, {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                    }
                })
                if (res.ok) {
                    const {products: data} = await res.json()
                    setProducts(data)
                }
            } catch (error) {
                console.log("error in fetching products", error)
            }
        }
         fetchProducts()
    }, [])

    const createProduct = async(body) => {
        try {
            const res = await fetch('/api/products/create', {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if(res.ok) {
                const {product} = await res.json()
                console.log("product data", product)
                setProducts(prev => [...prev, product])
            }
        } catch (error) {
            console.log("error in creating product", error)
        }
    }

    return <ProductContext.Provider value={{ products, createProduct }}>
        {children}
    </ProductContext.Provider>
}

export const allProducts = () => {
    const { products } = useContext(ProductContext)
    return products || []
}

export const createNewProduct = () => {
    const { createProduct } = useContext(ProductContext)
    return (body) => createProduct(body) //callback that takes body and passes to create product function, this way no need to async/await in this functions
}