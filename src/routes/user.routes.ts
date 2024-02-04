import { Router } from "express";
import UserController from "../controllers/user.controller";

class UserRoutes {
  router = Router();
  controller = new UserController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new User
    this.router.post("/", this.controller.create);

    // Retrieve all Users
    this.router.get("/", this.controller.findAll);

    // Retrieve a single User with username
    this.router.get("/:username", this.controller.findOne);

    // Update a User with username
    this.router.put("/:username", this.controller.update);

    // Delete a User with username
    this.router.delete("/:username", this.controller.delete);

    // Delete all Users
    this.router.delete("/", this.controller.deleteAll);
  }
}

export default new UserRoutes().router;