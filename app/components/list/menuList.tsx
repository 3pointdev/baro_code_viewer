import { useRouter } from "next/router";
import { MouseEvent, useEffect } from "react";
import MenuModel from "src/models/menu/menu.model";
import {
  selectMainState,
  selectMenu,
} from "src/redux/reducers/main/mainReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function MenuList() {
  const router = useRouter();
  const state = useAppSelector(selectMainState);
  const dispatch = useAppDispatch();

  const handleClickMenu = (e: MouseEvent<HTMLButtonElement>) => {
    const { value, dataset } = e.currentTarget;

    dispatch(selectMenu(+value));
    router.push(dataset.url);
  };

  useEffect(() => {
    const path = router.pathname;
    const activeMenu = state.menu.find((menu: MenuModel) => menu.url === path);
    dispatch(selectMenu(activeMenu.id));
  }, []);

  return (
    <div className="flex gap-2 dark:text-white text-gray-800">
      {state.menu.map((menu: MenuModel) => {
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
            data-url={menu.url}
          >
            {menu.title}
          </button>
        );
      })}
    </div>
  );
}
