import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Ball from './components/Ball';

function App() {

  const viewportHeight = document.documentElement.clientHeight;
  const viewportWidth = document.documentElement.clientWidth;

  const [ ballPosition, setBallPosition ] = useState( [ 0, 0 ] );
  const [ ballVelocity, setBallVelocity ] = useState( [ 1, 1 ] );

  const moveBall = useCallback( () => {
    setBallPosition( [ ballPosition[ 0 ] + ballVelocity[ 0 ], ballPosition[ 1 ] + ballVelocity[ 1 ] ] );
    if ( ballPosition[ 0 ] > viewportHeight - 20 ) {
      setBallVelocity( [ -Math.abs( ballVelocity[ 0 ] ), ballVelocity[ 1 ] ] )
    }
    if ( ballPosition[ 0 ] < 0 ) {
      setBallVelocity( [ Math.abs( ballVelocity[ 0 ] ), ballVelocity[ 1 ] ] )
    }
    if ( ballPosition[ 1 ] > viewportWidth - 20 ) {
      setBallVelocity( [ ballVelocity[ 0 ], -Math.abs( ballVelocity[ 1 ] ) ] )
    }
    if ( ballPosition[ 1 ] < 0 ) {
      setBallVelocity( [ ballVelocity[ 0 ], Math.abs( ballVelocity[ 1 ] ) ] )
    }
  }, [ ballPosition, ballVelocity, viewportHeight, viewportWidth ] );

  useEffect( () => {
    const ballInterval = setInterval( moveBall, 10 );
    return () => clearInterval( ballInterval );
  }, [ moveBall ] );

  return (
    <div className="app">
      <Ball top={ ballPosition[ 0 ] } left={ ballPosition[ 1 ] } />
    </div>
  );

}

export default App;
