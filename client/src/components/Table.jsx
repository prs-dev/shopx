import React, { useEffect, useState } from 'react'

//central component to be used everywhere required
const Table = ({ data }) => {
    const [headers, setHeaders] = useState(null)
    const [rows, setRows] = useState(null)
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
    console.log("table", rows)
    return (
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
                        <button>Update</button>
                        <button>Delete</button>
                    </td>
                </tr>)
            }
        </table>
    )
}

export default Table