import { createSlice } from "@reduxjs/toolkit";
import MenuModel from "src/models/menu/menu.model";
import { RootState } from "../../store";

export interface MainState {
  menu: MenuModel[];
  activeMenu: number;
}

const initialState: MainState = {
  menu: [
    {
      id: 0,
      title: "전체코드",
    },
    {
      id: 1,
      title: "사용코드",
    },
    {
      id: 2,
      title: "코드비교",
    },
  ],
  activeMenu: 0,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    selectMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
  },
});

export const { selectMenu } = mainSlice.actions;
export const selectMainState = (state: RootState) => state.main;
export default mainSlice.reducer;
