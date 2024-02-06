import connection from "../db";
import Schedule from "../models/schedule.model";
import { ResultSetHeader } from "mysql2";

interface IScheduleRepository {
  save(schedule: Schedule): Promise<Schedule>;
//   retrieveAll(searchParams: {username: string}): Promise<User[]>;
//   retrieveByUsername(username: string): Promise<User | undefined>;
//   retrieveById(id: number): Promise<User | undefined>;
//   update(user: User): Promise<number>;
  retrieveByMonth(month: number): Promise<Schedule | undefined>;
  // delete(username: string): Promise<number>;
  // deleteAll(): Promise<number>;
}

class ScheduleRepository implements IScheduleRepository { 

    save(schedule: Schedule): Promise<Schedule> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
            "INSERT INTO schedule (date, user_id) VALUES(?, ?)",
            [schedule.date, schedule.user_id],
            (err, res) => {
                if (err) reject(err);
                else
                this.retrieveById(res.insertId)
                    .then((schedule) => resolve(schedule!))
                    .catch(reject);
            }
            );
        });
    }

    retrieveById(id: number): Promise<Schedule> {
      return new Promise((resolve, reject) => {
          connection.query<Schedule[]>(
          "SELECT * FROM users WHERE id = ?",
          [id],
          (err, res) => {
              if (err) reject(err);
              else resolve(res?.[0]);
          }
          );
      });
  }

    // retrieveAll(searchParams: {username?: string}): Promise<User[]> {
    //     let query: string = "SELECT * FROM users";
    //     let condition: string = "";
      
    //     if (searchParams?.username)
    //       condition += `LOWER(username) LIKE '%${searchParams.username}%'`
      
    //     if (condition.length)
    //       query += " WHERE " + condition;
      
    //     return new Promise((resolve, reject) => {
    //       connection.query<User[]>(query, (err, res) => {
    //         if (err) reject(err);
    //         else resolve(res);
    //       });
    //     });
    //   }

    

    retrieveByMonth(month: number): Promise<Schedule> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
            "SELECT * FROM schedule",
            [month],
            (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
            }
            );
        });
    }

    // update(user: User): Promise<number> {
    //     return new Promise((resolve, reject) => {
    //       connection.query<ResultSetHeader>(
    //         "UPDATE users SET username = ?",
    //         [user.username],
    //         (err, res) => {
    //           if (err) reject(err);
    //           else resolve(res.affectedRows);
    //         }
    //       );
    //     });
    // }

    // delete(username: string): Promise<number> {
    //     return new Promise((resolve, reject) => {
    //       connection.query<ResultSetHeader>(
    //         "DELETE FROM users WHERE username = ?",
    //         [username],
    //         (err, res) => {
    //           if (err) reject(err);
    //           else resolve(res.affectedRows);
    //         }
    //       );
    //     });
    // }

    // deleteAll(): Promise<number> {
    //     return new Promise((resolve, reject) => {
    //       connection.query<ResultSetHeader>("DELETE FROM users", (err, res) => {
    //         if (err) reject(err);
    //         else resolve(res.affectedRows);
    //       });
    //     });
    //   }
}

export default new ScheduleRepository();