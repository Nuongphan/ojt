import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { MdDelete } from "react-icons/md";
import { differenceInDays, format, formatDistance } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import CustomSelect, { Task } from "./task";
import TaskList from "./type";

export const Work = () => {
  registerLocale("vi", vi);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState<number>(1);
  const [timeEnd, setTimeEnd] = useState<number>(2);
  const [effortt, setEffort] = useState(0);
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
      workDay: 0,
    },
  ]);
  const differenceDayss = () => {
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const endDateTime = new Date(endDate).getTime();
    const startDateTime = new Date(startDate).getTime();
    const differenceDays = Math.round((endDateTime - startDateTime) / oneDay);
    return differenceDays;
  };

  useEffect(() => {
    const newDate = differenceDayss();
    newDate == 0 && timeStart == 2 ? setTimeEnd(2) : "";
    startDate !== undefined &&
    endDate !== undefined &&
    timeStart == 1 &&
    timeEnd == 2
    ? setEffort(newDate + 1)
    : setEffort(newDate + 0.5);
    console.log(startDate, endDate, timeStart,timeEnd,effortt, newDate, "iiiiiiiiiiiiiiii");
    numTasksArray.length == 5
      ? setIsDisabledBtn(true)
      : setIsDisabledBtn(false);
  }, [
    timeStart,
    timeEnd,
    startDate,
    endDate,
    effortt,
    numTasksArray.length,
    taskName,
  ]);
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
      workDay: 0,
    };
    setNumTasksArray((prev) => [...prev, newTaskList]);
    setStartDate(new Date());
    setEndDate(new Date());
    setTimeStart(1);
    setTimeEnd(2);
    setEffort(0);
  };
  const caculateEffort = () => {
    let effort = 0;
    const newDate =  differenceDayss()
    // console.log(timeStart, timeEnd, startDate, endDate, newDate, 8987678978);
    if (timeStart == 1 && timeEnd == 2) {
      effort = newDate + 1;
    } else {
      effort = newDate + 0.5;
    }
    // console.log(effort, "effort trong hàm caculate");
    setEffort(effort);
    return effort;
  };
  const handleChangeStartDate = (date: Date, id: number) => {
    const newArray = numTasksArray.map((item: TaskList) => {
      if (date === null) {
        return item;
      }
      if (item.idComponent == id) {
        return {
          ...item,
          dateStart: date,
          workDay:effortt,
        };
      }
      return item;
    });
    setNumTasksArray(newArray);
  };
  // dateStart: format(date, "dd/MM/yyyy"),
  const handleChangeEndDate = (date: Date, id: number) => {
    const effort = caculateEffort();
    const newArray = numTasksArray.map((item: TaskList) => {
      if (date === null) {
        return item;
      }
      if (item.idComponent == id) {
        return {
          ...item,
          dateEnd: date,
          workDay: effortt,
        };
      }
      return item;
    });
    setNumTasksArray(newArray);
  };
  const handleChangeTimeStart = (time: number, id: number) => {
    const newDate =  differenceDayss()
    const effort = caculateEffort();
    setTimeStart(time);
    const newArray = numTasksArray.map((item: TaskList) => {
      if (item.idComponent == id) {
        if (newDate === 0 && time == 2) {
          return {
            ...item,
            sessionStart: time,
            sessionEnd: 2,
            workDay: effortt,
          };
        }
        return { ...item, sessionStart: time, workDay: effortt };
      }
      return item;
    });
    setNumTasksArray(newArray);
  };

  const handleChangeTimeEnd = (time: number, id: number) => {
    const newDate = differenceDayss()
    const effort = caculateEffort();
    // console.log(effort, "effort");

    setTimeEnd(time);
    const newArray = numTasksArray.map((item: TaskList) => {
      if (item.idComponent == id) {
        if (newDate === 0 && timeStart == 2) {
          return { ...item, sessionEnd: 2, workDay: effortt };
        }
        return { ...item, sessionEnd: time, workDay: effortt };
      }
      return item;
    });
    // console.log(newArray, "newArrray");

    setNumTasksArray(newArray);
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
                    selected={startDate}
                    onSelect={(date: Date) => setStartDate(date)} //when day is clicked
                    onChange={(date: Date) =>
                      handleChangeStartDate(date, item?.idComponent)
                    } //only when value has changed
                  />
                  <select
                    className="time"
                    value={timeStart}
                    onChange={(e: any) => {
                      setTimeStart(e.target.value);
                      handleChangeTimeStart(e.target.value, item?.idComponent);
                    }}
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
                      selected={endDate}
                      onSelect={(date: Date) => setEndDate(date)} //when day is clicked
                      onChange={(date: Date) =>
                        handleChangeEndDate(date, item?.idComponent)
                      } //only when value has changed
                    />

                    <select
                      className="time"
                      value={timeEnd}
                      name=""
                      id=""
                      onChange={(e: any) => {
                        setTimeEnd(e.target.value);
                        handleChangeTimeEnd(e.target.value, item?.idComponent);
                      }}
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
                  value={effortt}
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
