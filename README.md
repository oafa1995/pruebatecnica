# Prueba Técnica Full Stack - React + .NET Core 10
Aplicación web con autenticación JWT y CRUD de productos.  
**Frontend:** React 19 + Vite  
**Backend:** .NET Core 10 Web API  
**Base de datos:** SQL Server  

## Requisitos previos

- [.NET Core 10 SDK](https://dotnet.microsoft.com/download)
- [Visual Studio 2026](https://visualstudio.microsoft.com/) (opcional, pero recomendado para el backend)
- [Visual Studio Code] (opcional, recomendado para el frontend)
- [Node.js 20+](https://nodejs.org/)
- [SQL Server](https://www.microsoft.com/es-es/sql-server/sql-server-downloads) (Express, Developer o LocalDB)
- [Git](https://git-scm.com/)

##  Instrucciones de ejecución

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/PruebaTecnica.git
cd PruebaTecnica

### 2. Configurar la base de datos

El backend puede crear la base de datos automáticamente al ejecutarse (si la cadena de conexión es correcta).  
Si prefieres crearla manualmente, ejecuta el script `script DB.sql` que se encuentra en la **raíz del proyecto** usando SQL Server Management Studio o Azure Data Studio.

> **Nota:** El script crea la base de datos `PruebaTecnicaDB`, las tablas `Users` y `Products`, e inserta un usuario de prueba (`admin@test.com` / `Admin123`). Pero por favor ejecutar el servicio reset-password para evitar problemas con la autenticacion

### 3. Ejecutar el backend desde la terminal (sin Visual Studio)

Abre una terminal en la carpeta backend y ejecuta:
dotnet restore
dotnet run --urls=https://localhost:7259

Una vez corriendo, Swagger estará en:
https://localhost:7259/swagger/index.html

Si es primera vez con HTTPS, acepta el certificado o ejecuta dotnet dev-certs https --trust.

### 4. Ejecutar FrontEnd

cd frontend
npm install   # solo la primera vez
npm run dev

El frontend estará disponible en:
http://localhost:5173/