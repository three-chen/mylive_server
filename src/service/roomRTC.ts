import { EventEmitter } from 'events'

import RoomSocketEvent from './data/RoomSocketEvent'
import SignalWebSocket from './SignalWebSocket'

class RoomRTC extends EventEmitter {
  //   private eventEmitter: EventEmitter = new EventEmitter()
  private socketMap: Map<string, SignalWebSocket> = new Map()
  private roomAlias: string

  constructor(roomAlias: string) {
    super()
    this.roomAlias = roomAlias
  }

  public getOtherSocketsExclude(sws: SignalWebSocket): SignalWebSocket[] {
    return Array.from(this.socketMap.values()).filter(swsocket => swsocket !== sws)
  }

  public getAllSockets(): SignalWebSocket[] {
    return Array.from(this.socketMap.values())
  }

  public getSocketByUserName(userName: string): SignalWebSocket {
    return this.socketMap.get(userName)
  }

  public getAllUserNames(): string[] {
    return Array.from(this.socketMap.keys())
  }

  public gerUserNamesExclude(userName: string): string[] {
    return this.getAllUserNames().filter(name => name !== userName)
  }

  public addSocket(sws: SignalWebSocket) {
    this.socketMap.set(sws.socketId, sws)
  }

  public removeSocket(sws: SignalWebSocket) {
    this.socketMap.delete(sws.socketId)
  }

  public removeAllSockets() {
    this.socketMap.clear()
  }

  public broadCast(roomSocketEvent: RoomSocketEvent) {
    const swsArray = this.getAllSockets()
    swsArray.forEach(swsocket => swsocket.webSocket.send(JSON.stringify(roomSocketEvent)))
  }

  public broadCastExclude(sws: SignalWebSocket, roomSocketEvent: RoomSocketEvent) {
    const swsArray = this.getOtherSocketsExclude(sws)
    swsArray.forEach(swsocket => swsocket.webSocket.send(JSON.stringify(roomSocketEvent)))
  }

  public leave(userName: string) {
    this.socketMap.delete(userName)
  }

  public getRoomAlias() {
    return this.roomAlias
  }

  public getSocketCount() {
    return this.socketMap.size
  }

  public join(sws: SignalWebSocket) {
    this.socketMap.set(sws.socketId, sws)
    this.broadCast({
      eventName: 'message',
      data: {
        message: `欢迎${sws.socketId}加入${this.roomAlias}`
      }
    })
  }

  public newPeer(sws: SignalWebSocket) {
    this.broadCastExclude(sws, {
      eventName: '_new_peer',
      data: {
        socketId: sws.socketId
      }
    })
    sws.webSocket.send(
      JSON.stringify({
        eventName: '_joined',
        data: {
          roomAlias: this.roomAlias,
          socketId: sws.socketId,
          connSocketIds: this.getOtherSocketsExclude(sws).map(sws => sws.socketId)
        }
      })
    )
  }
}

export default RoomRTC
