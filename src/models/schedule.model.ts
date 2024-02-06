import { RowDataPacket } from "mysql2"

export default interface Schedule extends RowDataPacket {
  id?: number;
  date?: string;
  user_id?: number;
}