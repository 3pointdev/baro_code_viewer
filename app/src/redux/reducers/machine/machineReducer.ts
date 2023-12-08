import { createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import MachineDto from "src/dto/machine/machine.dto";
import { RootState } from "../../store";

export interface MachineState {
  list: MachineDto[];
  activeMachine: number | null;
  activeSubMachine: number | null;
}

const initialState: MachineState = {
  list: [],
  activeMachine: null,
  activeSubMachine: null,
};

export const machineSlice = createSlice({
  name: "machine",
  initialState,
  reducers: {
    setMachine: (state, action) => {
      state.list = action.payload.data.map((machine: MachineDto) =>
        plainToInstance(MachineDto, machine)
      );
    },
    selectMachine: (state, action) => {
      state.activeMachine = action.payload;
    },
    selectSubMachine: (state, action) => {
      state.activeSubMachine = action.payload;
    },
  },
});

export const { setMachine, selectMachine, selectSubMachine } =
  machineSlice.actions;
export const selectMachineState = (state: RootState) => state.machine;
export default machineSlice.reducer;
