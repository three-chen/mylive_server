export default class SignalWebSocket {
  public webSocket: WebSocket
  public socketId: string
  public roomAlias: string

  constructor(ws: WebSocket) {
    this.webSocket = ws
  }
}
