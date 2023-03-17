import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

//CLASSE SQUARE - FIGLIO - //modificato la SQUARE E TRASFORMATA IN UN COMPONENTE A FUNZIONE
// class Square extends React.Component {
//     /*HO inserito in costruttore per modificare lo stato, in quanto
//     * i props sono proprieta di sola lettura. Quindi se si vuole modificare
//     * le props occorre creare un oggetto
//     *
//     * ALTRA MODIFICA
//     * @CODICE---> 10_03_Square_RimossoCostruttore = Square non tiene piu traccia della partita passa a Board
//     *
//     *
//         constructor(props) {
//             super(props);
//             this.state = {value: null,};
//         }
//
//      */
//
//
//     //metodo render di square che ritorna un Button + un click + un valore di i
//     render() {
//         return (
//             // definisci l'evento nell'onClick
//             //componente BUTTON del DOM di react
//             <button
//                 className="square"
//                 // @CODICE---> 10_02_Square_ModificaDa_state_a_props.onclick
//                 // CON QUESTA modifica, si ha l'evento su uno square, che viene cliccato
//                 //viene richiamata la funzione OnClick che viene fornita da Board : ... this.props.onClick()}
//                 onClick={() => this.props.onClick()}
//                 //sospeso = mette le x --->  onClick={() => this.setState({value: 'X'})}
//             >
//                 {/*//@CODICE---> 10_01_Square_ModificaDa_state_a_props*/}
//                 {/*//---> sospeso {this.state.value}*/}
//                 {this.props.value}
//             </button>);
//     }/*render fine */
// }
/*SQUARE - DA CLASSE A COMPONENTE A FUNZIONE
@CODICE---> 13_00_Square_ComponenteAFunzione = Traformato la classe square in un componente a funzione.
    Abbiamo cambiato this.props in props in entrambi i casi.
 */
function Square(props) {
   return (
      // onClick nella versiona corta senza funzione freccia: () => this.props.onClick()}
      <button className="square" onClick={props.onClick}>
         {/*anche qui senza this.props.value*/}
         {props.value}
      </button>
   );
}

//CLASSE BOARD - GENITORE -
/* sospeso x = 1;
  creo il costruttore per mantere in board lo stato del padre e dei figli
  @CODICE---> 09_stato_in_Square = costruisco un costruttore
              per ricordare lo stato del clcick dello square quindi elevo lo stato
              da Square a board.
    //09_stato_in_Square +
    @CODICE---> 17_01_RimozioneCostruttoreBoard = viene rimosso il costruttore perchè il
                                                controllo passa al costruttore di Game.


    @CODICE---> 17_05_RenderRimossoInBOARD = Game reinderizza la partita rimosso i Board.
            Dato che adesso è il componente Game a renderizzare lo stato della partita,
            possiamo rimuovere il relativo codice ridondante dal metodo render di Board.


    @CODICE---> 17_06_SpostoHANLECLICK_DaBOARD_a_GAME
    Infine, dobbiamo spostare il metodo handleClick dal componente Board al componente Game.


*/
class Board extends React.Component {
   /* sospeso x = 1;*/

   //17_01_RimozioneCostruttoreBoard
   // constructor(props) {
   //     super(props);
   //     this.state = {
   //         //imposto 9 null con l'array mediante fill
   //         squares: Array(9).fill(null),
   //         //@CODICE---> 14_01_Turno = inversione boolean del turno definitito (X poi O)
   //         xIsNext: true,
   //     };
   // }


   //17_06_SpostoHANLECLICK_DaBOARD_a_GAME
   //------------------------------------------------------------------------------------------//

   /*11_HandleClick_in_Square = BOARD mantiene lo stato nei vari componenti
   * di square */
   // handleClick(i) {
   //     //@CODICE---> 12_01_slice = copia l'array in sola lettura
   //     const squares = this.state.squares.slice();  //.slice = viene fatta una copia dell'array squares MA NON VIENE MODIFICATO
   //
   //     //ignora click se partita vinta o Square riempito, ritorna
   //     //ignorando il click
   //     if (calculateWinner(squares) || squares[i]) {
   //         return;
   //     }
   //
   //
   //     //@CODICE---> 14_02_InversioneSTato = inversione dello stato da X a O
   //     squares[i] = this.state.xIsNext ? 'X' : 'O';
   //     this.setState({
   //         squares: squares,
   //         //inversione dello stato
   //         xIsNext: !this.state.xIsNext,
   //     });
   //
   //
   // }

