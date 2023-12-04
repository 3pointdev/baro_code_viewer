import { createSlice } from "@reduxjs/toolkit";
import JoinModel from "src/models/join/join.model";
import { RootState } from "../../store";

export interface JoinState {
  model: JoinModel;
  errorField: ErrorField[];
}

export interface ErrorField {
  field: string;
  error: string;
  reject: string;
}

const initialState: JoinState = {
  model: { ...new JoinModel() },
  errorField: [],
};

export const joinSlice = createSlice({
  name: "join",
  initialState,
  reducers: {
    changeJoinValue: (state, action) => {
      const { id, value } = action.payload;
      state.model[id] = value;
    },
    postJoin: (state, action) => {
      state.errorField = action.payload.data.fieldErrorList;
    },
  },
});

export const { changeJoinValue, postJoin } = joinSlice.actions;
export const selectJoinState = (state: RootState) => state.join;
export default joinSlice.reducer;
