import { KeyboardEvent, MouseEvent, useState } from "react";
import {
  searchCode,
  selectCodeState,
} from "src/redux/reducers/code/codeReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function SearchCode() {
  const state = useAppSelector(selectCodeState);
  const [searchValue, setSearchValue] = useState<string>("");

  const dispatch = useAppDispatch();

  const handleClickSearch = (e: MouseEvent<HTMLButtonElement>) => {
    if (searchValue.length > 1) {
      dispatch(searchCode(searchValue));
    }
  };

  const handleKeySearch = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;

    if (key === "Enter" && searchValue.length > 1) {
      dispatch(searchCode(searchValue));
    }
  };

  if (state.activeCode)
    return (
      <div className="w-1/4 min-w-[280px]">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <SearchSvg color="text-gray-500 dark:text-gray-400" />
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 ps-10 text-sm focus:outline-none text-gray-900 border border-b-0 border-gray-300 rounded-t-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
            placeholder="검색 할 코드를 입력하세요."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeySearch}
            required
          />
          <button
            className="w-max h-full px-4 absolute right-0 top-0 bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-400 font-medium rounded-tr-lg text-sm dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={handleClickSearch}
          >
            <SearchSvg color="text-white dark:text-gray-100" />
          </button>
        </div>
      </div>
    );
}

function SearchSvg({ color }: { color: string }) {
  return (
    <svg
      className={`w-4 h-4 ${color}`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
      />
    </svg>
  );
}
