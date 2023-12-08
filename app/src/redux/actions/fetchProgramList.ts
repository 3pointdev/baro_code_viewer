import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { CompareType } from "config/constants";
import {
  setCompareList,
  setCriteriaList,
} from "../reducers/code/compareReducer";
import { setCodeRecord } from "../reducers/code/recordReducer";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";

interface IPayload {
  id: number;
  date: string;
  isCompare?: boolean;
  type?: CompareType;
}

export const fetchProgramList = ({
  id,
  date,
  isCompare = false,
  type,
}: IPayload) => {
  const url = `${process.env.NEXT_PUBLIC_BARO_URL}/program/getList/${id}/${date}`;
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
            dispatch(setCriteriaList(result.data));
          } else {
            dispatch(setCompareList(result.data));
          }
        } else {
          dispatch(setCodeRecord(result.data));
        }
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};
