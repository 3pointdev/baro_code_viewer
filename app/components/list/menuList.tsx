import { MouseEvent } from "react";
import {
  selectMainState,
  selectMenu,
} from "src/redux/reducers/main/mainReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function MenuList() {
  const state = useAppSelector(selectMainState);
  const dispatch = useAppDispatch();

  const handleClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;

    dispatch(selectMenu(+value));
  };

  return (
    <div className="flex gap-2 dark:text-white text-gray-800">
      {state.menu.map((menu) => {
        return (
          <button
            className={`px-4 py-2 border rounded-t-xl dark:border-gray-300 border-gray-800 border-b-0 ${
              state.activeMenu === menu.id
                ? "bg-green-600/80 dark:bg-white/80 text-white dark:text-gray-800 font-semibold"
                : "bg-white/60 dark:bg-white/30"
            }`}
            key={`${menu.id}_${menu.title}`}
            onClick={handleClickMenu}
            value={menu.id}
          >
            {menu.title}
          </button>
        );
      })}
    </div>
  );
}
