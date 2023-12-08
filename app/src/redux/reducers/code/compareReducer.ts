import { createSlice } from "@reduxjs/toolkit";
import { plainToInstance } from "class-transformer";
import CodeRecordDto from "src/dto/code/codeRecord.dto";
import CompareModel from "src/models/compare/compare.model";
import { RootState } from "../../store";

export interface CompareState {
  criteriaModel: CompareModel;
  compareModel: CompareModel;
  criteriaList: CodeRecordDto[];
  compareList: CodeRecordDto[];
  criteriaCode: string[];
  compareCode: string[];
}

const initialState: CompareState = {
  criteriaModel: new CompareModel(),
  compareModel: new CompareModel(),
  criteriaList: [],
  compareList: [],
  criteriaCode: [],
  compareCode: [],
};

export const compareSlice = createSlice({
  name: "compare",
  initialState,
  reducers: {
    resetCode: (state) => {
      state.criteriaModel = new CompareModel();
      state.criteriaList = [];
      state.criteriaCode = [];
      state.compareModel = new CompareModel();
      state.compareList = [];
      state.compareCode = [];
    },
    setCriteriaList: (state, action) => {
      state.criteriaList = action.payload.map((code) =>
        plainToInstance(CodeRecordDto, code)
      );
    },
    setCompareList: (state, action) => {
      state.compareList = action.payload.map((code) =>
        plainToInstance(CodeRecordDto, code)
      );
    },
    setCriteriaDate: (state, action) => {
      state.criteriaModel = plainToInstance(CompareModel, {
        ...state.criteriaModel,
        date: action.payload,
      });
    },
    setCompareDate: (state, action) => {
      state.compareModel = plainToInstance(CompareModel, {
        ...state.criteriaModel,
        date: action.payload,
      });
    },
    setCriteriaCode: (state, action) => {
      const newCode = action.payload.code.replaceAll("%", "").split("\n");
      newCode.pop();
      newCode.shift();
      state.criteriaModel = plainToInstance(CompareModel, {
        ...state.criteriaModel,
        code: action.payload.id,
      });
      state.criteriaCode = newCode;
    },
    setCompareCode: (state, action) => {
      const newCode = action.payload.code.replaceAll("%", "").split("\n");
      newCode.pop();
      newCode.shift();
      state.compareModel = plainToInstance(CompareModel, {
        ...state.criteriaModel,
        code: action.payload.id,
      });
      state.compareCode = newCode;
    },
  },
});

export const {
  resetCode,
  setCriteriaDate,
  setCompareDate,
  setCriteriaList,
  setCompareList,
  setCriteriaCode,
  setCompareCode,
} = compareSlice.actions;
export const selectCompareState = (state: RootState) => state.compare;

export default compareSlice.reducer;
