import React, { Component } from 'react'
import Board from './Board'
import Winner from './Winner'

class App extends Component {
    constructor(props) {
        super(props)
            
        this.state = {
            player:'x',
            board:[
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.'],
                ['.', '.', '.', '.', '.', '.']
            ],
            idx:{
                0:5, 1:5, 2:5, 3:5, 4:5, 5:5, 6:5
            },
            winner:false

        }
        this.placeToken = this.placeToken.bind(this)
        this.changeTurn = this.changeTurn.bind(this)     
        this.winCheck = this.winCheck.bind(this)   
        this.rowCheck = this.rowCheck.bind(this)
        this.colCheck = this.colCheck.bind(this)
        this.majDiagCheck = this.majDiagCheck.bind(this)
        this.checkMajDiagAt = this.checkMajDiagAt.bind(this)
        this.minDiagCheck = this.minDiagCheck.bind(this)
        this.checkMinDiagAt = this.checkMinDiagAt.bind(this)
        this.checkAll = this.checkAll.bind(this)
        this.handleWin = this.handleWin.bind(this)
    }
    placeToken(column) {
        const {board, player, idx} = this.state  
        const selected_col = board[column]
        const check = [column, idx[column]]

        selected_col[idx[column]] = player
        idx[column] = idx[column] - 1
        board[column] = selected_col

        this.setState({
            board: board,
            idx: idx,
            check: check
        }, () => this.winCheck())
    }
    winCheck() {
        if (this.checkAll()) this.handleWin()
        else this.changeTurn()
    }
    handleWin() {
        this.setState({
            winner: true
        })
    }
    colCheck() {
        const {board, player} = this.state
        for (let column of board) {
            let count = 0
            for (let token of column) {
                if (token !== player) count = 0
                else count++
                if (count >= 4) return true
            }
        }
    }
    rowCheck() {
        const {board, player} = this.state
        for (let token = 0; token < 6; token++) {
            let count = 0
            for (let column of board) {
                if (column[token] !== player) count = 0
                else count++
                if (count >= 4) return true
            }
        }
    }
    majDiagCheck() {
        const {board} = this.state
        for(let i = 0; i < board.length; i++) {
            if (this.checkMajDiagAt(i)) return true
            if (this.checkMajDiagAt(0, i)) return true
          }
          return false; 

    }
    checkMajDiagAt(col, row=0) {
        const {board, player} = this.state
        let count = 0
        for (col; col < board.length; col++) {
            if (board[col][row] !== player) count = 0
            else count++
            if (count >= 4) return true
            row++
        }
    }
    minDiagCheck() {
        const {board} = this.state

        for(let i = board.length - 1; i > -1; i--) {
          if (this.checkMinDiagAt(i)) return true
          if (this.checkMinDiagAt(board[0].length - 1, i)) return true          
        }
        return false
    }
    checkMinDiagAt(col, row=0) {
        const {board, player} = this.state
        let count = 0

        for (col; col > -1; col--) {
            if (board[col][row] !== player) count = count
            else count++
            if (count >= 4) return true
            row++
        }
        return false
    }
    checkAll() {
        if (this.rowCheck() || this.colCheck() || this.majDiagCheck() || this.minDiagCheck()) return true 
    }
    changeTurn() {
        let {player} = this.state

        if (player === 'x') player = 'o'
        else player = 'x'

        this.setState({
            player: player
        })
    }
    render() {
        return(
            <div>
                {this.state.winner ? (
                <Winner winner={this.state.player}/> 
                ) : (
                <Board state={this.state} placeToken={this.placeToken} /> 
                )}               
            </div>
        )
    }
}

export default App