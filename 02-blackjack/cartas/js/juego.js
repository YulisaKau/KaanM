  /**
   * 2c = two of clubs(treboles)
   * 2d = two of diamons(diamantes)
   * 2h = two of herts(corazones)
   * 2s = two of spadees(espadas)
   */

  const miModulo = (() =>  {
  'use strict';

  
  let deck = [];
  const tipos=['C','D','H','S'],
        especiales=['A','J','Q','K'];
  
  let puntosJugadores = [];


  //Referencias del HTML  
  const btnPedir = document.querySelector('#btnPedir'),
   btnDetener = document.querySelector('#btnDetener'),
   //btnNuevo = document.querySelector('#btnNuevo'),
   btnPedir2 = document.querySelector('#btnPedir2'),
   btnDetener2 = document.querySelector('#btnDetener2');
  
  const  divCartasJugadores = document.querySelectorAll('.divCartas'),
  puntosHTML = document.querySelectorAll('small');

  //Esta funcion inicializa el juego
  const inicializarJuego = ( numJugadores = 3 ) => {
    deck = crearDeck();

    puntosJugadores = [];
    for( let i = 0; i< numJugadores; i++ ){
      puntosJugadores.push(0);
    }

   puntosHTML.forEach ( elem => elem.innerText = 0);
   divCartasJugadores.forEach(elem => elem.innerHTML = '');

      btnPedir.disabled = false;
      btnDetener.disabled = false;

      btnPedir2.disabled = true;
      btnDetener2.disabled = true;
    
   }
  
  //esta funcion crea un nuevo deck
  const crearDeck = () => {
    deck=[];
    for(let i = 2; i<=10;i++){
      for(let tipo of tipos){
          deck.push(i + tipo);
      }
    }
  
    for(let tipo of tipos){
      for(let esp of especiales){
          deck.push(esp + tipo);  
      }
    }
  
  
    //console.log( deck );
  
    return _.shuffle( deck );
  }
  
 
  
  //esta funcion me permite tomar una carta
  
  const pedirCarta = () => {
    if ( deck.length === 0 ){
      throw 'No hay cartas en el deck';
    }
    //carta debe de ser de la baraja
    return deck.pop();
  }
  

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    
    return ( isNaN( valor ) ) ?
            ( valor === 'A' ) ? 11 : 10
            : valor * 1;
  }
  
// Turno: 0 = primer jugador y el ultimo sera la computadora
  const acomularPuntos = (carta, turno ) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];

  }
 const crearCarta = ( carta, turno ) =>{

  const imgCarta = document.createElement('img')
  imgCarta.src = `cartas/${ carta }.png`;
  imgCarta.classList.add('cartas');
  divCartasJugadores[turno].append ( imgCarta );
  
 }

 const determinarGanador = () =>{

  const [ puntosMinimos, puntosComputadora, puntosMinimos2 ] = puntosJugadores;

setTimeout (() => {
    if( puntosComputadora === puntosMinimos && puntosMinimos2 === puntosComputadora){
      alert('nadie gana :(');

    } else if( puntosMinimos > 21 && puntosMinimos2 > 21 ){
        alert('computadora gana');
        //alert(puntosMinimos)
        
    } else if(puntosMinimos === 21 ){
      alert('Jugador1 gana');
      //alert(puntosMinimos);

    }else if(puntosMinimos2 === 21){
      alert('Jugador2 gana');
    


  }else if( puntosComputadora === puntosMinimos ){
    alert('empate de jugador1 y computadora');

  }else if( puntosComputadora === puntosMinimos2 ){
    alert('empate de jugador2 y computadora');
    
  }else if(puntosMinimos === puntosMinimos2){
    alert('empate de jugador1 y jugador2');

    
  }else{
      alert('computadora gana');
      //alert(puntosMinimos);
    }

    }, 10);
  }
 

  //turno de la computadora
  const turnoComputadora = ( puntosMinimos, puntosMinimos2 ) => {

    let puntosComputadora = 0;
    do{

      const carta = pedirCarta();
      puntosComputadora = acomularPuntos(carta, puntosJugadores.length - 2);
      crearCarta(carta, puntosJugadores.length - 2 );
        
    }while(( puntosComputadora < puntosMinimos ) && (puntosMinimos <= 21) && (puntosComputadora < puntosMinimos2) && (puntosMinimos2 <= 21) ){
     determinarGanador();
    }
  }
  
  //Eventos
  
  btnPedir.addEventListener('click', () => {
  
    const carta = pedirCarta();
   const puntosJugador = acomularPuntos( carta, 0);

   crearCarta( carta, 0 );

    if( puntosJugador > 21) {
    console.warn('lo siento perdiste');
    btnPedir.disabled = true;
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    btnPedir2.disabled = false;
    btnDetener2.disabled = false;
    
   //turnoComputadora(puntosJugador)
  
    } else if( puntosJugador === 21 ){
      console.warn('21, genial!');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      
      btnPedir2.disabled = false;
      btnDetener2.disabled = false;
     
      //turnoComputadora( puntosJugador);
    }
  });

  btnPedir2.addEventListener('click', () => {

    const carta2 = pedirCarta();
    const puntosJugador2 = acomularPuntos ( carta2, 2 );
    crearCarta(carta2, 2);


    if( puntosJugador2 > 21) {
      console.warn('lo siento perdiste');
     
      btnPedir.disabled = true;
      btnPedir.disabled = true;
      btnDetener.disabled = true;
  
      btnPedir2.disabled = false;
      btnDetener2.disabled = false;
   
     turnoComputadora(puntosJugador2)
    
      } else if( puntosJugador2 === 21 ){
        console.warn('21, genial!');
       
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        

        btnPedir2.disabled = false;
        btnDetener2.disabled = false;
  
        turnoComputadora( puntosJugador2 );
        
        
      }
  });

 
  btnDetener.addEventListener('click', () =>{
  
    btnPedir.disabled = true;
    btnDetener.disabled = true;
  
    btnPedir2.disabled = false;
    btnDetener2.disabled = false;
    
  
   // turnoComputadora (puntosJugadores);
  });

  btnDetener2.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    btnPedir2.disabled = true;
    btnDetener2.disabled = true;
    
  
    turnoComputadora ( puntosJugadores );

  });
  


  return {
    nuevoJuego: inicializarJuego
  };

  })();



