import axios, { AxiosError, AxiosResponse } from "axios";
import { CompareType } from "config/constants";
import { Dispatch } from "redux";
import {
  setCompareCode,
  setCriteriaCode,
} from "../reducers/code/compareReducer";
import { setRecordDetail } from "../reducers/code/recordReducer";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";

interface IPayload {
  ncCode: string;
  isCompare?: boolean;
  type?: CompareType;
}

export const fetchProgramDetail = ({ ncCode, isCompare, type }: IPayload) => {
  const url = `${process.env.NEXT_PUBLIC_BARO_URL}/program/getNcCode/${ncCode}`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());
    api
      .get(url, {
        params: {
          sender: window.localStorage.getItem("sender"),
        },
      })
      .then((result: AxiosResponse) => {
        if (isCompare) {
          if (type === CompareType.CRITERIA) {
            dispatch(
              setCriteriaCode({ code: result.data[0].program_code, id: ncCode })
            );
          } else {
            dispatch(
              setCompareCode({ code: result.data[0].program_code, id: ncCode })
            );
          }
        } else {
          dispatch(setRecordDetail(result.data[0].program_code));
        }
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};
