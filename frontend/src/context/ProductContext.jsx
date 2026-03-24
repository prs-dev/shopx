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
                const res = await fetch('/api/products', {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                        "Authorization": `Bearer ${token}`
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
        if(user && user.role === "vendor") fetchProducts()
    }, [user?.role])

    return <ProductContext.Provider value={{ products }}>
        {children}
    </ProductContext.Provider>
}

export const allProducts = () => {
    const { products } = useContext(ProductContext)
    return products || []
}