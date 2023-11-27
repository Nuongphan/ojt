import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
export const getTaskName:any = createAsyncThunk(
    'getTaskName',
    async () => {
        const response = await axios.get('http://localhost:8000/tasks')
        console.log(response, "ggggggggggggg");
        return response.data
    }
)
 const taskNameSlice = createSlice({
  name: "taskName", 
  initialState: {
    loading: false, user: null
  },
  reducers: {},
  extraReducers: (builder)=> {
    console.log("11111");
    
    builder.addCase(getTaskName.pending, (state, action) => {
      state.loading = true
  })
  builder.addCase(getTaskName.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
  })
  builder.addCase(getTaskName.rejected, (state, action) => {
      state.loading = false
      console.log("2222222222222");
  })}
})
export const { } = taskNameSlice.actions
export default taskNameSlice.reducer 