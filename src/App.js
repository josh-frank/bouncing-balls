import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setBallPosition, setBallVelocity } from './redux/ballsSlice';

import './App.css';

import Ball from './components/Ball';

const viewportHeight = document.documentElement.clientHeight;
const viewportWidth = document.documentElement.clientWidth;

function App() {

  const dispatch = useDispatch();

  const balls = useSelector( state => state.balls );

  const moveBalls = useCallback( () => {
    balls.forEach( ( ball, index ) => {
      dispatch( setBallPosition( {
        ballIndex: index,
        position: [ ball.position[ 0 ] + ball.velocity[ 0 ], ball.position[ 1 ] + ball.velocity[ 1 ] ]
      } ) );
      if ( ball.position[ 0 ] > viewportHeight - ball.size ) {
        dispatch( setBallVelocity( {
          ballIndex: index,
          velocity: [ -Math.abs( ball.velocity[ 0 ] ), ball.velocity[ 1 ] ]
        } ) );
      }
      if ( ball.position[ 0 ] < 0 ) {
        dispatch( setBallVelocity( {
          ballIndex: index,
          velocity: [ Math.abs( ball.velocity[ 0 ] ), ball.velocity[ 1 ] ]
        } ) );      }
      if ( ball.position[ 1 ] > viewportWidth - ball.size ) {
        dispatch( setBallVelocity( {
          ballIndex: index,
          velocity: [ ball.velocity[ 0 ], -Math.abs( ball.velocity[ 1 ] ) ]
        } ) );
      }
      if ( ball.position[ 1 ] < 0 ) {
        dispatch( setBallVelocity( {
          ballIndex: index,
          velocity: [ ball.velocity[ 0 ], Math.abs( ball.velocity[ 1 ] ) ]
        } ) );      }
    } );
  }, [ balls, dispatch ] );

  useEffect( () => {
    const ballInterval = setInterval( moveBalls, 10 );
    return () => clearInterval( ballInterval );
  }, [ moveBalls ] );

  return (
    <div className="app">
      { balls.map( ( ball, index ) => {
        return <Ball
          key={ index }
          ballNumber={ index }
          ball={ ball }
        />;
      } ) }
    </div>
  );

}

export default App;
