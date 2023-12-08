import CompareCodeResult from "components/code/compareCodeResult";
import SearchRecord from "components/code/searchRecord";
import CompareFilter from "components/filter/compareFilter";
import MenuList from "components/list/menuList";
import { CompareType } from "config/constants";

export default function CompareCode() {
  return (
    <article className="bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] px-4 py-8 overflow-hidden">
      <section className="mx-2 flex justify-between">
        <MenuList />
        <SearchRecord />
      </section>
      <section className="w-full border dark:border-gray-300 border-gray-800 rounded-xl h-[calc(100%-28px)] overflow-hidden grid grid-rows-[max-content] grid-cols-2">
        <div className="w-full border-r border-b p-4">
          <CompareFilter type={CompareType.CRITERIA} />
        </div>
        <div className="w-full border-b p-4">
          <CompareFilter type={CompareType.COMPARE} />
        </div>
        <div className="w-full p-4 border-r overflow-hidden">
          <CompareCodeResult type={CompareType.CRITERIA} />
        </div>
        <div className="w-full p-4 h-full overflow-hidden">
          <CompareCodeResult type={CompareType.COMPARE} />
        </div>
      </section>
    </article>
  );
}
