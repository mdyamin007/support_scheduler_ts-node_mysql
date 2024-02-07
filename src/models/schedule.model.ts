import { RowDataPacket } from "mysql2"

export default interface Schedule extends RowDataPacket {
  date?: string;
  user_id?: number;
}