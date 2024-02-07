import { Router } from "express";
import ScheduleController from "../controllers/schedule.controller";

class UserRoutes {
  router = Router();
  controller = new ScheduleController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    

    // Retrieve a month data by month
    this.router.get("/:year/:month", this.controller.getScheduleByMonth);

    
  }
}

export default new UserRoutes().router;