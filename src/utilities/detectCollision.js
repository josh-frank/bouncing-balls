function topWallCollision( ball ) {
    return ball.position[ 0 ] < 0;
}

function bottomWallCollision( ball ) {
    return ball.position[ 0 ] > document.documentElement.clientHeight - ball.size;
}

function leftWallCollision( ball ) {
    return ball.position[ 1 ] < 0;
}

function rightWallCollision( ball ) {
    return ball.position[ 1 ] > document.documentElement.clientWidth - ball.size
}

// function distanceBetweenBalls( thisBall, thatBall ) {
//     const xDistance = ( thatBall.position[ 0 ] + thatBall.size / 2 ) - ( thisBall.position[ 0 ] + thisBall.size / 2 );
//     const yDistance = ( thatBall.position[ 1 ] + thatBall.size / 2 ) - ( thisBall.position[ 1 ] + thisBall.size / 2 );
//     return Math.sqrt( ( xDistance * xDistance ) + ( yDistance * yDistance ) );
// }

function distanceBetweenBalls( thisBall, thatBall ) {
    const xDistance = thatBall.position[ 0 ] - thisBall.position[ 0 ];
    const yDistance = thatBall.position[ 1 ] - thisBall.position[ 1 ];
    return Math.sqrt( ( xDistance * xDistance ) + ( yDistance * yDistance ) );
}

function ballCollision( thisBall, thatBall ) {
    return distanceBetweenBalls( thisBall, thatBall ) <= ( thisBall.size + thatBall.size ) / 2;
}

function evaluateCollision( thisBall, thatBall ) {
    const magnitude = [ thatBall.position[ 0 ] - thisBall.position[ 0 ], thatBall.position[ 1 ] - thisBall.position[ 1 ] ];
    const distance = distanceBetweenBalls( thisBall, thatBall );
    const direction = magnitude.map( coordinate => coordinate / distance );
    const relativeVelocity = [ thisBall.velocity[ 0 ] - thatBall.velocity[ 0 ], thisBall.velocity[ 1 ] - thatBall.velocity[ 1 ] ];
    const speed = relativeVelocity[ 0 ] * direction[ 0 ] + relativeVelocity[ 1 ] * direction[ 1 ];
    return { speed, direction };
}

export {
    topWallCollision,
    bottomWallCollision,
    leftWallCollision,
    rightWallCollision,
    ballCollision,
    evaluateCollision
};
