import axios from "axios";
import { Dispatch } from "redux";
import { increaseIndicatorState } from "../reducers/indicator/indicatorReducer";

export const fetchCallFunc = (payload) => {
  const url = `${process.env.NEXT_PUBLIC_EDGE_API_URL}/api/edge/callfunc`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });
  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());
    api.post(url, {
      ...payload,
      sender: window.localStorage.getItem("sender"),
    });
  };
};
