import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import JoinModel from "src/models/join/join.model";
import { postJoin } from "../reducers/auth/joinReducer";

export const fetchJoin = (account: JoinModel) => {
  const url = `/account/register`;
  return (dispatch: Dispatch) => {
    axios
      .post(url, account ? account : null)
      .then((response: AxiosResponse) => {
        location.replace("/login");
      })
      .catch((error: AxiosError) => {
        dispatch(postJoin(error.response.data));
      });
  };
};