   //------------------------------------------------------------------------------------------//


   /*  @CODICE---> 09_02_Modifico_METODO_RenderSquare = Modifichiamo Board per inviare un PROPS a SQUARE in modo
                       che riceva il valore corrente X, O o null per ogni square, e visto che IL COSTRUTTORE DI BOARD
                       è stato modificato viene anche modificato il METODO RenderSquare di Board facendo si che
                       possa leggere l'array
   */
   renderSquare(i) {

      return (
         <Square
            /*TUTTE_LE_MODIFICHE
               @CODICE---> 09_03_Modifico_METODO_RenderSquare_PROPS_FUNZIONE = Per informare Board quando uno
                    square è cliccato modifichiamo la funzione Square, con la quale INVIAMO  A Modifichiamo Board per inviare un PROPS a SQUARE in modo
                        che riceva il valore corrente X, O o null per ogni square, e visto che IL COSTRUTTORE DI BOARD
                        è stato modificato viene anche modificato il METODO RenderSquare di Board facendo si che
                        possa leggere l'array - ATTENZIONE è stato diviso square in piu linee per leggibilita ed
                        aggiunto le parantesi (); per fare in modo che JavaScript NON INSERISCA IL ; dopo RERTURN per
                        evitare che il codice non funzioni piu.
                        N.B. in conclusione BOARD ----> SQUARE passa 2 propos value + on click

                //@CODICE---> 09_02_stato_in_Square
                //2 props passate da Board a Square. +
                //@CODICE---> 17_02_SostituzioneStateConPropsInBoard = viene sostituito lo stato conil props nel
                                    // metodo rederSquare perche il controllo passa al costruttore di Game.
                                    //value={this.state.squares[i]}
            */
            value={this.props.squares[i]}

            /*TUTTE LE MODIFICHE ONCLICK
                // props che viene richiamata da Square quando viene cliccata. +
                //@CODICE---> 17_03_SostituzioneTHIS_In_HANDLE = 	Sostituire this.handleClick(i) con
                // this.props.onClick(i) nel metodo renderSquare di Board.
                //sostituito con props ---> onClick={() => this.handleClick(i)}

             */
            onClick={() => this.props.onClick(i)}
         />
      );
   }

