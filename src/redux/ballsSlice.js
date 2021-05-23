import { createSlice } from "@reduxjs/toolkit";

const ballsSlice = createSlice( {
    name: "balls",
    initialState: [
        { color: "black", size: 20, position: [ 0, 0 ], velocity: [ 2, 1 ] },
        { color: "red", size: 30, position: [ 0, 0 ], velocity: [ 1, 2 ] },
        { color: "blue", size: 100, position: [ 0, 0 ], velocity: [ 3, 4 ] },
        { color: "green", size: 5, position: [ 0, 0 ], velocity: [ 1, 1 ] }
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
