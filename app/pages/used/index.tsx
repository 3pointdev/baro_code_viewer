import CodeDetail from "components/code/codeDetail";
import SearchCode from "components/code/searchCode";
import CodeList from "components/list/codeList";
import MachineList from "components/list/machineList";
import MenuList from "components/list/menuList";
import { useRouter } from "next/router";
import { useEffect } from "react";
import SocketDataDto from "src/dto/socket/socketData.dto";
import { socketConnect, socketDisconnect } from "src/redux/actions/socket";
import {
  setCodeDetail,
  setNcCodeList,
} from "src/redux/reducers/code/codeReducer";
import { decreaseIndicatorState } from "src/redux/reducers/indicator/indicatorReducer";
import { useAppDispatch } from "src/redux/reduxHook";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (window.localStorage.getItem("token") === null) {
      router.replace("/login");
    } else {
      dispatch(socketConnect(socketOnMessage));
    }

    return () => {
      dispatch(socketDisconnect());
    };
  }, []);

  const socketOnMessage = (message: SocketDataDto) => {
    if (typeof message.data !== "string") return;

    const parsingData = JSON.parse(message.data);
    if (parsingData.response === "CALL_FUNC_RESULT") {
      if (parsingData.request.func === "prgdir") {
        dispatch(setNcCodeList(parsingData.data));
      } else {
        dispatch(setCodeDetail(parsingData.data));
      }
      dispatch(decreaseIndicatorState());
    }
  };

  return (
    <article className="bg-gray-300 dark:bg-gray-800 w-screen h-[calc(100vh-60px)] px-4 py-8 overflow-hidden">
      <section className="mx-2 flex justify-between">
        <MenuList />
        <SearchCode />
      </section>
      <section className="w-full flex border dark:border-gray-300 border-gray-800 rounded-xl h-[calc(100%-28px)]">
        <MachineList />
        <CodeList />
        <CodeDetail />
      </section>
    </article>
  );
}