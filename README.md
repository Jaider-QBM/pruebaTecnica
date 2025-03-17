# 🚀 Prueba Técnica - Aplicación Web con React, Express y MongoDB

Este proyecto implementa un sistema de autenticación de usuarios con **React (frontend)** y **Express.js + MongoDB (backend)**. Los usuarios pueden registrarse, iniciar sesión y acceder a rutas protegidas mediante **JSON Web Tokens (JWT)**.

## 📷 Vista Previa
![image](https://github.com/user-attachments/assets/5a1f3114-f72a-44e2-ad98-377680b52ff7)


## 🛠️ Tecnologías Utilizadas

### 🔹 Frontend:
- React (Vite)
- Tailwind CSS
- React Router
- Axios

### 🔹 Backend:
- Node.js con Express.js
- MongoDB con Mongoose
- JSON Web Tokens (JWT) para autenticación
- bcryptjs para el hash de contraseñas
- CORS y dotenv

## ⚙️ Funcionalidades
✅ Registro de usuarios  
✅ Inicio de sesión con JWT  
✅ Rutas protegidas  
✅ Validaciones en frontend y backend  
✅ Diseño responsivo  

## 🚀 Instalación y Ejecución

### 1️⃣ Clonar el repositorio:
```bash
git clone https://github.com/Jaider-QBM/pruebaTecnica.git
cd pruebaTecnica
```
### 2️⃣ Configurar el backend:
```bash
cd backend
npm install
cp .env.example .env 
nodemon src/server.js
```
### 3️⃣ Configurar el frontend:
```bash
cd frontend
npm install
npm run dev
```

## 📌 Variables de Entorno

Crea un archivo .env en la carpeta backend con los siguientes valores:
```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/Developer
JWT_SECRET=clave_secreta
```

