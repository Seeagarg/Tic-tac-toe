import { configureStore } from "@reduxjs/toolkit";
import nameReducer from "./NameSlice";

const store = configureStore({
    reducer:{
        name: nameReducer,
    }
})

export default store;