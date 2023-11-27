import { type } from "os";

interface TaskList {
  idComponent: number;
  taskTitleId: number|undefined;
  dateStart: Date;
  dateEnd: Date;
  sessionStart: number;
  sessionEnd: number;
  workDay: number;
}
export default TaskList