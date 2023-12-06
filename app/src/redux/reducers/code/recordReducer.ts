import { createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import dayjs from "dayjs";
import CodeRecordDto from "src/dto/code/codeRecord.dto";
import { RootState } from "../../store";

export interface RecordState {
  ncCodeList: CodeRecordDto[];
  codeDetail: string[];
  activeCode: CodeRecordDto | null;
  searchResult: number[];
  date: string;
}

const initialState: RecordState = {
  ncCodeList: [],
  codeDetail: [],
  activeCode: null,
  searchResult: [],
  date: dayjs(new Date()).format("YYYY-MM-DD"),
};

export const recordSlice = createSlice({
  name: "record",
  initialState,
  reducers: {
    resetCode: (state) => {
      state.ncCodeList = [];
      state.codeDetail = [];
      state.activeCode = null;
      state.searchResult = [];
    },
    setRecordDetail: (state, action) => {
      const codeArray = action.payload.split("\n");
      codeArray.shift();
      codeArray.pop();

      state.codeDetail = codeArray;
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
    setCodeRecord: (state, action) => {
      state.ncCodeList = action.payload.map((code: CodeRecordDto) =>
        plainToInstance(CodeRecordDto, code)
      );
    },
    setActiveRecord: (state, action) => {
      const activeCode = state.ncCodeList.find(
        (code: CodeRecordDto) => +code.lot === action.payload
      );
      state.activeCode = activeCode;
    },
    handleDate: (state, action) => {
      if (action.payload === "prev") {
        state.date = dayjs(state.date).subtract(1, "day").format("YYYY-MM-DD");
      } else {
        state.date = dayjs(state.date).add(1, "day").format("YYYY-MM-DD");
      }
    },
  },
});

export const {
  resetCode,
  setRecordDetail,
  searchCode,
  setCodeRecord,
  setActiveRecord,
  handleDate,
} = recordSlice.actions;
export const selectRecordState = (state: RootState) => state.record;

export default recordSlice.reducer;
