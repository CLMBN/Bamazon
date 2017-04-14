CREATE DATABASE Bamazon;
USE Bamazon;
CREATE TABLE products (
	item_id INT NOT NULL,
	product_name VARCHAR(250) NOT NULL,
	department_name VARCHAR(100) NOT NULL,
	price DECIMAL(10, 2) NOT NULL,
	stock_quantity INT NOT NULL,
	UNIQUE KEY (item_id)
);

INSERT INTO products(item_id, product_name, department_name, price, stock_quantity)
VALUES (1, 'Motor Oil', 'auto', 29.99, 15),
       (2, 'Fishing Pole', 'sporting goods', 16.50, 5),
       (3, 'Gel Pens', 'office supplies', 1.79, 8),
       (4, 'USB Car charger', 'electronics', 6.99, 3),
       (5, 'The Celestine Prophecy', 'books', 8.99, 2),
       (6, 'pencil', 'office supplies', 0.25, 20),
       (7, 'Palmolive DishWashing Detergent', 'home goods', 8.99, 15),
       (8, 'Tomatoes', 'grocery', 2.99, 50),
       (9, 'Bread', 'grocery', 3.99, 25),
       (10, 'HDMI Cable', 'electronics', 15.79, 9);