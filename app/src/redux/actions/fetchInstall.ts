import axios, { AxiosError, AxiosResponse } from "axios";
import { Dispatch } from "redux";
import {
  decreaseIndicatorState,
  increaseIndicatorState,
} from "../reducers/indicator/indicatorReducer";
import { setMachine } from "../reducers/machine/machineReducer";

export const fetchInstall = () => {
  const url = `${process.env.NEXT_PUBLIC_APIS_URL}/api/cloud/installedTransmitters`;
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });

  return (dispatch: Dispatch) => {
    dispatch(increaseIndicatorState());

    api
      .post(url, { sender: window.localStorage.getItem("sender") })
      .then((response: AxiosResponse) => {
        dispatch(fetchMachine(response.data.data[0].id));
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        console.log("error : ", error);
        dispatch(decreaseIndicatorState());
      });
  };
};

export const fetchMachine = (id: string): any => {
  const url = `${process.env.NEXT_PUBLIC_APIS_URL}/api/cloud/active_machine`;
  const enterprise = window.localStorage.getItem("enterprise");
  const api = axios.create({
    headers: {
      "Content-Type": "application/json",
      "X-Access-Token": window.localStorage.getItem("token"),
    },
  });

  return (dispatch: Dispatch) => {
    api
      .post(url, {
        enterprise: enterprise,
        sender: window.localStorage.getItem("sender"),
        transmitter: id,
      })
      .then((response: AxiosResponse) => {
        dispatch(setMachine(response.data));
        dispatch(decreaseIndicatorState());
      })
      .catch((error: AxiosError) => {
        dispatch(setMachine(error));
        dispatch(decreaseIndicatorState());
      });
  };
};
