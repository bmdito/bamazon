CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE product(
id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(30) NOT NULL,
department_name VARCHAR(30) NOT NULL,
price INT(10) NOT NULL,
stock_quantity INT(10) NOT NULL,
PRIMARY KEY(id)

)