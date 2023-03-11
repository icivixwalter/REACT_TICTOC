TicToc_Progetto

	TIC TOC PROGETTO CREAZIONE
		npx create-react-app tic-toc
			@come@creare@app



	ELEMENTI TIC TOC
		tre componenti React:
			Square
				Il componente Square (quadrato) visualizza un singolo <button> 
			Board
					mentre Board visualizza una (tavola) di 9 quadrati. 
			Game
					Il componente Game (partita) visualizza una tavola con valori segnaposto che modificheremo più tardi. Attualmente, non abbiamo componenti interattivi.

		Passare Dati Mediante Props
				DA BOARD A SQUARE
					per passare i parametri chiamato PROP da board a square occorre utilizzare il metodo:
						renderSquare(i) {
    						return <Square value={i} />;
  						}



		ATTIVITA
				1) CREARE L'APPLICAZIONE	
						attivo il comando
								npx create-react-app tic-toc
				3) ELIMINARE I FILE DELLA CARTELLA tic-toc
					in questo modo rimane la cartella ed usa questo comando dos
							# Oppure, se sei su Windows:
									del *				
							torna indietro
									cd..
							devi stare fuori la cartella tic-toc del progetto.
				4) CREO I DUE FILE INDEX
						index.css = crei la griglia
									body {
									  	font: 14px "Century Gothic", Futura, sans-serif;
									  	margin: 20px;
										}
										
										ol, ul {
									  	padding-left: 30px;
										}
										
										.board-row:after {
									  	clear: both;
									  	content: "";
									  	display: table;
										}
										
										.status {
									  	margin-bottom: 10px;
										}
										
										.square {
									  	background: #fff;
									  	border: 1px solid #999;
									  	float: left;
									  	font-size: 24px;
									  	font-weight: bold;
									  	line-height: 34px;
									  	height: 34px;
									  	margin-right: -1px;
									  	margin-top: -1px;
									  	padding: 0;
									  	text-align: center;
									  	width: 34px;
										}
										
										.square:focus {
									  	outline: none;
										}
										
										.kbd-navigation .square:focus {
									  	background: #ddd;
										}
										
										.game {
									  	display: flex;
									  	flex-direction: row;
										}
										
										.game-info {
									  	margin-left: 20px;
										}

						+ 
						Nel file index. js creo tre classi 
							index.js
								//CLASE SQUARE
									class Square extends React.Component {
										  	render() {
										    	return (
										      	<button className="square">
										        	{/* TODO */}
										      	</button>
										    	);
										  	}
											}

				5) CREO LA CLASSE SQUARE
						questa classe viene inserita in :

								class Square extends React.Component {
									  	render() {
									    	return (
									      	<button className="square">
									        	{this.props.value}
									      	</button>
									    	);
									  	}
										}


				6) PROPS
					IN BOARD: Passo i dati Mediante Props modificando in Square i metodo renderSquare in modo da passare un props
					IN SQUARE : modifico RETURN inserendo onclik + this.prop.value

					?? NON HO CAPITO COME FA A PASSARE UN PROPS DA BOARD ---> SQUARE


				7) Creare un Componente Interattivo
                    Per creare un componente interattivo significa che ad ogni clik dello square
                    significa restituire un messaggio ad ogni click, nel tag button inserire
                      <button className="square"    
                            onClick={function() { console.log('click'); }}
                      >
                    Inoltre abbiamo gia creato una arrow function (funzione freccia) per event
                    handler che significa che la funzione viene richiamata quando l'evento accade.



					
             8) DIAGRAMMA DI FLUSSO FINO A QUI

             			root.render(<Game>) = creo il root
             					| 
             					|
       					Game.render 			= in partenza chiam Game e il suo rendere
       							|
       							|
 							Board.render 			= all'interno di Game viene chimato il render di Board
 									|
 									|					= Board render chiama Render di Square x 9 volte
							--------------
							|9 x Square.render  	= lo square per nove volte compreso value + evento click
							|     |
							|		|
							|Square.render       = nel render di Square viene passato il valore di i + onclick
							|  value={i}
							|
							| button onclick()
							|
							----------------

				 9) LO STATO DEI COMPONENTI REACT
				 		La classe Square deve ricordare lo stato cliccato quindi viene creato un costruttore
				 			constructor(props) {
									    super(props);
									    this.state = {
									      value: null,
									    };

					    Come nelle classi java devi chiamare il super costruttore quando viene definita
					    una classe derivata o sottoclasse anche in React che hanno un costruttore devono
					    sempre chiamare un super (props) come prima istruzione.

			    10) ELEVARE LO STATO 
			    	Occorre elevare lo stato in modo si possa mantenere lo stato del gioco nel componente padre Board invece che in ogni Square. Il componente Board può riportare ad ogni Square cosa visualizzare semplicemente passando una prop, così come abbiamo fatto quando abbiamo passato un numero ad ogni Square.
			    	STATO CONDIVISO = uno stato definito nel componente padre che viene condiviso sia tra padre e figlio e sia tra i figli. Quindi il padre passa questo stato condiviso in basso
			    	ai figli utilizzando la props. Per fare questo occorre:
			    			- creare un costruttore in Boards con un array che imposta 9 nulli
			    						 constructor(props) {
									    super(props);
									    this.state = {
									      squares: Array(9).fill(null),
									    };

				    creato il costruttore occorre creare un nuovo meccanismo di passaggio della props:
				    		Modifichiamo Board per far sì che ogni Square riceva il proprio valore corrente ('X', 'O', o null). 