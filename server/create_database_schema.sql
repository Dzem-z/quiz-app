CREATE DATABASE IF NOT EXISTS quizdb;
CREATE USER IF NOT EXISTS 'quiz'@'%' IDENTIFIED BY 'quiz_password';
GRANT ALL PRIVILEGES ON quizdb.* TO 'quiz'@'%';
USE quizdb;


CREATE TABLE IF NOT EXISTS countries (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name VARCHAR(1000) NOT NULL, 
    overpass_name VARCHAR(1000) NOT NULL
    );

CREATE TABLE IF NOT EXISTS administrative_levels (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    level_number INT NOT NULL,
    name VARCHAR(1000) NOT NULL, 
    country_id INT,
    has_centre BOOL,
    FOREIGN KEY (country_id)
        REFERENCES countries(id),
    CHECK (level_number>2 && level_number<12)
    );



DELIMITER $$

CREATE PROCEDURE InsertCountry(
    IN name VARCHAR(1000),
    IN overpass_name VARCHAR(1000)
)
BEGIN
    INSERT INTO countries(name, overpass_name) 
    VALUE (name, overpass_name);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE AddAdministrativeLevel(
    IN country_name VARCHAR(1000),
    IN level_number INT,
    IN name VARCHAR(1000),
    IN has_centre BOOL
)
BEGIN
    DECLARE id INT DEFAULT 0;
    SELECT countries.id  INTO id FROM countries WHERE countries.name=country_name;
    INSERT INTO administrative_levels(level_number, name, country_id, has_centre)
        VALUE (level_number, name, id, has_centre);
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetCountries()
BEGIN
    SELECT id, name, overpass_name FROM countries;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE GetAdministrativeLevel(
    IN country_id INT
)
BEGIN
    SELECT level_number, name, has_centre FROM administrative_levels WHERE administrative_levels.country_id = country_id;
END $$

DELIMITER ;

DELIMITER $$
