import  taskNameSlice from "./getTaskNameSlice"
import  nameTaskSlice  from "./nameTaskSlice"

const rootReducers = {
     nameTask: nameTaskSlice,
     getTaskName: taskNameSlice
}

export default rootReducers