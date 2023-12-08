import { CompareType } from "config/constants";
import { selectCompareState } from "src/redux/reducers/code/compareReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function CompareCodeResult({ type }: { type: CompareType }) {
  const state = useAppSelector(selectCompareState);
  return (
    <ul className="overflow-auto w-full relative h-full whitespace-pre-wrap text-gray-800 dark:text-gray-200">
      {type === CompareType.CRITERIA
        ? state.criteriaCode.map((code: string, index: number) => {
            return (
              <li
                key={`code_line_${index}`}
                className={`py-3 px-4 flex gap-6 `}
              >
                <p className="w-5">{index + 1}</p>
                <p>{code}</p>
              </li>
            );
          })
        : state.compareCode.map((code: string, index: number) => {
            return (
              <li
                key={`code_line_${index}`}
                className={`py-3 px-4 flex gap-6 `}
              >
                <p className="w-5">{index + 1}</p>
                <p>{code}</p>
              </li>
            );
          })}
    </ul>
  );
}
