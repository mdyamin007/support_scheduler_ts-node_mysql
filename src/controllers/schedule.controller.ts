import { Request, Response } from "express";
import Schedule from "../models/schedule.model";
import User from "../models/user.model";
import scheduleRepository from "../repositories/schedule.repository";
import userRepository from "../repositories/user.repository";
import algorithm from "../utils/algorithm"


interface Iassignment {
  [date: string]: [number, number];
  
}

interface ISchedule {
  id?: number;
  date?: string;
  user_id?: number;
}

export default class ScheduleController {
//   async findAll(req: Request, res: Response) {
//     const username = typeof req.query.username === "string" ? req.query.username : "";

//     try {
//       const Users = await scheduleRepository.retrieveAll({ username: username });

//       res.status(200).send(Users);
//     } catch (err) {
//       res.status(500).send({
//         message: "Some error occurred while retrieving Users."
//       });
//     }
//   }

//   async findOne(req: Request, res: Response) {
//     const username: string = req.params.username;

//     try {
//       const user = await scheduleRepository.retrieveByUsername(username);

//       if (user) res.status(200).send(user);
//       else
//         res.status(404).send({
//           message: `Cannot find User with username=${username}.`
//         });
//     } catch (err) {
//       res.status(500).send({
//         message: `Error retrieving User with username=${username}.`
//       });
//     }
//   }

  async create(req: Request, res: Response) {
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const date : string = req.body.date;
      const username: string = req.body.username;
      const user: User = await userRepository.retrieveByUsername(username);
      console.log(user)
      const schedule: any = {
        date,
        user_id: user.ID
      }
      console.log(schedule);
      
      const savedSchedule = await scheduleRepository.save(schedule);
      console.log(savedSchedule)

      res.status(201).send("Schedule created successfully!");
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while creating schedule.",
        error: err.message
      });
    }
  }

async getScheduleByUserMonth(req: Request,res: Response) {
  const username: string = req.params.username;
  const month: number = Number(req.params.month);
  try {
    const schedule = await scheduleRepository.retrieveByUsernameMonth(username, month);
    for (let obj of schedule) {
      const date = new Date(obj.date);
      obj.date = date.toLocaleDateString('en-US');
      const user = await userRepository.retrieveById(obj.user_id);
      obj.username = user.username;
    }
    console.log(schedule)
    if(schedule) res.status(200).send(schedule);
    else {
      res.status(404).send({
          message: `Cannot find user with username=${username} and month=${month}.`}
      );
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving user with username=${username}.`,
      error: err.message
    });
  }
}

async getScheduleByUser(req: Request, res: Response) {
  const username: string = req.params.username;
  try {
    const schedule = await scheduleRepository.retrieveByUsername(username);
    for (let obj of schedule) {
      const date = new Date(obj.date);
      obj.date = date.toLocaleDateString('en-US');
      const user = await userRepository.retrieveById(obj.user_id);
      obj.username = user.username;
    }
    console.log(schedule)
    if(schedule) res.status(200).send(schedule);
    else {
      res.status(404).send({
          message: `Cannot find user with username=${username}.`}
      );
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving user with username=${username}.`,
      error: err.message
    });
  }
}

async getScheduleByYear(req: Request, res: Response) {
  const year: number = Number(req.params.year);
  try {
    const schedule = await scheduleRepository.retrieveByYear(year);
    for (let obj of schedule) {
      const date = new Date(obj.date);
      obj.date = date.toLocaleDateString('en-US');
      const user = await userRepository.retrieveById(obj.user_id);
      obj.username = user.username;
    }
    console.log(schedule)
    if(schedule) res.status(200).send(schedule);
    else {
      res.status(404).send({
          message: `Cannot find year with year=${year}.`}
      );
    }
  } catch (err) {
    res.status(500).send({
      message: `Error retrieving year with year=${year}.`,
      error: err.message
    });
  }
}

async getScheduleByMonth(req: Request, res: Response) {
    const year: number = Number(req.params.year);
    const month: number = Number(req.params.month);

    try {
      const schedule = await scheduleRepository.retrieveByMonth(year, month);
      for (let obj of schedule) {
        const date = new Date(obj.date);
        obj.date = date.toLocaleDateString('en-US');
        const user = await userRepository.retrieveById(obj.user_id);
        obj.username = user.username;
      }
      console.log(schedule)

      if (schedule.length) res.status(200).send(schedule);
      else {
        //   res.status(404).send({
        //     message: `Cannot find User with username=${username}.`
        //   });
        const peoples = JSON.parse(JSON.stringify(await userRepository.retrieveAll()));
        // console.log(peoples) 
        let peopleArray: string[] = []
        peoples.forEach(people => {
          peopleArray.push(people.ID)
        });
        // console.log(peopleArray)
        const assignments: Iassignment = algorithm(peopleArray, 2024, month);
        console.log(assignments);
        Object.keys(assignments).forEach( async (key: string) => {
          let user_id_1 = assignments[key][0];
          let user_id_2 = assignments[key][1];
          let schedule1: any = { date: key, user_id: user_id_1 };
          let schedule2: any = { date: key, user_id: user_id_2};
          await scheduleRepository.save(schedule1);
          await scheduleRepository.save(schedule2);
        })
        // const schedule = await scheduleRepository.retrieveByMonth(month);
        // console.log(schedule.length);
        // if (schedule.length) res.status(200).send(schedule);
        res.status(201).send("No data found! Schedule Initiated for that month!");
      }
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with month=${month}.`,
        error: err.message
      });
    }
}





  async update(req: Request, res: Response) {
    let username_1: string = req.params.username_1;
    let username_2: string = req.params.username_2;
    let date: string = req.params.date;

    try {
      const num = await scheduleRepository.updateSchedule(date, username_1, username_2);

      if (num == 1) {
        res.send({
          message: `Schedule was updated successfully for date:${date} and user=${username_1} with user=${username_2}`
        });
      } else {
        res.send({
          message: `Cannot update User with username=${username_1}. Maybe User was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with username=${username_1}.`,
        error: err.message
      });
    }
  }

  async delete(req: Request, res: Response) {
    const date: string = req.params.date;

    try {
      const num = await scheduleRepository.delete(date);
      console.log(num);
      if (num >= 1) {
        res.send({
          message: "Schedule was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Schedule with date=${date}. Maybe Schedule was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete Schedule with date=${date}.`,
        error: err.message
      });
    }
  }

//   async deleteAll(req: Request, res: Response) {
//     try {
//       const num = await scheduleRepository.deleteAll();

//       res.send({ message: `${num} Users were deleted successfully!` });
//     } catch (err) {
//       res.status(500).send({
//         message: "Some error occurred while removing all Users."
//       });
//     }
//   }
}