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
    this.router.get("/year/:year/month/:month", this.controller.getScheduleByMonth);
    this.router.get("/user/:username", this.controller.getScheduleByUser);
    this.router.get("/user/:username/month/:month", this.controller.getScheduleByUserMonth);
    this.router.put("/update/:date/:username_1/:username_2", this.controller.update)

    
  }
}

export default new UserRoutes().router;