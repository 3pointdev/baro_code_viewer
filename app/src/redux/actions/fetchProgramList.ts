import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";

import { setCodeRecord } from "../reducers/code/recordReducer";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";

export const fetchProgramList = (payload) => {
  const url = `${process.env.NEXT_PUBLIC_BARO_URL}/program/getList/${payload.id}/${payload.date}`;
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
        dispatch(setCodeRecord(result.data));
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log(error);
        dispatch(decreaseIndicatorState());
      });
  };
};
