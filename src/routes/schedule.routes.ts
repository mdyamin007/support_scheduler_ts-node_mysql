import { Router } from "express";
import ScheduleController from "../controllers/schedule.controller";

class UserRoutes {
  router = Router();
  controller = new ScheduleController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    
    //Retrieve schedule by a year
    this.router.get("/year/:year", this.controller.getScheduleByYear)

    // Retrieve schedule data by month & year
    this.router.get("/year/:year/month/:month", this.controller.getScheduleByMonth);
    
    // Retrieve all schedule of an user in a specific date
    this.router.get("/year/:year/month/:month/day/:day", this.controller.getScheduleByDay);

    // Retrieve all schedule of an user
    this.router.get("/user/:username", this.controller.getScheduleByUser);


    // update a date's schedule by new user
    this.router.put("/update/:date/:username_1/:username_2", this.controller.update)

    // delete a date's schedule in case of holiday
    this.router.delete("/delete/:date", this.controller.delete);

    // add a user's schedule if needs to be added
    this.router.post("/add", this.controller.create);
    
  }
}

export default new UserRoutes().router;