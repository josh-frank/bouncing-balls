import styled from "styled-components";

const BallSvg = styled.svg.attrs( props => ( {
    style: {
        top: `${ props.top }px`,
        left: `${ props.left }px`
    }
} ) )`position: absolute;`;

export default function Ball( { ball } ) {

    return <BallSvg
        width={ ball.size }
        height={ ball.size }
        viewBox={ `0 0 ${ ball.size * 2 } ${ ball.size * 2 }` }
        top={ ball.position[ 0 ] }
        left={ ball.position[ 1 ] }
    >
        <circle cx={ ball.size } cy={ ball.size } r={ ball.size } fill={ ball.color } />
    </BallSvg>;

}