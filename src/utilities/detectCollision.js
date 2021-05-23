function detectBallCollision( thisBall, thatBall ) {
    const xDistance = thisBall.position[ 0 ] - thatBall.position[ 0 ];
    const yDistance = thisBall.position[ 1 ] - thatBall.position[ 1 ];
    const distance = Math.sqrt( xDistance * xDistance + yDistance * yDistance );
    if ( distance < thisBall.size + thatBall.size ) return true;
    return false;
}

export { detectBallCollision };
