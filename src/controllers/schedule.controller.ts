import { Request, Response } from "express";
import Schedule from "../models/schedule.model";
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

// async create(req: Request, res: Response) {
//   if (!req.body.username) {
//     res.status(400).send({
//       message: "Content can not be empty!"
//     });
//     return;
//   }

//   try {
//     const user: User = req.body;
//     const savedUser = await userRepository.save(user);

//     res.status(201).send(savedUser);
//   } catch (err) {
//     res.status(500).send({
//       message: "Some error occurred while retrieving users."
//     });
//   }
// }

async getScheduleByMonth(req: Request, res: Response) {
    const month: number = Number(req.params.month);

    try {
      const schedule = await scheduleRepository.retrieveByMonth(month);

      if (schedule) res.status(200).send(schedule);
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
        // console.log(assignments);
        Object.keys(assignments).forEach( async (key: string) => {
          let user_id_1 = assignments[key][0];
          let schedule1: any = { date: key, user_id: user_id_1 };
          let schedule2: any = { date: key, user_id: user_id_1};
          await scheduleRepository.save(schedule1);
          await scheduleRepository.save(schedule2);
        })
        const schedule = await scheduleRepository.retrieveByMonth(month);
        console.log(schedule)
        if (schedule) res.status(200).send(schedule);
      }
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with month=${month}.`
      });
    }
}

//   async update(req: Request, res: Response) {
//     let user: User = req.body;
//     user.username = req.params.username;

//     try {
//       const num = await scheduleRepository.update(user);

//       if (num == 1) {
//         res.send({
//           message: "User was updated successfully."
//         });
//       } else {
//         res.send({
//           message: `Cannot update User with username=${user.username}. Maybe User was not found or req.body is empty!`
//         });
//       }
//     } catch (err) {
//       res.status(500).send({
//         message: `Error updating User with username=${user.username}.`
//       });
//     }
//   }

//   async delete(req: Request, res: Response) {
//     const username: string = req.params.username;

//     try {
//       const num = await scheduleRepository.delete(username);

//       if (num == 1) {
//         res.send({
//           message: "User was deleted successfully!"
//         });
//       } else {
//         res.send({
//           message: `Cannot delete User with username=${username}. Maybe User was not found!`,
//         });
//       }
//     } catch (err) {
//       res.status(500).send({
//         message: `Could not delete User with username==${username}.`
//       });
//     }
//   }

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