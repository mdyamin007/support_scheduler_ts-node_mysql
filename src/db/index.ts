import mysql from "mysql2";
import dbConfig from "../config/db.config";

export default mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  database: dbConfig.DB,
  password: ""
});