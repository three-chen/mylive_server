export default class SignalWebSocket {
  public webSocket: WebSocket
  public socketId: string
  public roomAlias: string

  // 心跳间隔 60 秒
  private heartBeatInterval: number;
  // timeout 计时器
  private timeout: NodeJS.Timeout | null = null;

  constructor(ws: WebSocket, heartBeatI: number = 60 * 1000) {
    this.webSocket = ws
    this.heartBeatInterval = heartBeatI;

    this.startHearBeatTimeout();
    this.webSocket.addEventListener('message', () => {
      this.resetHeartBeatTimeout()
    })
  }

  public startHearBeatTimeout() {
    const that = this;
    console.log("startHearBeatTimeout");

    that.timeout = setTimeout(() => {
      that.closeWebsocket();
    }, this.heartBeatInterval)
  }

  public resetHeartBeatTimeout() {
    const that = this;
    console.log("resetHeartBeatTimeout");
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
