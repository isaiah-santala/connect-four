import React from 'react'

const Winner = (props) => {
    return (
        <div className="winner">
            <h1>{props.winner} wins!</h1>
        </div>
    )
}

export default Winner