import React, { useEffect, useState } from 'react'
import { useSetActiveProduct, deleteExistingProduct, useSetToUpdate } from '../context/ProductContext'
import Dialog from './Dialog'
import { useNavigate } from 'react-router-dom'
//central component to be used everywhere required
const Table = ({ data }) => {
    const [headers, setHeaders] = useState(null)
    const [rows, setRows] = useState(null)
    const {activeProduct, setActiveProduct} = useSetActiveProduct()
    const setToUpdate = useSetToUpdate()
    const deleteProduct = deleteExistingProduct()
    const navigate = useNavigate()
    useEffect(() => {
        if (data && data.length > 0) {
            setHeaders(Object.keys(data[0]).filter(item => item !== "__v" && item !== "createdAt" && item !== 'updatedAt' && item !== 'vendor'))
            const rowData = data.map(item => {
                delete item.__v
                delete item.createdAt
                delete item.updatedAt
                // delete item._id
                delete item.vendor
                return item
            })
            setRows(rowData)
        }
    }, [data])
    // console.log("table", Object.keys(data[0]))
    console.log("table", rows, setActiveProduct)
    return (
        <>
            <table>
                <tr>
                    {/* {Object.keys(data?.[0])?.map(item => <td>{item}</td>)} */}
                    {headers?.map(item => <th>{item}</th>)}
                    <th>Operations</th>
                </tr>
                {
                    data?.map(item => <tr>
                        {Object.values(item)?.map(i => <td>{i}</td>)}
                        <td>
                            <button onClick={() => {
                                setToUpdate(item._id)
                                navigate('/vendor/product/update/' + item._id)
                            }}>Update</button>
                            <button onClick={() => setActiveProduct(item._id)}>Delete</button>
                        </td>
                    </tr>)
                }
            </table>
            {activeProduct && <Dialog operation={deleteProduct} close={setActiveProduct}/>}
        </>
    )
}

export default Table