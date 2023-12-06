import { selectRecordState } from "src/redux/reducers/code/recordReducer";
import { useAppSelector } from "src/redux/reduxHook";

export default function RecordDetail() {
  const state = useAppSelector(selectRecordState);

  if (state.activeCode)
    return (
      <div className="w-full relative overflow-hidden border-l row-start-1 row-end-3">
        <div className="z-10 absolute top-0 left-0 text-gray-800 dark:text-gray-200 text-xl font-semibold bg-gray-300 dark:bg-gray-800 w-full p-4 rounded-t-xl">
          <h3>{`${state.activeCode.program}`}</h3>
        </div>
        <ul className="p-4 py-16 relative overflow-auto h-full whitespace-pre-wrap text-gray-800 dark:text-gray-200">
          {state.codeDetail.map((code: string, index: number) => {
            const isSearchResult = state.searchResult.includes(index);
            return (
              <li
                key={`code_line_${index}`}
                className={`py-3 px-4 flex gap-6 ${
                  isSearchResult && "bg-green-300 text-gray-800"
                }`}
              >
                <p className="w-5">{index + 1}</p>
                <p>{code}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
}
