import { WaConnectionStatus } from '../enums/WaConnectionStatus'

export interface IConnection {
  qrcode?: string
  status: WaConnectionStatus
}
