const useApi = () => {
    const fetchCategories = async() => {
        const res = await fetch('/api/category/all')
        if(res.ok){
            const {categories: data} = await res.json()
            return data
        }
    }
    return {
        fetchCategories
    }
}

export default useApi