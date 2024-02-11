import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  ID?: number;
  username?: string;
}