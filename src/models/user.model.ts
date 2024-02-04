import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  id?: number;
  username?: string;
}