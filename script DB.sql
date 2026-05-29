CREATE DATABASE PruebaTecnicaDB;
GO

USE PruebaTecnicaDB;
GO

-- Tabla de Usuarios
CREATE TABLE Users (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    Role NVARCHAR(50) NOT NULL DEFAULT 'User'
);

-- Tabla de Productos
CREATE TABLE Products (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(500),
    Price DECIMAL(18,2) NOT NULL CHECK (Price >= 0),
    Stock INT NOT NULL CHECK (Stock >= 0),
    Type NVARCHAR(50) NOT NULL
);

-- la contraseña solo es un placeholder
INSERT INTO Users (Email, PasswordHash, Role) VALUES 
('admin@test.com', '$2a$11$K8QuZzF9hLJzYzQg5z5YH.k5q5q5q5q5q5q5q5q5q5q5q5q5q5q5q', 'Admin');
