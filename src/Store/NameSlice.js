import { createSlice } from "@reduxjs/toolkit";

const nameSlice = createSlice({
    name:"name",
    initialState:{value:""},
  
    reducers:{
        add:(state,action)=>{
            state.value = action.payload;
        }
    }
})

export const {add} = nameSlice.actions;
export default nameSlice.reducer;