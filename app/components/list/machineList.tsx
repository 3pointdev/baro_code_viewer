import { MouseEvent, useEffect } from "react";
import MachineDto from "src/dto/machine/machine.dto";
import { fetchInstall } from "src/redux/actions/fetchInstall";
import { fetchProgramList } from "src/redux/actions/fetchProgramList";
import {
  resetCode,
  selectRecordState,
} from "src/redux/reducers/code/recordReducer";
import {
  selectMachine,
  selectMachineState,
} from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function MachineList() {
  const state = useAppSelector(selectMachineState);
  const date = useAppSelector(selectRecordState).date;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstall());
  }, []);

  const handleClickMachine = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    dispatch(resetCode());
    dispatch(fetchProgramList({ id: +value, date: date }));
    dispatch(selectMachine(+value));
  };

  return (
    <div className=" col-start-1 col-end-2 row-start-2 row-end-3 border-r dark:border-gray-300 border-gray-800 flex flex-col gap-4 p-4 shrink-0">
      {state.list.map((machine: MachineDto) => {
        return (
          <button
            key={`${machine.id}_${machine.name}`}
            className={`p-4 w-full rounded-xl bg-white/60 dark:bg-white/30 flex gap-2 items-center ${
              state.activeMachine === +machine.id && "border-2 font-semibold"
            }`}
            onClick={handleClickMachine}
            value={machine.id}
          >
            <p className={`text-left text-gray-800 dark:text-white`}>
              {machine.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}
