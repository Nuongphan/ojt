import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { MdDelete } from "react-icons/md";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect, { Task } from "./task";
import TaskList from "./type";

export const Work = () => {
  registerLocale("vi", vi);
  const taskName = useSelector((state: any) => state.nameTask);
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);
  const [numTasksArray, setNumTasksArray] = useState<TaskList[]>([
    {
      idComponent: 1,
      taskTitleId: taskName.value.id,
      dateStart: new Date(),
      dateEnd: new Date(),
      sessionStart: 1,
      sessionEnd: 2,
      workDay: 1,
    },
  ]);
  const differenceDayss = (endDate: Date, startDate: Date) => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(startDate).getTime();
    const differenceDays = Math.round((endDateTime - startDateTime) / oneDay);
    return differenceDays;
  };

  useEffect(() => {
    numTasksArray.length == 5
      ? setIsDisabledBtn(true)
      : setIsDisabledBtn(false);
  }, [numTasksArray.length, taskName]);
  const handleTaskRegistration = () => {};
  const handleDeleteComponent = (index: number) => {
    const newData = numTasksArray.filter((item, i) => index !== i);
    setNumTasksArray(newData);
  };
  const handleAddComponent = () => {
    let maxId = numTasksArray.length;
    let newTaskList = {
      idComponent: maxId + 1,
      taskTitleId: taskName.value.id,
      dateStart: new Date(),
      dateEnd: new Date(),
      sessionStart: 1,
      sessionEnd: 2,
      workDay: 1,
    };
    setNumTasksArray((prev) => [...prev, newTaskList]);
  };
  const handleChangeStartDate = (date: Date, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(item?.dateEnd, date);

      if (
        item?.idComponent === id &&
        item?.dateEnd &&
        item?.dateStart &&
        item?.sessionEnd &&
        item?.sessionStart
      ) {
        const effort =
          item?.sessionStart == 1 && item?.sessionEnd == 2
            ? newDate + 1
            : newDate + 0.5;
        return { ...item, dateStart: date, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  // dateStart: format(date, "dd/MM/yyyy"),
  const handleChangeEndDate = (date: Date, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(date, item?.dateStart);
      console.log(newDate);

      if (
        item?.idComponent === id &&
        item?.dateEnd &&
        item?.dateStart &&
        item?.sessionEnd &&
        item?.sessionStart
      ) {
        const effort =
          item?.sessionStart == 1 && item?.sessionEnd == 2
            ? newDate + 1
            : newDate + 0.5;
        return { ...item, dateEnd: date, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  const handleChangeTimeStart = (time: number, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(item?.dateEnd, item?.dateStart);
      if (
        item?.idComponent === id &&
        item?.dateEnd &&
        item?.dateStart &&
        item?.sessionEnd &&
        item?.sessionStart
      ) {
        let effort: number = 0;
        if (newDate == 0 && time == 2) {
          effort = newDate + 0.5;
          return {
            ...item,
            sessionStart: time,
            sessionEnd: 2,
            workDay: effort,
          };
        } else if (newDate == 0 && time == 1) {
          effort = item?.sessionEnd == 2 ? newDate + 1 : newDate + 0.5;
          return { ...item, sessionStart: time, workDay: effort };
        } else if (newDate != 0) {
          effort =
            time == 1 && item?.sessionEnd == 2 ? newDate + 1 : newDate + 0.5;
          return { ...item, sessionStart: time, workDay: effort };
        }
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  const handleChangeTimeEnd = (time: number, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(item?.dateEnd, item?.dateStart);
      if (
        item?.idComponent === id &&
        item?.dateEnd &&
        item?.dateStart &&
        item?.sessionEnd &&
        item?.sessionStart
      ) {
        const timeEnd = newDate == 0 && item?.sessionStart == 2 ? 2 : time;
        const effort =
          item?.sessionStart == 1 && timeEnd == 2 ? newDate + 1 : newDate + 0.5;
        return { ...item, sessionEnd: timeEnd, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  console.log(numTasksArray, 5555555555);

  return (
    <>
      <h2 className="title-signup-task">Đăng ký công việc </h2>
      {numTasksArray?.map((item: TaskList, index) => {
        return (
          <div key={item.idComponent} className="signup-task-container">
            <div className="sigup-task-content">
              <div>
                <p>Tên công việc </p>
                <div>
                  <CustomSelect />
                </div>
              </div>
              <div className="timePickerWorkGroup">
                <div>
                  <p>Ngày bắt đầu</p>
                  <DatePicker
                    className="datepicker"
                    locale="vi"
                    selected={item?.dateStart}
                    onSelect={(date: Date) =>
                      handleChangeStartDate(date, item?.idComponent)
                    } //when day is clicked
                    onChange={(date: Date) =>
                      handleChangeStartDate(date, item?.idComponent)
                    } //only when value has changed
                  />
                  <select
                    className="time"
                    value={item?.sessionStart}
                    onChange={(e: any) =>
                      handleChangeTimeStart(e.target.value, item?.idComponent)
                    }
                    name=""
                    id=""
                  >
                    <option value="1">Sáng</option>
                    <option value="2">Chiều</option>
                  </select>
                </div>
                <div>
                  <p>Ngày kết thúc</p>
                  <div>
                    <DatePicker
                      className="datepicker"
                      locale="vi"
                      selected={item?.dateEnd}
                      onSelect={(date: Date) =>
                        handleChangeEndDate(date, item?.idComponent)
                      } //when day is clicked
                      onChange={(date: Date) =>
                        handleChangeEndDate(date, item?.idComponent)
                      } //only when value has changed
                    />

                    <select
                      className="time"
                      value={item?.sessionEnd}
                      name=""
                      id=""
                      onChange={(e: any) =>
                        handleChangeTimeEnd(e.target.value, item?.idComponent)
                      }
                    >
                      <option value="2">Chiều</option>
                      <option value="1">Sáng</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="effort-group">
                <span>Công số</span>{" "}
                <input
                  disabled
                  className="effortInput"
                  type="text"
                  value={item?.workDay}
                />
              </div>
            </div>
            <button
              disabled={numTasksArray.length == 1}
              onClick={() => handleDeleteComponent(index)}
              className="btnDeleteComponent"
            >
              <MdDelete />
            </button>
          </div>
        );
      })}

      <div className="btn-signup-task-group">
        <button onClick={handleTaskRegistration} className="btn-signup-task">
          Đăng ký
        </button>
        <button
          disabled={numTasksArray.length == 5}
          onClick={handleAddComponent}
          className={`btn-signup-task ${
            isDisabledBtn ? "disabled-btn-sigup-task" : ""
          }`}
        >
          Thêm
        </button>
      </div>
    </>
  );
};