   /*
       @CODICE---> 17_04_RenderGameStoricoPartita = render di Game
       reinderizza la partita.
       Modifichiamo la funzione render del componente Game per far
       sì che utilizzi l’elemento più recente nello storico per
       visualizzare lo stato della partita.
   * */
   render() {


      //17_05_RenderRimossoInBOARD
      // ----------------------------------------------------------------//
      //         //@CODICE---> 15_02_VerificaVincitore = viene chiamata la funzione di verifica del vincitore
      //         const winner = calculateWinner(this.state.squares);
      //
      //         let status;
      //         if (winner) {
      //             status = 'Winner: ' + winner;
      //         } else {
      //             //il testo che va fuori la griglia
      //             //@CODICE---> 14_04_RenderInforma = viene cambiato lo status nel Render per informare a video il giocatore del turno successivo
      //             status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      //         }
      //----------------------------------------------------------------//

      //sospeso inserito nella else ---> const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

      return (
         /*?? STATUS non c'e nel render dell'esercizio ??    <div className="status">{status}</div> */
         <div>

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



/*CLASSE GAME = QUADRATO - FIGLIO DI BOARD

@CODICE---> 16_01_ElevareLoStatoSuGAME = rimuovere lo stato da Board figlio e passarlo a Game. Viene elevato il livello dello
                                         stato predisponendo il Pieno CONTROLLO di Garme su BOARD con possibilita di visualizzare i turni
                                          precedenti con la funzione history.Impostare LO STATO INIZIALE DI GAME NEL COSTRUTTORE.
@CODICE---> 17_00_IMPOSTARE_LO_STATO_INIZIALE_IN_GAME
                Prima di tutto, dobbiamo impostare lo stato iniziale del componente Game nel suo costruttore:

@CODICE---> 17_06_SpostoHANLECLICK_DaBOARD_a_GAME
				    	Infine, dobbiamo spostare il metodo handleClick dal componente Board al componente Game.


@CODICE---> 19_02_STEP_NUMBER_GAME = Aggiungere uno stemp nember al costruttore di Game impostato a 0.


@CODICE---> 19_03_JUMPTO_GAME = definito il metodo jumpTo in Game per aggiornare stepNumber
            ed impostiamo xIsNext = True se stiamo impostando un numero pari.

* */
class Game extends React.Component {

   //@CODICE---> 16_01_ElevareLoStatoSuGAME
   //@CODICE---> 17_00_IMPOSTARE_LO_STATO_INIZIALE_IN_GAME
   //@CODICE---> 17_06_SpostoHANDLECLICK_DaBOARD_a_GAME
   //_________________________________________________________//
   constructor(props) {
      super(props);

      this.state = {
         history: [{
            squares: Array(9).fill(null),
         }],
         //@CODICE---> 19_02_STEP_NUMBER_GAME
         stepNumber: 0,
         xIsNext: true,
      };
   }


   //_________________________________________________________//

   //@CODICE---> 17_06_SpostoHANDLECLICK_DaBOARD_a_GAME
   //_________________________________________________________//
   handleClick(i) {
      //SOSPESO ---> const history = this.state.history;
      //@CODICE---> 19_05_MOSSA_VISUALIZZATA = va indietro nelle mosse e se facciamo una nuova mossa questo stato viene rinnovato
      const history = this.state.history.slice(0, this.state.stepNumber + 1);

      //@CODICE---> 19_06_AGGIORNAMENTO_NUOVA_MOSSA = ogni nuova mossa viene aggiornato stepNumber
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
         return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
         //ATTENZIONE il metodo concat non muta l'array originale rispetto al metodo push.
         history: history.concat([{
            squares: squares
         }]),
         //aggiunto ??? quale codice ???
         stepNumber: history.length,
         xIsNext: !this.state.xIsNext,
      });
   }

   //_________________________________________________________//

   //@CODICE---> 19_03_JUMPTO_GAME
   //_________________________________________________________//

   jumpTo(step) {
      this.setState({
         stepNumber: step,
         xIsNext: (step % 2) === 0,
      });
   }
   //_________________________________________________________//




   /* ....................  RENDER   .............................................
     //@CODICE---> 17_04_RenderGameStorico = render di Game reinderizza la partita.
             * Modifichiamo la funzione render del componente Game per far sì che utilizzi l’elemento più recente
             * nello storico per visualizzare lo stato della partita.
       @CODICE---> 18_01_MAPPARE_STORICO_MOSSE_IN_GAME = Mappo lo storico delle mosse
       @CODICE---> 19_01_KEY_IN_RENDER_GAME = viene aggiunta nel metodo render la chiave univoca
            <li key={move}> dopodiché il messaggio di avviso di React riguardo le chiavi dovrebbe sparire.

   */

   //_________________________________________________________//
   render() {


      //@CODICE---> 17_04_RenderGameStoricoPartita
      //----------------------------------------------------------------//

      const history = this.state.history;
      //sospeso --->   const current = history[history.length - 1];

      //@CODICE---> 19_07_RECUPERO_PARTITE_PRECEDENTI = recupera la storicizzazione delle partite.
      //dovrebbe visualizzare l'ultima mossa - se manca questo non visualizzi la storicizzazione precedente.
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);


      //@CODICE---> 18_01_MAPPARE_STORICO_MOSSE_IN_GAME
      //----------------------------------------------------------------//
      const moves = history.map((step, move) => {
         const desc = move ?
            'Go to move #' + move :
            'Go to game start';
         return (
            //@CODICE---> 19_01_KEY_IN_RENDER_GAME = viene aggiunta nel metodo render la chiave univoca
            <li key={move}>
               <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>
         );
      });
      //----------------------------------------------------------------//

      let status;
      if (winner) {
         status = 'Winner: ' + winner;
      } else {
         status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
      //----------------------------------------------------------------//


      return (
         <div className="game">
            <div className="game-board">
               <Board
                  /*@CODICE---> 18_02_MAPPARE_STORICO_MOSSE_IN_GAME_board+onclick */
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
               />
            </div>
            <div className="game-info">
               {/*@CODICE---> 18_03_MAPPARE_STORICO_MOSSE_IN_GAME_status+move */}
               <div>{status}</div>
               <ol>{moves}</ol>
            </div>
         </div>
      );
   }

   //_________________________________________________________//

} //FINE class Game extends React.Component ***


//ATTIVO IL PROGETTO
// ========================================//
//costruisco l'albero root con i figli Game
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>); // chiama il metodo rendere di Game


//@CODICE---> 15_01_Vincitore = funzione che calcola il vincitore
function calculateWinner(squares) {
   const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
   ];
   for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
         return squares[a];
      }
   }
   return null;
}