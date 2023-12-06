<template>
    <body>
      <header>
        <a href="https://www.uleam.edu.ec/" class="logo">
          <img src="../assets/logouleam.png" alt="Logo Uleam" class="imglogo">
        </a>
        <h3 class="titulo">Gestion de inventario Mobiliario</h3>
      </header>

      <form id="loginForm" @submit.prevent="submitForm">
        <router-link to="/" class="btn-regresar">Regresar</router-link>
        <label for="email">Correo Electrónico:</label>
        <input v-model="formData.email" type="email" placeholder="Ingrese su correo" id="email" name="email">
        <p class="mensaje-error" v-if="formErrors.email">{{ formErrors.email }}</p>
  
        <label for="password">Contraseña:</label>
        <input v-model="formData.password" type="password" placeholder="Ingrese su contraseña" id="password" name="password">
        <p class="mensaje-error" v-if="formErrors.password">{{ formErrors.password }}</p>
  
        <button type="submit">Iniciar Sesión</button>
        <h5>No tienes cuenta? <router-link to="/registro">Crea una Aquí</router-link></h5>
      </form>
 
      <footer>
        <p>© 2023 Miguel Angel Ortega Giler</p>
      </footer>
    </body>
  </template>
  
  <script>
  export default {
    name: "iniciar_sesion",
    data() {
      return {
        formData: {
          email: "",
          password: "",
        },
        formErrors: {
          email: "",
          password: "",
        },
      };
    },
    methods: {
      submitForm() {
        this.validateEmail();
        this.validatePassword();
  
        // Verificar si el usuario existe en el localStorage
        const storedUserData = localStorage.getItem(this.formData.email);
        if (!storedUserData) {
          this.formErrors.email = "Usuario no encontrado.";
          return;
        }
  
        const userData = JSON.parse(storedUserData);
  
        // Verificar si la contraseña coincide
        if (userData.contrasena !== this.formData.password) {
          this.formErrors.password = "Contraseña incorrecta.";
          return;
        }
  
        // Redirigir a la página de inicio de sesión exitosa
        this.$router.push("/inventario"); // Reemplaza "/dashboard" con la ruta deseada
  
        // Limpia los errores después de un inicio de sesión exitoso
        this.formErrors.email = "";
        this.formErrors.password = "";
      },
      validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.formData.email)) {
          this.formErrors.email = "Por favor, ingrese un correo electrónico válido.";
        } else {
          this.formErrors.email = "";
        }
      },
      validatePassword() {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordRegex.test(this.formData.password)) {
          this.formErrors.password = "La contraseña debe tener al menos 8 caracteres, incluyendo números y letras.";
        } else {
          this.formErrors.password = "";
        }
      },
    },
  };
  </script>
  

<style scoped>
header{
    display: flex;
    height: 50px;
    background-color: rgb(237, 114, 48);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}
body{
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
a{
    text-decoration: none;
    display: inline;
}
.logo{
    display: flex;
    align-items: center;
}
.imglogo{
    height: 50px;
    margin-right: 10px;
}
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1px;
    margin-top: auto;
}
form {
    background-color: #dcdcdc;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    width: 300px;
    margin: auto;
}
.form h5{
    font-family: sans-serif;
    font-size: 20px;
}
.form a{
    font-family: sans-serif;
    font-size: 13px;
}
label {
    display: block;
    margin-bottom: 8px;
    margin-top: 8px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 16px;
    box-sizing: border-box;
}

button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    margin: 0 auto;
    display: block;
}
button:hover {
    background-color: #45a049;
}
.mensaje-error {
    color: red;
    margin-top: -10px;
    margin-bottom: 10px;
    font-size: 14px; 
}
.btn-regresar {
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
}
</style>