import { useCallback, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setBallPosition, setBallVelocity } from './redux/ballsSlice';

import './App.css';

import Ball from './components/Ball';

import { ballCollision, bottomWallCollision, evaluateCollision, leftWallCollision, rightWallCollision, topWallCollision } from './utilities/detectCollision';

function App() {

  const dispatch = useDispatch();

  const balls = useSelector( state => state.balls );

  
  // this callback represents a single animation frame
  const moveBalls = useCallback( () => {
    // Create an array to keep track of which balls are colliding, if any
    let isColliding = balls.map( () => false );
    // Start looping: for each ball...
    balls.forEach( ( ball, ballIndex ) => {
      // if ball-to-wall collision is detected, reverse the ball's vertical or horizontal velocity
      if ( bottomWallCollision( ball ) ) {
        dispatch( setBallVelocity( {
          ballIndex: ballIndex,
          velocity: [ -Math.abs( ball.velocity[ 0 ] ), ball.velocity[ 1 ] ]
        } ) );
      }
      if ( topWallCollision( ball ) ) {
        dispatch( setBallVelocity( {
          ballIndex: ballIndex,
          velocity: [ Math.abs( ball.velocity[ 0 ] ), ball.velocity[ 1 ] ]
        } ) );      }
      if ( rightWallCollision( ball ) ) {
        dispatch( setBallVelocity( {
          ballIndex: ballIndex,
          velocity: [ ball.velocity[ 0 ], -Math.abs( ball.velocity[ 1 ] ) ]
        } ) );
      }
      if ( leftWallCollision( ball ) ) {
        dispatch( setBallVelocity( {
          ballIndex: ballIndex,
          velocity: [ ball.velocity[ 0 ], Math.abs( ball.velocity[ 1 ] ) ]
        } ) );
      }
      // Find the index of the first ball collided with, if a collision is occurring
      const collidedBallIndex = balls.findIndex( ( otherBall, index ) => ballCollision( ball, otherBall ) && index !== ballIndex );
      if ( collidedBallIndex > -1 ) {
        // A collision occured, so evaluate it and calculate the change in velocity...
        const collisionEvaluation = evaluateCollision( ball, balls[ collidedBallIndex ] );
        const impulse = 2 * collisionEvaluation.speed / ( ball.size + balls[ collidedBallIndex ].size );
        // Then dispatch the changes to both balls' velocities and mark each as collided
        if ( collisionEvaluation.speed >= 0 && !isColliding[ ball ] ) dispatch( setBallVelocity( {
          ballIndex: ballIndex,
          velocity: [
            ball.velocity[ 0 ] - ( collisionEvaluation.direction[ 0 ] * impulse * balls[ collidedBallIndex ].size ),
            ball.velocity[ 1 ] - ( collisionEvaluation.direction[ 1 ] * impulse * balls[ collidedBallIndex ].size )
          ]
        } ) );
        if ( collisionEvaluation.speed >= 0 && !isColliding[ balls[ collidedBallIndex ] ] ) dispatch( setBallVelocity( {
          ballIndex: collidedBallIndex,
          velocity: [
            balls[ collidedBallIndex ].velocity[ 0 ] + ( collisionEvaluation.direction[ 0 ] * impulse * ball.size ),
            balls[ collidedBallIndex ].velocity[ 1 ] + ( collisionEvaluation.direction[ 1 ] * impulse * ball.size )
          ]
        } ) );
        isColliding[ ballIndex ] = true;
        isColliding[ collidedBallIndex ] = true;
      }
      // advance ball movement animation forward according to said ball's [ vertical, horizontal ] velocity
      dispatch( setBallPosition( {
        ballIndex: ballIndex,
        position: [ ball.position[ 0 ] + ball.velocity[ 0 ], ball.position[ 1 ] + ball.velocity[ 1 ] ]
      } ) );
    } );
  }, [ balls, dispatch ] );

  useEffect( () => {
    const ballInterval = setInterval( moveBalls, 10 );
    return () => clearInterval( ballInterval );
  }, [ moveBalls ] );

  return (
    <div className="app">
      { balls.map( ( ball, ballIndex ) => {
        return <Ball
          key={ ballIndex }
          ballNumber={ ballIndex }
          ball={ ball }
        />;
      } ) }
    </div>
  );

}

export default App;
