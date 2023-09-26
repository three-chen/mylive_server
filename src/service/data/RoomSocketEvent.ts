interface DataInfo {
  roomAlias?: string //房间名
  userName?: string //用户名
  message?: string //要发送的消息
  socketId?: string //创建的socketId
  connSocketIds?: string[] //所有对方连接的socketId数组
  offer?: any //sdp offer
  answer?: any //sdp answer
}

export default interface RoomSocketEvent {
  eventName: string
  data: DataInfo
}
