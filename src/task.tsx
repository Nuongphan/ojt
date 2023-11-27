import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { taskName } from "./store/reducer/nameTaskSlice";
import { getTaskName } from "./store/reducer/getTaskNameSlice";
export interface Task {
  id: number;
  label: string;
}
interface IdProp {
  id:number
}
const SelectTask = (props:IdProp)=> {
  const options: Task[] = [
    { id: 1, label: "Task 1" },
    { id: 2, label: "Task 2888888888888888888888888888888888888888888" },
    { id: 3, label: "Task 3" },
    { id: 4, label: "Task 4" },
    { id: 5, label: "Task 5" },
    { id: 6, label: "Task 6" },
    { id: 7, label: "Task 7" },
    { id: 8, label: "Task 7" },
    { id: 9, label: "Task 7" },
    { id: 10, label: "Task 7" },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Task | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOptions, setFilteredOptions] = useState<Task[]>(options);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(true);
  };
  const handleSelect = (option: Task) => {
    setSelectedOption(option);
    setIsOpen(false);
    setSearchTerm("");
    dispatch(taskName({option, id:props.id}))
  };
const taskNameGetFromData= useSelector((state:any)=> state.getTaskName)
// console.log(taskNameGetFromData, "fffffffffffff");

  useEffect(() => {
    // dispatch(getTaskName())
    if (searchTerm.length === 0) {
      setFilteredOptions(options);
    } else {
      setFilteredOptions(
        options.filter((option: Task) =>
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [searchTerm]);
  return (
    <div className="custom-select">
      <div className="select-header" onClick={handleToggle}>
        {selectedOption ? (
          <input
            className="input-search"
            type="text"
            value={selectedOption.label}
            onChange={(e) => {
              setSelectedOption({ ...selectedOption, label: e.target.value });
              if (!e.target.value) {
                setSelectedOption(null);
              }
            }}
          />
        ) : (
          <input
            className="input-search"
            type="text"
            placeholder="Tên công việc"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        )}
      </div>
      {isOpen && (
        <div className="select-options">
          {filteredOptions.map((option) => (
            <div key={option.id} className="option">
              <span className="tooltip">{option.label}</span>
              <button onClick={() => handleSelect(option)}>Select</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectTask;
