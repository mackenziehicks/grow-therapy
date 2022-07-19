import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const DatePicker = ({ date, handleDateChange, maxDate }) => {
  return (
    <ReactDatePicker selected={date} onChange={handleDateChange} maxDate={maxDate} />
  );
};

export default DatePicker;