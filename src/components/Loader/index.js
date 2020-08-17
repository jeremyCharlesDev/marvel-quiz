import React from 'react'
import './Loader.css'

const Loader = ({ loadingMsg, styling }) => {
    return (
        <>
            <div className="loader"></div>
            <p style={styling}>
                {loadingMsg}
            </p>            
        </>
    )
}

export default Loader
