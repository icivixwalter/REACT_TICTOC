import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


//CLASSE BOARD - GENITORE -

class Board extends React.Component {
    /* sospeso x = 1;
    creo il costruttore per mantere in board lo stato del padre e dei figli
    @CODICE---> 09_stato_in_Square = costruisco un costruttore
                per ricordare lo stato del clcick dello square quindi elevo lo stato
                da Square a board.


     */

    //09_stato_in_Square
    constructor(props) {
        super(props);
        this.state = {
            //imposto 9 null con l'array mediante fill
            squares: Array(9).fill(null),
        };
    }

    /*11_HandleClick_in_Square = BOARD mantiene lo stato nei vari componenti
    * di square */
    handleClick(i) {
        const squares = this.state.squares.slice();
        squares[i] = 'X';
        this.setState({squares: squares});
    }


    /*  @CODICE---> 09_02_Modifico_METODO_RenderSquare = Modifichiamo Board per inviare un PROPS a SQUARE in modo
                        che riceva il valore corrente X, O o null per ogni square, e visto che IL COSTRUTTORE DI BOARD
                        è stato modificato viene anche modificato il METODO RenderSquare di Board facendo si che
                        possa leggere l'array
    */
    renderSquare(i) {
        return (
            <Square
                /*  @CODICE---> 09_03_Modifico_METODO_RenderSquare_PROPS_FUNZIONE = Per informare Board quando uno
                    square è cliccato modifichiamo la funzione Square, con la quale INVIAMO  A Modifichiamo Board per inviare un PROPS a SQUARE in modo
                        che riceva il valore corrente X, O o null per ogni square, e visto che IL COSTRUTTORE DI BOARD
                        è stato modificato viene anche modificato il METODO RenderSquare di Board facendo si che
                        possa leggere l'array - ATTENZIONE è stato diviso square in piu linee per leggibilita ed
                        aggiunto le parantesi (); per fare in modo che JavaScript NON INSERISCA IL ; dopo RERTURN per
                        evitare che il codice non funzioni piu.
                        N.B. in conclusione BOARD ----> SQUARE passa 2 propos value + on click
    */
                //@CODICE---> 09_02_stato_in_Square
                //2 props passate da Board a Square.
                value={this.state.squares[i]}
                // props che viene richiamata da Square quando viene cliccata.
                onClick={() => this.handleClick(i)}
            />
        );
    }


    render() {
        //il testo che va fuori la griglia
        const status = 'Next player: X';

        return (
            /* */
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    } //render fine ****
    //BOARD *** FINE ***
}

//CLASSE SQUARE - FIGLIO - //modificato al posto di TODO
class Square extends React.Component {
    /*HO inserito in costruttore per modificare lo stato, in quanto
    * i props sono proprieta di sola lettura. Quindi se si vuole modificare
    * le props occorre creare un oggetto
    *
    * ALTRA MODIFICA
    * @CODICE---> 10_03_Square_RimossoCostruttore = Square non tiene piu traccia della partita passa a Board
    *
    *
        constructor(props) {
            super(props);
            this.state = {value: null,};
        }

     */


    //metodo render di square che ritorna un Button + un click + un valore di i
    render() {
        return (
            // definisci l'evento nell'onClick
            //componente BUTTON del DOM di react
            <button
                className="square"
                // @CODICE---> 10_02_Square_ModificaDa_state_a_props.onclick
                // CON QUESTA modifica, si ha l'evento su uno square, che viene cliccato
                //viene richiamata la funzione OnClick che viene fornita da Board : ... this.props.onClick()}
                onClick={() => this.props.onClick()}
                //sospeso = mette le x --->  onClick={() => this.setState({value: 'X'})}
            >
                {/*//@CODICE---> 10_01_Square_ModificaDa_state_a_props*/}
                {/*//---> sospeso {this.state.value}*/}
                {this.props.value}
            </button>);
    }/*render fine */
}


//CLASSE GAME = QUADRATO - FIGLIO DI BOARD
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
} //FINE class Game extends React.Component ***


//ATTIVO IL PROGETTO
// ========================================//
//costruisco l'albero root con i figli Game
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>); // chiama il metodo rendere di Game
