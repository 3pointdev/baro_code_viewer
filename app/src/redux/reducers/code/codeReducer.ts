import { createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import CodeDto from "src/dto/code/code.dto";
import { RootState } from "../../store";

export interface CodeState {
  ncCodeList: CodeDto[];
  codeDetail: string[];
  activeCode: CodeDto | null;
  searchResult: number[];
}

const initialState: CodeState = {
  ncCodeList: [],
  codeDetail: [],
  activeCode: null,
  searchResult: [],
};

export const codeSlice = createSlice({
  name: "code",
  initialState,
  reducers: {
    setNcCodeList: (state, action) => {
      state.ncCodeList = action.payload.map((code: CodeDto) =>
        plainToInstance(CodeDto, code)
      );
    },
    setCodeDetail: (state, action) => {
      const codeArray = action.payload.split("\n");
      codeArray.shift();
      codeArray.pop();

      state.codeDetail = codeArray;
    },
    setActiveCode: (state, action) => {
      const activeCode = state.ncCodeList.find(
        (code) => +code.name === action.payload
      );
      state.activeCode = activeCode;
    },
    searchCode: (state, action) => {
      let result = [];
      const input = action.payload.toLowerCase();

      for (let i = 0; i < state.codeDetail.length; i++) {
        const lowercaseArrayItem = state.codeDetail[i].toLowerCase();

        if (lowercaseArrayItem.includes(input)) {
          result.push(i);
        }
      }
      
      state.searchResult = result;
    },
  },
});

export const { setNcCodeList, setCodeDetail, setActiveCode, searchCode } =
  codeSlice.actions;
export const selectCodeState = (state: RootState) => state.code;

export default codeSlice.reducer;
