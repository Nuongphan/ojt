import React, { useState } from 'react';
import { DatePicker } from 'antd';
    

const MyDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date:any) => {
    setSelectedDate(date);
  };

  return (
    <div>
      <h1>My Date Picker</h1>
      <DatePicker onChange={handleDateChange} />
      <p>Selected Date: {selectedDate && selectedDate}</p>
    </div>
  );
};

export default MyDatePicker;
