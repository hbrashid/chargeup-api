
CREATE TABLE `users` (
  `ID` INT NOT NULL,
  `Email` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`));

ALTER TABLE `users` 
CHANGE COLUMN `ID` `ID` INT NOT NULL AUTO_INCREMENT ;

CREATE TABLE `data` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `UserID` INT NULL,
  `SunTime` INT NULL,
  `WaterIntake` INT NULL,
  `TotalProgress` INT NULL,
  PRIMARY KEY (`ID`),
  CONSTRAINT `UserId`
    FOREIGN KEY (`UserID`)
    REFERENCES `weather`.`users` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER TABLE `data` 
CHANGE COLUMN `SunTime` `SunTime` INT NULL DEFAULT NULL ,
CHANGE COLUMN `WaterIntake` `WaterIntake` INT NULL DEFAULT NULL ;


-- SEED DATA

INSERT INTO `users` (`Email`, `Password`) VALUES ('test123@gmail.com', '123');