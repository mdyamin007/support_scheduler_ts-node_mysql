CREATE TABLE IF NOT EXISTS `support_scheduler`.`users` (
  `ID` INT NOT NULL AUTO_INCREMENT ,
  `username` VARCHAR(15) NOT NULL ,
  PRIMARY KEY (`ID`)) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `support_scheduler`.`schedule` (
  `date` DATE NOT NULL,
  `user_id` INT NOT NULL,
  PRIMARY KEY (`date`, `user_id`)
) ENGINE = InnoDB;

ALTER TABLE `support_scheduler`.`schedule`
ADD CONSTRAINT `fk_user_id`
FOREIGN KEY (`user_id`) REFERENCES `users`(`ID`)
ON DELETE CASCADE
ON UPDATE CASCADE;
