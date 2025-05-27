# Finance App - Gestor de Finanzas

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/) 
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express&logoColor=white)](https://expressjs.com/) 
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/) 
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=flat&logo=angular&logoColor=white)](https://angular.io/) 
[![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=flat&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)

---

## 🚀 Descripción

**Finance App** es una aplicación web para la gestión personal de finanzas. Permite a los usuarios registrarse, iniciar sesión y visualizar un dashboard con un resumen financiero personalizado.

El backend está desarrollado con **Node.js** y **Express**, utilizando una base de datos **MySQL** y asegurando la autenticación mediante **JWT** y encriptación de contraseñas.

El frontend está construido con **Angular**, brindando una interfaz moderna, responsiva y segura, con validación de formularios y protección de rutas.

---

## 🛠 Tecnologías utilizadas

| Backend                   | Frontend           |
|--------------------------|--------------------|
| Node.js                  | Angular            |
| Express.js               | Bootstrap          |
| MySQL                    |                    |
| bcryptjs (encriptación)  |                    |
| JSON Web Tokens (JWT)    |                    |

---

## 📸 Capturas de pantalla

<div align="center">

| Login                              | Dashboard                          |
|-----------------------------------|----------------------------------|
| <img src="images/Login.png" alt="Login" width="350" style="border-radius:8px; box-shadow: 0 0 10px rgba(0,0,0,0.15);"/> | <img src="images/Dashboard.png" alt="Dashboard" width="350" style="border-radius:8px; box-shadow: 0 0 10px rgba(0,0,0,0.15);"/> |

</div>

---

## ⚙️ Estado del proyecto

El proyecto se encuentra **terminado**, aunque puede contener errores menores y funcionalidades pendientes que se implementarán en futuras versiones.

---

## 📦 Instalación y ejecución

### Backend

1. Configura la base de datos MySQL:

   - Importa el script SQL para crear la base de datos y tablas:

     ```bash
     mysql -u tu_usuario -p < Database/Finance-App.sql
     ```

2. Instala las dependencias:

   ```bash
   cd backend
   npm install
