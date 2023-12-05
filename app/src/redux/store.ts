import {
  Action,
  ThunkAction,
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import thunk from "redux-thunk";
import { loginSlice } from "./reducers/auth/loginReducer";
import { codeSlice } from "./reducers/code/codeReducer";
import { indicatorSlice } from "./reducers/indicator/indicatorReducer";
import { machineSlice } from "./reducers/machine/machineReducer";
import { mainSlice } from "./reducers/main/mainReducer";

const rootReducer = combineReducers({
  [loginSlice.name]: loginSlice.reducer,
  [indicatorSlice.name]: indicatorSlice.reducer,
  [machineSlice.name]: machineSlice.reducer,
  [mainSlice.name]: mainSlice.reducer,
  [codeSlice.name]: codeSlice.reducer,
});

const makeStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
  });

const store = makeStore();

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
