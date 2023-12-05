export const socketConnect = (
  onMessage: (this: WebSocket, ev: MessageEvent<any>) => any
): any => {
  let socket: WebSocket;

  socket = new WebSocket(
    `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}${window.localStorage.getItem(
      "sender"
    )}?ent=${window.localStorage.getItem("enterprise")}&view=noti`,
    "transmitter"
  );
  socket.onopen = socketOnOpen;
  socket.onmessage = onMessage;
  socket.onerror = socketOnError;
  socket.onclose = socketOnClose;

  return () => {};
};

export const socketOnOpen = () => {
  console.log("socket connect!");
};

export const socketOnError = () => {};

export const socketOnClose = () => {
  console.log("socket disconnect!");
};
