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
  
          <label for="nombre">Nombre:</label>
          <input v-model="formData.nombre" type="text" placeholder="Ingrese su nombre" id="nombre" name="nombre" required>
          <p class="mensaje-error" v-if="formErrors.nombre">{{ formErrors.nombre }}</p>
  
          <label for="email">Correo Electrónico:</label>
          <input v-model="formData.email" type="email" placeholder="Ingrese su Correo" id="email" name="email" required>
          <p class="mensaje-error" v-if="formErrors.email">{{ formErrors.email }}</p>
  
          <label for="cel">Numero de celular:</label>
          <input v-model="formData.cel" type="text" placeholder="Ingrese su numero de celular" id="cel" name="cel">
          <p class="mensaje-error" v-if="formErrors.cel">{{ formErrors.cel }}</p>
  
          <label for="fechaNacimiento">Fecha de Nacimiento:</label>
          <input v-model="formData.fechaNacimiento" type="date" id="fechaNacimiento" name="fechaNacimiento">
          <p class="mensaje-error" v-if="formErrors.fechaNacimiento">{{ formErrors.fechaNacimiento }}</p>
  
          <label for="genero">Género:</label>
          <select v-model="formData.genero" id="genero" name="genero">
          <option value="masculino">Masculino</option>
          <option value="femenino">Femenino</option>
          <option value="otros">Otros</option>
          </select>
          <p class="mensaje-error" v-if="formErrors.genero">{{ formErrors.genero }}</p>
  
          <label for="contrasena">Contraseña:</label>
          <input v-model="formData.contrasena" type="password" placeholder="Ingrese su contraseña" id="contrasena" name="contrasena">
          <p class="mensaje-error" v-if="formErrors.contrasena">{{ formErrors.contrasena }}</p>
  
          <button type="submit">Registrarse</button>
          <h5>Ya tienes cuenta? <router-link to="/sesion">Iniciar Sesión</router-link></h5>
          <p v-if="registroExitoso" class="mensaje-exito">¡Registro exitoso!</p>
      </form>
      <footer>
          <p>© 2023 Miguel Angel Ortega Giler</p>
      </footer>
  </body>
</template>

<script>
export default {
  name: "Registro",
  data() { //validacion
    return {
      formData: {
        nombre: "",
        email: "",
        cel: "",
        fechaNacimiento: "",
        genero: "",
        contrasena: "",
      },
      formErrors: {
        nombre: "",
        email: "",
        cel: "",
        fechaNacimiento: "",
        genero: "",
        contrasena: "",
      },
    };
  },
  methods: {
    submitForm() { //definicion metodos para la validacion
      this.validateNombre();
      this.validateEmail();
      this.validateCel();
      this.validateFechaNacimiento();
      this.validateGenero();
      this.validateContrasena();

      if (localStorage.getItem(this.formData.email)) {
        alert('¡El correo electrónico ya está en uso!');
        return; // Detener el proceso de registro si el correo ya está en uso
      }

      const userData = {
        nombre: this.formData.nombre,
        email: this.formData.email,
        cel: this.formData.cel,
        fechaNacimiento: this.formData.fechaNacimiento,
        genero: this.formData.genero,
        contrasena: this.formData.contrasena,
      };
      localStorage.setItem(this.formData.email, JSON.stringify(userData));
      localStorage.setItem("correoUsuario", this.formData.email);
      this.formData = {
        nombre: '',
        email: '',
        cel: '',
        fechaNacimiento: '',
        genero: '',
        contrasena: '',
      };

      // Mostrar mensaje de registro exitoso
      this.registroExitoso = true;
      
    },
    validateNombre() {
      const nombreRegex = /^[a-zA-Z\s]+$/;//Solo letras
      if (!nombreRegex.test(this.formData.nombre)) {
        this.formErrors.nombre = "Por favor, ingrese un nombre válido.";
      } else {
        this.formErrors.nombre = "";
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;//email estandar
      if (!emailRegex.test(this.formData.email)) {
        this.formErrors.email = "Por favor, ingrese un correo electrónico válido.";
      } else {
        this.formErrors.email = "";
      }
    },
    validateCel() {
      const celRegex = /^[0-9]{10}$/; //10 digitos incluiodo 0 para numero de celular
      if (this.formData.cel && !celRegex.test(this.formData.cel)) {
        this.formErrors.cel = "El numero de celular debe tener 10 caracteres";
      } else {
        this.formErrors.cel = "";
      }
    },
    validateFechaNacimiento() {
      if (!this.formData.fechaNacimiento) {//Por si no se ingresa nada
        this.formErrors.fechaNacimiento = "Por favor, ingrese su fecha de nacimiento.";
      } else {
        this.formErrors.fechaNacimiento = "";
      }
    },
    validateGenero() {

      if (!this.formData.genero) {//por si no se ingresa nada
        this.formErrors.genero = "Por favor, seleccione su género.";
      } else {
        this.formErrors.genero = "";
      }
    },
    validateContrasena() {
      const contrasenaRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;//Contraseña 8 caracteres minimo, con letras y numeros
      if (!contrasenaRegex.test(this.formData.contrasena)) { 
        this.formErrors.contrasena = "La contraseña debe tener al menos 8 caracteres.";
      } else {
        this.formErrors.contrasena = "";
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
  margin-top: 20px;
  margin-bottom: 20px;
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
.mensaje-exito {
    color: green;
    margin-top: 10px;
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

form select {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}
.mensaje-error{
  font-size: 14px;
  color: rgb(197, 62, 62);
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