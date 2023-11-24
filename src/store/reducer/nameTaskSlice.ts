import { createSlice } from "@reduxjs/toolkit";

export const nameTaskSlice = createSlice({
  name: "nameTask",
  initialState: { value: "" },
  reducers: {
    taskName: (state, action) => { 
      console.log(action); 
      state.value = action.payload;
      return state;
    },
  },
  extraReducers: {},
});
export const { taskName } = nameTaskSlice.actions
export default nameTaskSlice.reducer;





