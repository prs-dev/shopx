const useApi = () => {
    const fetchCategories = async () => {
        const res = await fetch('/api/category/all')
        if (res.ok) {
            const { categories: data } = await res.json()
            return data
        }
    }
    const createCategory = async (state, token) => {
        const res = await fetch('/api/admin/category/create', {
            method: 'post',
            body: JSON.stringify(state),
            headers: {
                "content-type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        })
        if (res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }
    const updateCategory = async (body, token) => {
        const res = await fetch(`/api/admin/category/update/${body._id}`, {
            method: "put",
            body: JSON.stringify(body),
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }
    const deleteCategory = async (id, token) => {
        const res = await fetch(`/api/admin/category/delete/${id}`, {
            method: "delete",
            headers: {
                "content-type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        if(res.ok) {
            const data = await res.json()
            console.log(data)
        }
    }
    return {
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
}

export default useApi