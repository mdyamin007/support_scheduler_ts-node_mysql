import connection from "../db";
import User from "../models/user.model";
import { ResultSetHeader } from "mysql2";

interface IUserRepository {
  save(user: User): Promise<User>;
  retrieveAll(searchParams: {username: string}): Promise<User[]>;
  retrieveByUsername(username: string): Promise<User | undefined>;
  retrieveById(id: number): Promise<User | undefined>;
  update(user: User): Promise<number>;
  delete(username: string): Promise<number>;
  deleteAll(): Promise<number>;
}

class UserRepository implements IUserRepository { 

    save(user: User): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<ResultSetHeader>(
            "INSERT INTO users (username) VALUES(?)",
            [user.username],
            (err, res) => {
                if (err) reject(err);
                else
                this.retrieveById(res.insertId)
                    .then((user) => resolve(user!))
                    .catch(reject);
            }
            );
        });
    }

    retrieveAll(searchParams: {username?: string}): Promise<User[]> {
        let query: string = "SELECT * FROM users";
        let condition: string = "";
      
        if (searchParams?.username)
          condition += `LOWER(username) LIKE '%${searchParams.username}%'`
      
        if (condition.length)
          query += " WHERE " + condition;
      
        return new Promise((resolve, reject) => {
          connection.query<User[]>(query, (err, res) => {
            if (err) reject(err);
            else resolve(res);
          });
        });
      }

    retrieveById(id: number): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
            "SELECT * FROM users WHERE id = ?",
            [id],
            (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
            }
            );
        });
    }

    retrieveByUsername(username: string): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
            "SELECT * FROM users WHERE username = ?",
            [username],
            (err, res) => {
                if (err) reject(err);
                else resolve(res?.[0]);
            }
            );
        });
    }

    update(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<ResultSetHeader>(
            "UPDATE users SET username = ?",
            [user.username],
            (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            }
          );
        });
    }

    delete(username: string): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<ResultSetHeader>(
            "DELETE FROM users WHERE username = ?",
            [username],
            (err, res) => {
              if (err) reject(err);
              else resolve(res.affectedRows);
            }
          );
        });
    }

    deleteAll(): Promise<number> {
        return new Promise((resolve, reject) => {
          connection.query<ResultSetHeader>("DELETE FROM users", (err, res) => {
            if (err) reject(err);
            else resolve(res.affectedRows);
          });
        });
      }
}

export default new UserRepository();