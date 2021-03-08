INSERT INTO Employees(employee_name, employee_surname, employee_dni,employee_birth_date) VALUES ('sql','sql','1','2018-10-20');

INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('Chocolate','Cofler','2021-02-14',10.5,1);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('OrangeJuice','Cepita','2020-10-20',85.69,2);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('Cookies','Toddy','2020-05-08',60.98,3);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('IceCream','Frigor','2020-09-08',100,1);


INSERT INTO Providers(provider_name) VALUES ('Arcor S.A');
INSERT INTO Providers(provider_name) VALUES ('Nestle S.A');
INSERT INTO Providers(provider_name) VALUES ('Felfort S.A');

INSERT INTO Customers(customer_first_name, customer_last_name, customer_dni,customer_birth_date,customer_credit_card) VALUES ('c1','c1','88888888','2018-10-20','11111111111111111');
INSERT INTO Customers(customer_first_name, customer_last_name, customer_dni,customer_birth_date,customer_credit_card) VALUES ('c2','c3','77777777','2019-08-14','22222222222222222');


Select * from Customers;
SELECT p.product_name,p.product_brand,p.product_expiration_date,p.product_unit_price,pv.provider_name
FROM Products as p	
INNER JOIN Products_has_Providers as php
    ON php.product_id = p.product_id
INNER JOIN Providers as pv
    ON php.provider_id = pv.provider_id

	DELETE FROM Orders WHERE order_id=1;

