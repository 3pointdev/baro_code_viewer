import { MouseEvent } from "react";
import { fetchCallFunc } from "src/redux/actions/fetchCallFunc";
import {
  selectCodeState,
  setActiveCode,
} from "src/redux/reducers/code/codeReducer";
import { selectMachineState } from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function CodeList() {
  const state = useAppSelector(selectCodeState);
  const machineState = useAppSelector(selectMachineState);
  const dispatch = useAppDispatch();

  const handleClickCode = (e: MouseEvent<HTMLLIElement>) => {
    const { id } = e.currentTarget;
    const targetMachine = machineState.list.find(
      (machine) => +machine.id === +machineState.activeMachine
    );
    const targetInfomation = {
      ...targetMachine,
      autostartORG: targetMachine.autostart,
      ipORG: targetMachine.ip,
      nameORG: targetMachine.name,
      portORG: targetMachine.port,
      func: "loadfile",
      no: id.padStart(4, "0"),
    };

    dispatch(fetchCallFunc(targetInfomation));
    dispatch(setActiveCode(+id));
  };

  return (
    <div className="w-full relative overflow-hidden">
      <div className="z-10 absolute top-0 left-0 text-gray-800 dark:text-gray-200 text-xl font-semibold bg-gray-300 dark:bg-gray-800 w-full p-4 rounded-t-xl">
        <h2>NC CODE</h2>
      </div>
      <ul className="p-4 py-16 relative overflow-auto h-full flex flex-col">
        {state.ncCodeList.map((ncCode) => {
          const isActive = state.activeCode?.name === ncCode.name;
          return (
            <li
              key={ncCode.name}
              className="cursor-pointer py-3"
              onClick={handleClickCode}
              id={ncCode.name}
            >
              <p
                className={`text-gray-800 dark:text-gray-200 ${
                  isActive && "font-semibold text-green-700 dark:text-green-300"
                }`}
              >
                {`O${ncCode.name.padStart(4, "0")}${ncCode.comment}` ||
                  "No CodeName"}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
