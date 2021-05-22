import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

const viewportHeight = document.documentElement.clientHeight;
const viewportWidth = document.documentElement.clientWidth;

const BallSvg = styled.svg.attrs( props => ( {
    style: {
        top: `${ props.top }px`,
        left: `${ props.left }px`
    }
} ) )`position: absolute;`;

export default function Ball( { color = "black", size = 20, position = [ 0, 0 ], velocity = [ 1, 1 ] } ) {

    const [ ballPosition, setBallPosition ] = useState( position );
    const [ ballVelocity, setBallVelocity ] = useState( velocity );

    const moveBall = useCallback( () => {
        setBallPosition( [ ballPosition[ 0 ] + ballVelocity[ 0 ], ballPosition[ 1 ] + ballVelocity[ 1 ] ] );
        if ( ballPosition[ 0 ] > viewportHeight - size ) {
          setBallVelocity( [ -Math.abs( ballVelocity[ 0 ] ), ballVelocity[ 1 ] ] )
        }
        if ( ballPosition[ 0 ] < 0 ) {
          setBallVelocity( [ Math.abs( ballVelocity[ 0 ] ), ballVelocity[ 1 ] ] )
        }
        if ( ballPosition[ 1 ] > viewportWidth - size ) {
          setBallVelocity( [ ballVelocity[ 0 ], -Math.abs( ballVelocity[ 1 ] ) ] )
        }
        if ( ballPosition[ 1 ] < 0 ) {
          setBallVelocity( [ ballVelocity[ 0 ], Math.abs( ballVelocity[ 1 ] ) ] )
        }
    }, [ ballPosition, ballVelocity, size ] );
    
    useEffect( () => {
        const ballInterval = setInterval( moveBall, 10 );
        return () => clearInterval( ballInterval );
    }, [ moveBall ] );

    return <BallSvg
        width={ size }
        height={ size }
        viewBox={ `0 0 ${ size * 2 } ${ size * 2 }` }
        top={ ballPosition[ 0 ] }
        left={ ballPosition[ 1 ] }
    >
        <circle cx={ size } cy={ size } r={ size } fill={ color } />
    </BallSvg>;

}