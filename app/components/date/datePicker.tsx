import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEvent } from "react";
import {
  handleDate,
  resetCode,
  selectRecordState,
} from "src/redux/reducers/code/recordReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function DatePicker() {
  const state = useAppSelector(selectRecordState);
  const dispatch = useAppDispatch();

  const handleClickDateChange = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    dispatch(resetCode());
    dispatch(handleDate(value));
  };

  return (
    <div className="w-full border-b flex items-center justify-around border-r">
      <button
        className="text-white w-10 h-10"
        onClick={handleClickDateChange}
        value="prev"
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      <p className="text-white text-xl font-semibold">{state.date}</p>
      <button
        className="text-white w-10 h-10"
        onClick={handleClickDateChange}
        value="next"
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
}
