import RecordDetail from "components/code/recordDetail";
import SearchRecord from "components/code/searchRecord";
import DatePicker from "components/date/datePicker";
import MachineList from "components/list/machineList";
import MenuList from "components/list/menuList";
import RecordList from "components/list/recordList";

export default function UsedCode() {
  return (
    <article className="bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] px-4 py-8 overflow-hidden">
      <section className="mx-2 flex justify-between">
        <MenuList />
        <SearchRecord />
      </section>
      <section className="w-full grid grid-cols-[16%,1fr,1fr] grid-rows-[80px,1fr] border dark:border-gray-300 border-gray-800 rounded-xl h-[calc(100%-28px)]">
        <DatePicker />
        <MachineList />
        <RecordList />
        <RecordDetail />
      </section>
    </article>
  );
}
