export default class SignalWebSocket {
  public webSocket: WebSocket
  public socketId: string
  public roomAlias: string

  // 心跳间隔 55 秒
  private heartBeatInterval: number;
  // timeout 计时器
  private timeout: NodeJS.Timeout | null = null;

  constructor(ws: WebSocket, heartBeatI: number = 55 * 1000) {
    this.webSocket = ws
    this.heartBeatInterval = heartBeatI;
  }

  public startHearBeatTimeout() {
    const that = this;
    that.timeout = setTimeout(() => {
      that.closeWebsocket();
    }, this.heartBeatInterval)
  }

  public resetHeartBeatTimeout() {
    const that = this;
    clearTimeout(that.timeout!)
    that.timeout = setTimeout(() => {
      that.closeWebsocket();
    }, that.heartBeatInterval)
  }

  public closeWebsocket() {
    const that = this;
    that.webSocket.close();
  }
}
