import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CompareType } from "config/constants";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  selectCompareState,
  setCompareDate,
  setCriteriaDate,
} from "src/redux/reducers/code/compareReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function DateSelector({ type }: { type: CompareType }) {
  const state = useAppSelector(selectCompareState);
  const dispatch = useAppDispatch();

  const handleChangeDate = (date: Date) => {
    console.log("result : ", date);
    console.log(new Date(date));

    if (type === CompareType.CRITERIA) {
      dispatch(setCriteriaDate(date));
    } else {
      dispatch(setCompareDate(date));
    }
  };

  return (
    <div className="w-full h-14 flex-1 relative">
      <DatePicker
        id={`date_picker_${type}`}
        className={
          "bg-transparent text-black dark:text-white p-4 h-14 !w-full border rounded-lg border-gray-800 dark:border-gray-300 text-lg cursor-pointer caret-transparent"
        }
        selected={
          type === CompareType.CRITERIA
            ? state.criteriaModel.date
            : state.compareModel.date
        }
        onChange={handleChangeDate}
        icon={true}
        dateFormat="yyyy-MM-dd"
        maxDate={new Date()}
        onChangeRaw={(e) => e.preventDefault()}
      />
      <label
        className="absolute right-4 top-1/2 -translate-y-1/2 date-label"
        htmlFor={`date_picker_${type}`}
      >
        <FontAwesomeIcon
          icon={faCalendarAlt}
          size="xl"
          className="text-gray-800 dark:text-gray-300 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer"
        />
      </label>
    </div>
  );
}
