import { createSlice } from "@reduxjs/toolkit";

const ballsSlice = createSlice( {
    name: "balls",
    initialState: [],
    reducers: {
        addBall( state, action ) {
            return [ ...state, action.payload ];
        },
        // { ballIndex, position }
        setBallPosition( state, action ) {
            state[ action.payload.ballIndex ].position = action.payload.position;
        },
        // { ballIndex, velocity }
        setBallVelocity( state, action ) {
            state[ action.payload.ballIndex ].velocity = action.payload.velocity;
        }
    }
} );

export const { addBall, setBallPosition, setBallVelocity } = ballsSlice.actions;
export default ballsSlice.reducer;
