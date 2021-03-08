USE [master]
GO
/****** Object:  Database [db_marcelo_doz]    Script Date: 08/03/2021 11:29:25 ******/
CREATE DATABASE [db_marcelo_doz]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'db_marcelo_doz', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\db_marcelo_doz.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'db_marcelo_doz_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\db_marcelo_doz_log.ldf' , SIZE = 2048KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [db_marcelo_doz] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [db_marcelo_doz].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [db_marcelo_doz] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET ARITHABORT OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [db_marcelo_doz] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [db_marcelo_doz] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET  DISABLE_BROKER 
GO
ALTER DATABASE [db_marcelo_doz] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [db_marcelo_doz] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [db_marcelo_doz] SET  MULTI_USER 
GO
ALTER DATABASE [db_marcelo_doz] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [db_marcelo_doz] SET DB_CHAINING OFF 
GO
ALTER DATABASE [db_marcelo_doz] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [db_marcelo_doz] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [db_marcelo_doz] SET DELAYED_DURABILITY = DISABLED 
GO
USE [db_marcelo_doz]
GO
/****** Object:  Table [dbo].[Customers]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Customers](
	[customer_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_first_name] [varchar](50) NOT NULL,
	[customer_last_name] [varchar](50) NOT NULL,
	[customer_dni] [int] NOT NULL,
	[customer_birth_date] [date] NOT NULL,
	[customer_credit_card] [bigint] NOT NULL,
 CONSTRAINT [PK_Customers] PRIMARY KEY CLUSTERED 
(
	[customer_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Employees]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Employees](
	[employee_id] [int] IDENTITY(1,1) NOT NULL,
	[employee_first_name] [varchar](50) NOT NULL,
	[employee_last_name] [varchar](50) NOT NULL,
	[employee_dni] [varchar](50) NOT NULL,
	[employee_birth_date] [date] NOT NULL,
 CONSTRAINT [PK_Employees_1] PRIMARY KEY CLUSTERED 
(
	[employee_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Order_details]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order_details](
	[order_detail_id] [int] IDENTITY(1,1) NOT NULL,
	[order_id] [int] NOT NULL,
	[product_id] [int] NOT NULL,
	[order_detail_quantity] [int] NOT NULL,
	[order_detail_unit_price] [float] NOT NULL,
 CONSTRAINT [PK_Order_details] PRIMARY KEY CLUSTERED 
(
	[order_detail_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Orders]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Orders](
	[order_id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NOT NULL,
	[employee_id] [int] NOT NULL,
	[order_sale_date] [date] NOT NULL,
	[order_total_price] [float] NOT NULL,
 CONSTRAINT [PK_Orders] PRIMARY KEY CLUSTERED 
(
	[order_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Products]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Products](
	[product_id] [int] IDENTITY(1,1) NOT NULL,
	[product_name] [varchar](50) NOT NULL,
	[product_brand] [varchar](50) NOT NULL,
	[product_expiration_date] [date] NOT NULL,
	[product_unit_price] [float] NOT NULL,
	[provider_id] [int] NOT NULL,
 CONSTRAINT [PK_Products] PRIMARY KEY CLUSTERED 
(
	[product_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Providers]    Script Date: 08/03/2021 11:29:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Providers](
	[provider_id] [int] IDENTITY(1,1) NOT NULL,
	[provider_name] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Providers] PRIMARY KEY CLUSTERED 
(
	[provider_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
ALTER TABLE [dbo].[Order_details]  WITH CHECK ADD  CONSTRAINT [FK_Order_details_Orders] FOREIGN KEY([order_id])
REFERENCES [dbo].[Orders] ([order_id])
GO
ALTER TABLE [dbo].[Order_details] CHECK CONSTRAINT [FK_Order_details_Orders]
GO
ALTER TABLE [dbo].[Order_details]  WITH CHECK ADD  CONSTRAINT [FK_Order_details_Products] FOREIGN KEY([product_id])
REFERENCES [dbo].[Products] ([product_id])
GO
ALTER TABLE [dbo].[Order_details] CHECK CONSTRAINT [FK_Order_details_Products]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Customers] FOREIGN KEY([customer_id])
REFERENCES [dbo].[Customers] ([customer_id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Customers]
GO
ALTER TABLE [dbo].[Orders]  WITH CHECK ADD  CONSTRAINT [FK_Orders_Employees] FOREIGN KEY([employee_id])
REFERENCES [dbo].[Employees] ([employee_id])
GO
ALTER TABLE [dbo].[Orders] CHECK CONSTRAINT [FK_Orders_Employees]
GO
ALTER TABLE [dbo].[Products]  WITH CHECK ADD  CONSTRAINT [FK_Products_Providers] FOREIGN KEY([provider_id])
REFERENCES [dbo].[Providers] ([provider_id])
GO
ALTER TABLE [dbo].[Products] CHECK CONSTRAINT [FK_Products_Providers]
GO
USE [master]
GO
ALTER DATABASE [db_marcelo_doz] SET  READ_WRITE 
GO

USE [db_marcelo_doz]

INSERT INTO Providers(provider_name) VALUES ('Arcor S.A');
INSERT INTO Providers(provider_name) VALUES ('Nestle S.A');
INSERT INTO Providers(provider_name) VALUES ('Felfort S.A');

INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('Chocolate','Cofler','2021-02-14',10.5,1);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('OrangeJuice','Cepita','2020-10-20',85.69,2);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('Cookies','Toddy','2020-05-08',60.98,3);
INSERT INTO Products(product_name, product_brand, product_expiration_date,product_unit_price,provider_id) VALUES ('IceCream','Frigor','2020-09-08',100,1);




INSERT INTO Customers(customer_first_name, customer_last_name, customer_dni,customer_birth_date,customer_credit_card) VALUES ('Flavio','Bedogni','38158993','2006-10-20','4024007196217847');
INSERT INTO Customers(customer_first_name, customer_last_name, customer_dni,customer_birth_date,customer_credit_card) VALUES ('Federico','Fanjul','35789634','2000-08-14','3793852446762344');
INSERT INTO Customers(customer_first_name, customer_last_name, customer_dni,customer_birth_date,customer_credit_card) VALUES ('Jorge','Steifensand','24668689','1977-01-27','4716515855139766');

INSERT INTO Employees(employee_first_name, employee_last_name, employee_dni,employee_birth_date) VALUES ('Esteban','Gomez','36058470','1990-10-20');
INSERT INTO Employees(employee_first_name, employee_last_name, employee_dni,employee_birth_date) VALUES ('Juan','Perez','35105498','1987-08-06');

INSERT INTO Orders(customer_id, employee_id,order_sale_date,order_total_price) VALUES (1,1,'2021-03-08',374.2);
INSERT INTO Orders(customer_id, employee_id,order_sale_date,order_total_price) VALUES (2,1,'2021-03-08',81.98);


INSERT INTO Order_details(order_id, product_id, order_detail_quantity,order_detail_unit_price) VALUES (1,1,3,10.5);
INSERT INTO Order_details(order_id, product_id, order_detail_quantity,order_detail_unit_price) VALUES (1,2,4,85.69);
INSERT INTO Order_details(order_id, product_id, order_detail_quantity,order_detail_unit_price) VALUES (2,1,2,10.5);
INSERT INTO Order_details(order_id, product_id, order_detail_quantity,order_detail_unit_price) VALUES (2,3,1,60.98);
