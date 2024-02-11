import connection from "../db";
import Schedule from "../models/schedule.model";
import { ResultSetHeader } from "mysql2";

interface IScheduleRepository {
  save(schedule: Schedule): Promise<Schedule>;
//   retrieveAll(searchParams: {username: string}): Promise<User[]>;
//   retrieveByUsername(username: string): Promise<User | undefined>;
//   retrieveById(id: number): Promise<User | undefined>;
  updateSchedule(date: string,username_1: string,username_2: string): Promise<number>;
  retrieveByMonth(year: number,month: number): Promise<Schedule[] | undefined>;
  retrieveByUsername(username: string): Promise<Schedule[] | undefined>;
  retrieveByUsernameMonth(username: string,month: number): Promise<Schedule[] | undefined>;
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

    retrieveByUsername(username: string): Promise<Schedule[]> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
                "SELECT * FROM schedule WHERE user_id = ( SELECT ID FROM users WHERE username = ? )",
            [username],
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
            }
            );
        });
    }

    retrieveByUsernameMonth(username: string, month: number): Promise<Schedule[]> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
                "SELECT * FROM schedule WHERE MONTH(date) = ? AND user_id = ( SELECT ID FROM users WHERE username = ? )",
            [month, username],
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
            }
            );
        })
    }


    retrieveByMonth(year: number, month: number): Promise<Schedule[]> {
        return new Promise((resolve, reject) => {
            connection.query<Schedule[]>(
            "SELECT * FROM schedule WHERE MONTH(date) = ? AND YEAR(date) = ?",
            [month, year],
            (err, res) => {
                if (err) reject(err);
                else resolve(res);
            }
            );
        });
    }

    updateSchedule(date: string,username_1: string,username_2: string): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<ResultSetHeader>(
            "UPDATE schedule SET user_id = (SELECT ID FROM users WHERE username = ?) WHERE date = ? AND user_id = (SELECT ID FROM users WHERE username = ?)",
            [username_2, date, username_1],
            (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            }
          );
        });
    }

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