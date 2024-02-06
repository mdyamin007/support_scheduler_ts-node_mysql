import { Request, Response } from "express";
import User from "../models/user.model";
import userRepository from "../repositories/user.repository";

export default class UserController {
  async create(req: Request, res: Response) {
    if (!req.body.username) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }

    try {
      const user: User = req.body;
      const savedUser = await userRepository.save(user);

      res.status(201).send(savedUser);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving users."
      });
    }
  }

  async findAll(req: Request, res: Response) {
    // const username = typeof req.query.username === "string" ? req.query.username : "";

    try {
      const Users = await userRepository.retrieveAll();
      console.log(Users)
      res.status(200).send(Users);
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while retrieving Users."
      });
    }
  }

  async findOne(req: Request, res: Response) {
    const username: string = req.params.username;

    try {
      const user = await userRepository.retrieveByUsername(username);

      if (user) res.status(200).send(user);
      else
        res.status(404).send({
          message: `Cannot find User with username=${username}.`
        });
    } catch (err) {
      res.status(500).send({
        message: `Error retrieving User with username=${username}.`
      });
    }
  }

  async update(req: Request, res: Response) {
    let user: User = req.body;
    user.username = req.params.username;

    try {
      const num = await userRepository.update(user);

      if (num == 1) {
        res.send({
          message: "User was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update User with username=${user.username}. Maybe User was not found or req.body is empty!`
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Error updating User with username=${user.username}.`
      });
    }
  }

  async delete(req: Request, res: Response) {
    const username: string = req.params.username;

    try {
      const num = await userRepository.delete(username);

      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete User with username=${username}. Maybe User was not found!`,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: `Could not delete User with username==${username}.`
      });
    }
  }

  async deleteAll(req: Request, res: Response) {
    try {
      const num = await userRepository.deleteAll();

      res.send({ message: `${num} Users were deleted successfully!` });
    } catch (err) {
      res.status(500).send({
        message: "Some error occurred while removing all Users."
      });
    }
  }
}