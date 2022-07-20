import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const DatePicker = ({ date, handleDateChange, maxDate, title }) => {
  return (
    <label className="tw-text-sm tw-flex tw-flex-col tw-items-start tw-space-y-2">{title}
      <ReactDatePicker selected={date} onChange={handleDateChange} maxDate={maxDate} />
    </label>
  );
};

export default DatePicker;