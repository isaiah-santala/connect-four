import React from 'react'
import Token from './Token'

const Columns = (props) => {
    return (
        <div className="column">
            <button className="button" onClick={() => props.placeToken(props.id)}>v</button>
            {
                props.columns.map((e, i) => {
                    return (
                        <Token 
                            token={e} 
                            key={i}
                            player={props.player}
                        />
                    )
                })
            }
        </div>
    )
}

export default Columns