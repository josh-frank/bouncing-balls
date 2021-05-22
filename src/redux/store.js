import { configureStore } from "@reduxjs/toolkit";

import ballsReducer from "./ballsSlice"

const store = configureStore( {
    reducer: {
        balls: ballsReducer
    }
  } );

export default store;
