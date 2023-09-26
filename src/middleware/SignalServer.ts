import RoomSocketEvent from '@/service/data/RoomSocketEvent'
import RoomRTC from '@/service/roomRTC'
import SignalWebSocket from '@/service/SignalWebSocket'

import { getObjectValues } from '@/utils'
import { EventEmitter } from 'events'

class SignalServer extends EventEmitter {
  private roomMap = new Map<string, RoomRTC>()

  constructor() {
    super()
    this.init()
  }

  public init() {
    this.on('__joinRoom', this.joinRoom)
    this.on('__offer', this.retransOffer)
  }

  public initSignalSocket(ws: WebSocket) {
    const sws = new SignalWebSocket(ws)
    const that = this
    sws.webSocket.onmessage = (message: MessageEvent<any>) => {
      const roomSocketEvent: RoomSocketEvent = JSON.parse(message.data)
      that.emit(roomSocketEvent.eventName, sws, ...getObjectValues(roomSocketEvent.data))
    }
    sws.webSocket.onclose = () => {
      console.log('socket closed')
    }
  }

  public joinRoom(sws: SignalWebSocket, roomAlias: string, userName: string) {
    const that = this
    let room = that.roomMap.get(roomAlias)
    if (!room) {
      room = new RoomRTC(roomAlias)
      that.roomMap.set(roomAlias, room)
    }
    sws.socketId = userName
    room.join(sws)
    room.newPeer(sws)
  }

  public retransOffer(sws: SignalWebSocket, offer: RTCSessionDescriptionInit) {
    const that = this
  }
}

const signalServer = new SignalServer()

export { signalServer }
