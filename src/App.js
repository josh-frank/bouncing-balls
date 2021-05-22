import './App.css';

import Ball from './components/Ball';

const testBalls = [
  { color: "black", size: 20, position: [ 0, 0 ], velocity: [ 2, 1 ] },
  { color: "red", size: 30, position: [ 0, 0 ], velocity: [ 1, 2 ] },
  { color: "blue", size: 100, position: [ 0, 0 ], velocity: [ 3, 4 ] },
  { color: "green", size: 5, position: [ 0, 0 ], velocity: [ 1, 1 ] }
];

function App() {

  const ballComponents = testBalls.map( ( ball, index ) => {
    return <Ball
      key={ index }
      ballNumber={ index }
      color={ ball.color }
      size={ ball.size }
      velocity={ ball.velocity }
    />;
  } );

  return (
    <div className="app">
      { ballComponents }
    </div>
  );

}

export default App;
