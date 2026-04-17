import { createContext, useEffect, useState, useContext } from "react";
import { userData, userToken } from "./UserContext";

export const ProductContext = createContext()

export const ProductContextProvider = ({ children }) => {
    const [products, setProducts] = useState(null)
    const [activeProduct, setActiveProduct] = useState(null) //for storing delete product id
    const [toUpdate, setToUpdate] = useState(null)
    const user = userData()
    const token = userToken()
    useEffect(() => {
        // if(role === "vendor") console.log("here is VENDOR!@")
        const fetchProducts = async () => {
            setProducts(null)
            try {
                const res = await fetch(`/api/products${user.role === "vendor" ? `?vendorId=${user.vendorId}` : ''}`, {
                    method: "get",
                    headers: {
                        "content-type": "application/json",
                    }
                })
                if (res.ok) {
                    const { products: data } = await res.json()
                    setProducts(data)
                }
            } catch (error) {
                console.log("error in fetching products", error)
            }
        }
        fetchProducts()
    }, [token, activeProduct])

    const createProduct = async (body) => {
        try {
            const res = await fetch('/api/products/create', {
                method: "post",
                body: JSON.stringify(body),
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.ok) {
                const { product } = await res.json()
                console.log("product data", product)
                setProducts(prev => [...prev, product])
            }
        } catch (error) {
            console.log("error in creating product", error)
        }
    }

    const deleteProduct = async () => {
        try {
            const res = await fetch(`/api/products/delete/${activeProduct}`, {
                method: "delete",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            console.log("operation comepleted", res)
        } catch (error) {
            console.log("error in deleting product", error)
        }
    }

    console.log("active product", activeProduct, toUpdate)

    const fetchSingleProduct = async () => {
        try {
            const res = await fetch(`/api/products/${toUpdate}`, {
                method: "get",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
            const data = await res.json()
            // console.log("update data fetched", data)
            return data
        } catch (error) {
            console.log("error in fetching details of single product")
        }
    }

    const updateProduct = async (body) => {
        try {
            const res = await fetch(`/api/products/update/${toUpdate}`, {
                method: "put",
                body: JSON.stringify(body),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "content-type": "application/json"
                }
            })
            console.log("operation comepleted", res)
        } catch (error) {
            console.log("error in updating product", error)
        }
        // console.log("bodyyyyyyyyyyyyyyyyyyyy", body)
    }

    return <ProductContext.Provider value={{ products, createProduct, activeProduct, setActiveProduct, deleteProduct, setToUpdate, fetchSingleProduct, updateProduct }}>
        {children}
    </ProductContext.Provider>
}

//different hooks for different functions, but can be squised into one hook that provides many functions
export const allProducts = () => {
    const { products } = useContext(ProductContext)
    return products || []
}

export const createNewProduct = () => {
    const { createProduct } = useContext(ProductContext)
    return (body) => createProduct(body) //callback that takes body and passes to create product function, this way no need to async/await in this functions
}

export const useSetActiveProduct = () => {
    const { activeProduct, setActiveProduct } = useContext(ProductContext)
    return { activeProduct, setActiveProduct }
}

export const deleteExistingProduct = () => {
    const { deleteProduct } = useContext(ProductContext)
    return deleteProduct
}

export const useSetToUpdate = () => {
    const { setToUpdate } = useContext(ProductContext)
    return setToUpdate
}

export const useFetchSingleProduct = () => {
    const {fetchSingleProduct} = useContext(ProductContext)
    return fetchSingleProduct
}

export const updateExistingProduct = () => {
    const {updateProduct} = useContext(ProductContext)
    return updateProduct
}