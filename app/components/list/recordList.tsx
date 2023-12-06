import { MouseEvent, useEffect } from "react";
import CodeRecordDto from "src/dto/code/codeRecord.dto";
import { fetchProgramDetail } from "src/redux/actions/fetchProgramDetail";
import {
  resetCode,
  selectRecordState,
  setActiveRecord,
} from "src/redux/reducers/code/recordReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function RecordList() {
  const state = useAppSelector(selectRecordState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetCode());
  }, []);

  const handleClickCode = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;

    dispatch(fetchProgramDetail(id));
    dispatch(setActiveRecord(+id));
  };

  return (
    <div className="w-full relative overflow-hidden row-start-1 row-end-3">
      <div className="z-10 absolute top-0 left-0 text-gray-800 dark:text-gray-200 text-xl font-semibold bg-gray-300 dark:bg-gray-800 w-full p-4 rounded-t-xl">
        <h2>NC CODE</h2>
      </div>
      <ul className="p-4 py-16 relative overflow-auto h-full flex flex-col">
        {state.ncCodeList.map((ncCode: CodeRecordDto) => {
          const isActive = state.activeCode?.lot === ncCode.lot;
          return (
            <li
              key={ncCode.lot}
              className="cursor-pointer py-3"
              onClick={handleClickCode}
              id={`${ncCode.lot}`}
            >
              <p
                className={`text-gray-800 dark:text-gray-200 ${
                  isActive && "font-semibold text-green-700 dark:text-green-300"
                }`}
              >
                {`${ncCode.program}`}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
