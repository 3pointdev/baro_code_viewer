import { MouseEventHandler, useEffect, useState } from "react";

interface IProps {
  options: Options[];
  onClick: MouseEventHandler;
  defaultTitle: string;
  value: number;
  validMessage?: string;
}

export interface Options {
  title: string;
  id: number;
}

export default function CustomSelector({
  options,
  onClick,
  defaultTitle,
  value = 0,
  validMessage,
}: IProps) {
  const [openDropDown, setOpenDropDown] = useState<boolean>(false);
  const [activeOption, setActiveOption] = useState<Options>(null);

  useEffect(() => {
    const activeTarget = options.find((option) => option.id === value);

    if (activeTarget) {
      setActiveOption(activeTarget);
    }
  }, [value]);

  const handleClickOpenDropDown = () => {
    if (options.length < 1) {
      alert(validMessage);
    } else {
      setOpenDropDown(!openDropDown);
    }
  };

  return (
    <div className="shrink-0 flex-1">
      <button
        className="p-4 text-gray-800 dark:text-white focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm h-14 w-full text-center inline-flex justify-between items-center dark:focus:ring-gray-800 border-gray-800 dark:border-gray-300 border"
        type="button"
        onClick={handleClickOpenDropDown}
      >
        <p className="text-lg">
          {activeOption !== null ? activeOption.title : defaultTitle}
        </p>
        <svg
          className="w-4 h-4 ms-3"
          aria-hidden="true"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>
      <div
        className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 absolute ${
          openDropDown
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
          {options.map((option) => {
            return (
              <li
                key={`${option.id}_${option.title}`}
                onClick={(e) => {
                  setOpenDropDown(false);
                  onClick(e);
                }}
                id={`${option.id}`}
              >
                <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                  {option.title}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
