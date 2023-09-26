export default class SignalWebSocket {
  public webSocket: WebSocket
  public socketId: string

  constructor(ws: WebSocket) {
    this.webSocket = ws
  }
}
