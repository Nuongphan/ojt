import { type } from "os";

interface TaskList {
  idComponent: number;
  taskTitleId: number;
  dateStart: string|Date;
  dateEnd: string|Date;
  sessionStart: number;
  sessionEnd: number;
  workDay: number;
}
export default TaskList