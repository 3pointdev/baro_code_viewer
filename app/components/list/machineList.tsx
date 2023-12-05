import { MouseEvent, useEffect } from "react";
import MachineDto from "src/dto/machine/machine.dto";
import { fetchCallFunc } from "src/redux/actions/fetchCallFunc";
import { fetchInstall } from "src/redux/actions/fetchInstall";
import {
  selectMachine,
  selectMachineState,
} from "src/redux/reducers/machine/machineReducer";
import { useAppDispatch, useAppSelector } from "src/redux/reduxHook";

export default function MachineList() {
  const state = useAppSelector(selectMachineState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInstall());
  }, []);

  const handleClickMachine = (e: MouseEvent<HTMLButtonElement>) => {
    const { value } = e.currentTarget;
    const targetMachine = state.list.find((machine) => +machine.id === +value);

    const targetInfomation = {
      ...targetMachine,
      autostartORG: targetMachine.autostart,
      ipORG: targetMachine.ip,
      nameORG: targetMachine.name,
      portORG: targetMachine.port,
      func: "prgdir",
      no: value.padStart(4, "0"),
    };

    dispatch(fetchCallFunc(targetInfomation));
    dispatch(selectMachine(+value));
  };

  return (
    <div className="border-r dark:border-gray-300 border-gray-800 flex flex-col gap-4 p-4 shrink-0">
      {state.list.map((machine: MachineDto) => {
        return (
          <button
            key={`${machine.id}_${machine.name}`}
            className={`p-4 w-full rounded-xl bg-white/60 dark:bg-white/30 flex gap-2 items-center ${
              state.activeMachine === +machine.id && "border-2 font-semibold"
            }`}
            onClick={machine.status === "on" ? handleClickMachine : null}
            value={machine.id}
            disabled={machine.status === "power_off"}
          >
            <div
              className={`w-4 h-4 block rounded-full ${
                machine.status === "on" ? "bg-green-500" : "bg-gray-800 "
              }`}
            />
            <p
              className={`text-left ${
                machine.status === "on"
                  ? "text-gray-800 dark:text-white"
                  : "text-gray-400 dark:text-gray-300"
              }`}
            >
              {machine.name}
            </p>
          </button>
        );
      })}
    </div>
  );
}
