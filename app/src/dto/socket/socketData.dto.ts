export default class SocketDataDto {
  public readonly isTrusted: boolean;
  public readonly bubbles: boolean;
  public readonly cancelBubble: boolean;
  public readonly cancelable: boolean;
  public readonly composed: boolean;
  public readonly currentTarget: WebSocket;
  public readonly data: string | object;
  public readonly defaultPrevented: boolean;
  public readonly eventPhase: number;
  public readonly lastEventId: string;
  public readonly origin: string;
  public readonly ports: any[];
  public readonly returnValue: boolean;
  public readonly source: null;
  public readonly srcElement: WebSocket;
  public readonly target: WebSocket;
  public readonly timeStamp: number;
  public readonly type: string;
  public readonly userActivation: null;
}
