import React from 'react'

const Dialog = ({close, operation}) => {
    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0
        }}>
            <div style={{
                width: "300px",
                height: "200px",
                border: "1px solid #333",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px"
            }}>
                <div>
                    <h2>Are you sure ?</h2>
                </div>
                <div style={{
                    display: "flex",
                    gap: "10px"
                }}>
                    <button style={{
                        padding: "10px"
                    }} onClick={operation}>Yes</button>
                    <button style={{
                        padding: "10px"
                    }} onClick={() => close(null)}>No</button>
                </div>
            </div>
        </div>
    )
}

export default Dialog