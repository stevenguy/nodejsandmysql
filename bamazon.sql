DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE  bamazon_db;

USE bamazon_db;

CREATE TABLE inventory (  
	item_id INT NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(200) NOT NULL,
    depart_name VARCHAR(50),
    price DECIMAL (10, 2),
    stock_qty INT,
    PRIMARY KEY (item_id) 
);

INSERT INTO inventory (prod_name, depart_name, price, stock_qty)
VALUES
    ('Google ChromeCast', 'Electronics', 79.99, 30),
    ('HP OfficeJet 3830 All-in-One Wireless Printer Mobile Printing', 'Office', 198.00, 40),
    ('Lord of the Rings Book Set', 'Books', 99.99, 25),
    ('A Huntsmans Fate: A Sword And Sorcery Bundle', 'Books', 99.98, 10),
    ('MARS Chocolate Favorites Fun Size Halloween Candy Bars Variety Mix 33.9-Ounce 60-Piece Bag', 'Food', 19.99, 18),
    ('New Apple 13" MacBook Air (2017 Newest Version) 1.8GHz Core i5 CPU, 8GB RAM, 128GB SSD', 'Electronics', 9.99, 100),
    ('2pac T-Shirt', 'Clothing', 24.99, 5), ('Biggie T-Shirt', 'Clothing', 24.99, 8), ('See Candies', 'Food', 29.00, 15),
    ('BestOffice Ergonomic PU Leather High Back Executive Office Chair, Black', 'Office', 149.00, 5);