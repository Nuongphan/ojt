import { useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import vi from "date-fns/locale/vi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import TaskList from "./type";
import SelectTask from "./task";
import Moment from "react-moment";
import "moment/locale/vi";
import moment from "moment";
import axios from "axios";

export const Work = () => {
  registerLocale("vi", vi);
  const taskName = useSelector((state: any) => state.nameTask);
  const id = taskName.value.id;
  const [error, setError]= useState<{msg:string, i:null|number}>({msg:"", i:null})
  const [isDisabledBtn, setIsDisabledBtn] = useState<boolean>(false);
  const [selectedComponentIndex, setSelectedComponentIndex] = useState<
    number | null
  >(null);
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
  const [pickerStates, setPickerStates] = useState(
    numTasksArray.map(() => ({ startPickerOpen: false, endPickerOpen: false }))
  );

  const handleStartPickerClick = (index: number) => {
    setPickerStates((prev) =>
      prev.map((state, i) => ({
        ...state,
        startPickerOpen: index === i,
        endPickerOpen: index === i,
      }))
    );
    setSelectedComponentIndex(index);
  };

  const handleEndPickerClick = (index: number) => {
    setPickerStates((prev) =>
      prev.map((state, i) => ({
        ...state,
        endPickerOpen: index === i,
        startPickerOpen: index === i,
      }))
    );
    setSelectedComponentIndex(index);
  };

  useEffect(() => {
    numTasksArray.length == 5
      ? setIsDisabledBtn(true)
      : setIsDisabledBtn(false);
  }, [numTasksArray.length]);
  useEffect(() => {
    const updatedTasksArray = () => {
      const array = numTasksArray.map((item: TaskList) => {
        if (item.idComponent == id) {
          console.log(taskName.value.option.id, "ihihihih");

          console.log(item.idComponent, id, "???????????????");
          return { ...item, taskTitleId: taskName.value.option.id };
        }
        return item;
      });
      setNumTasksArray(array);
    };
    updatedTasksArray();
  }, [taskName.value.id]);
  const handleDeleteComponent = (index: number) => {
    const newData = numTasksArray.filter((item, i) => index !== i);
    setNumTasksArray(newData);
  };
  const handleAddComponent = () => {
    let maxId = numTasksArray.length;
    let newTaskList = {
      idComponent: maxId + 1,
      taskTitleId: undefined,
      dateStart: new Date(),
      dateEnd: new Date(),
      sessionStart: 1,
      sessionEnd: 2,
      workDay: 1,
    };
    setNumTasksArray((prev) => [...prev, newTaskList]);
    setPickerStates((prev) => [
      ...prev,
      { startPickerOpen: false, endPickerOpen: false },
    ]);
  };
  const handleChangeStartDate = (date: Date, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
        let end = item?.dateEnd;
        end = date;
        const newDate = differenceDayss(end, date);
        const effort =
          item?.sessionStart == 1 && item?.sessionEnd == 2
            ? newDate + 1
            : newDate + 0.5;
        return { ...item, dateStart: date, dateEnd: date, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };

  const handleChangeEndDate = (date: Date, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(date, item?.dateStart);
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
        const effort =
          item?.sessionStart == 1 && item?.sessionEnd == 2
            ? newDate + 1
            : newDate + 0.5;
        setPickerStates((prev) =>
          prev.map((state, i) => ({
            ...state,
            startPickerOpen: false,
            endPickerOpen: false,
          }))
        );
        return { ...item, dateEnd: date, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  const handleChangeTimeStart = (time: number, id: number) => {
    const updatedTasksArray = numTasksArray?.map((item: TaskList) => {
      const newDate = differenceDayss(item?.dateEnd, item?.dateStart);
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
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
      if (item?.idComponent === id && item?.dateEnd && item?.dateStart) {
        const timeEnd = newDate == 0 && item?.sessionStart == 2 ? 2 : time;
        const effort =
          item?.sessionStart == 1 && timeEnd == 2 ? newDate + 1 : newDate + 0.5;
        return { ...item, sessionEnd: timeEnd, workDay: effort };
      }
      return item;
    });
    setNumTasksArray(updatedTasksArray);
  };
  const handleTaskRegistration = () => {
    const newArray = numTasksArray.map((item: any, index) => {
      if (item?.taskTitleId == undefined) {
        setError({ msg: "Vui lòng chọn tên công việc.", i: index });
        return null; 
      }
      // Kiểm tra và định dạng ngày tháng
      const formattedItem = {
        ...item,
        dateStart:  moment(item?.dateStart).format("DD/MM/YYYY"),
        dateEnd: moment(item?.dateEnd).format("DD/MM/YYYY"),
      };
  
      return formattedItem;
    });
  
    // Kiểm tra xem có lỗi không
    if (newArray.some(item => item === undefined||null)) {
      console.log("Có lỗi xảy ra. Không thể đăng ký.");
    } else {
      console.log(newArray, "oooooooooooooooooooooooooooooooo");
      // Gọi API ở đây
    }
  };
  
 

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
                  <SelectTask id={item.idComponent} />
                </div>
              </div>
              <div className="timePickerWorkGroup">
                <div>
                  <p>Ngày bắt đầu</p>
                  <DatePicker
                    onFocus={() => handleStartPickerClick(index)}
                    open={pickerStates[index].startPickerOpen}
                    className="datepicker"
                    locale="vi"
                    selected={item?.dateStart}
                    onSelect={(date: Date) => {
                      handleChangeStartDate(date, item?.idComponent);
                    }}
                    onChange={(date: Date) =>
                      handleChangeStartDate(date, item?.idComponent)
                    }
                    minDate={new Date()}
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
                      onFocus={() => handleEndPickerClick(index)}
                      open={pickerStates[index].endPickerOpen}
                      className="datepicker"
                      locale="vi"
                      selected={item?.dateEnd}
                      onSelect={(date: Date) => {
                        handleChangeEndDate(date, item?.idComponent);
                      }}
                      onChange={(date: Date) =>
                        handleChangeEndDate(date, item?.idComponent)
                      }
                      minDate={item?.dateStart}
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
