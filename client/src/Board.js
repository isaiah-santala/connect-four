import React from 'react'
import Columns from './Columns'

const Board = (props) => {
    const {board, player} = props.state
    return (
        <div>
            <h2 className="turn">{player}'s turn</h2>
            <div className={'board'}>
                {
                    board.map((e, i) => {
                        return (
                            <Columns 
                                columns={e} 
                                key={i} 
                                id={i} 
                                placeToken={props.placeToken}
                                player={player}
                            />
                        )
                    })

                }
            </div>
        </div>
    )
}

export default Board