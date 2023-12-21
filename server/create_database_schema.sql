CREATE DATABASE IF NOT EXISTS quizdb;
GRANT ALL PRIVILEGES ON quizdb.* TO 'quiz'@'localhost';
USE quizdb;


CREATE TABLE IF NOT EXISTS countries (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
    name VARCHAR(1000) NOT NULL, 
    overpass_name VARCHAR(1000) NOT NULL
    );

CREATE TABLE IF NOT EXISTS administrative_boundaries (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    level_number INT NOT NULL,
    name VARCHAR(1000) NOT NULL, 
    country_id INT,
    has_centre BOOL,
    FOREIGN KEY (country_id)
        REFERENCES countries(id),
    CHECK (level_number>2 && level_number<11)
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
    INSERT INTO administrative_boundaries(level_number, name, country_id, has_centre)
        VALUE (level_number, name, id, has_centre);
END $$

DELIMITER ;