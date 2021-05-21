import styled from "styled-components";

const BallSvg = styled.svg.attrs( props => ( {
    style: {
        top: `${ props.top }px`,
        left: `${ props.left }px`
    }
} ) )`position: absolute;`;

export default function Ball( { top, left } ) {

    return <BallSvg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        top={ top }
        left={ left }
    >
        <circle cx="10" cy="10" r="10" />
    </BallSvg>;

}