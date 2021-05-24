import { createSlice } from "@reduxjs/toolkit";

const ballsSlice = createSlice( {
    name: "balls",
    initialState: [
        { color: "blue", size: 200, position: [ 0, 0 ], velocity: [ 1, 2 ] },
        { color: "green", size: 200, position: [ 300, 0 ], velocity: [ 2, 1 ] },
        { color: "black", size: 200, position: [ 0, 500 ], velocity: [ 3, 3 ] },
        { color: "purple", size: 200, position: [ 300, 300 ], velocity: [ 0, 2 ] },
        { color: "red", size: 200, position: [ 400, 500 ], velocity: [ 4, 2 ] },
      ],
    reducers: {
        addBall( state, action ) {
            return [ ...state, action.payload ];
        },
        // action: { ballIndex, position }
        setBallPosition( state, action ) {
            state[ action.payload.ballIndex ].position = action.payload.position;
        },
        // action: { ballIndex, velocity }
        setBallVelocity( state, action ) {
            state[ action.payload.ballIndex ].velocity = action.payload.velocity;
        }
    }
} );

export const { addBall, setBallPosition, setBallVelocity } = ballsSlice.actions;
export default ballsSlice.reducer;
