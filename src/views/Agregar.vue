<template>
    <body>
        <header>
            <a href="https://www.uleam.edu.ec/"  class="logo">
            <img src="../assets/logouleam.png" alt="Logo Uleam" class="imglogo">
        </a>
        <h3 class="titulo">Gestion de inventario Mobiliario</h3>           
    </header>
    
    <div class="eleccion">
        <router-link to="/inventario" class="btn-inicio">Regresar</router-link>
        
        <form @submit.prevent="submitForm">
            
            <label for="nombreMobiliario">Nombre del Mobiliario:</label>
            <input v-model= formData.nombre type="text" placeholder="Ingrese el nombre" id="nombreMobiliario" name="nombreMobiliario" required>
            <p class="mensaje-error" v-if="formErrors.nombre">{{ formErrors.nombre }}</p>

            <label for="codigo">Codigo:</label>
            <input v-model= formData.codigo type="text" placeholder="El codigo debe ser similar a-123" id="codigo" name="codigo" required>
            <p class="mensaje-error" v-if="formErrors.codigo">{{ formErrors.codigo }}</p>

            <label for="tipo">Tipo:</label>
            <input v-model= formData.tipo type="text" placeholder="Ingrese el tipo de mobiliario" id="tipo" name="tipo" required>
            <p class="mensaje-error" v-if="formErrors.tipo">{{ formErrors.tipo }}</p>

            <label for="cantidad">Cantidad:</label>
            <input v-model="formData.cant" type="number" placeholder="Ingrese la cantidad" id="cantidad" name="cantidad" required>
            <p class="mensaje-error" v-if="formErrors.cant">{{ formErrors.cant }}</p>

            <label for="facultad">Facultad:</label>
            <input v-model= formData.fac type="text" placeholder="Ingrese la facultad" id="facultad" name="facultad" required>
            <p class="mensaje-error" v-if="formErrors.fac">{{ formErrors.fac }}</p>


            <label for="ubicacion">Ubicación:</label>
            <input v-model= formData.ubi type="text" placeholder="Ingrese la ubicación dentro de la facultad" id="ubicacion" name="ubicacion" required>
            <p class="mensaje-error" v-if="formErrors.ubi">{{ formErrors.ubi }}</p>


            <button type="submit" class="boton">Agregar Mobiliario</button>
        </form>
    </div>
    
    <footer>
        <p>© 2023 Miguel Angel Ortega Giler</p>
    </footer>
</body>
</template>

<script>
export default {
  name: "Agregar",
  data() {
    return {
      formData: {
        nombre: "",
        codigo: "",
        tipo: "",
        cant: "",
        fac: "",
        ubi: ""
      },
      formErrors: {
        nombre: "",
        codigo: "",
        tipo: "",
        cant: "",
        fac: "",
        ubi: ""
      }
    };
  },
  methods: {
    submitForm() {
      if (
        this.validarCampo("nombre", /^[a-zA-Z0-9\s]+$/, "Por favor, ingrese un nombre válido, solo se aceptan letras y números.") &&
        this.validarCampo("codigo", /^[a-zA-Z]+-\d+$/, "Por favor ingrese un código de la siguiente manera a-123") &&
        this.validarCampo("tipo", /^[a-zA-Z\s]+$/, "Por favor, ingrese un tipo válido, solo se aceptan letras.") &&
        this.validarCampo("fac", /^[a-zA-Z0-9\s]+$/, "Por favor, ingrese una facultad válida, solo se aceptan letras y números.") &&
        this.validarCampo("ubi", /^[a-zA-Z0-9\s]+$/, "Por favor, ingrese una ubicación válida, solo se aceptan letras y números.") &&
        this.validarCant()
      ) {
        const existingData = JSON.parse(localStorage.getItem("inventario")) || [];
        const codigoExists = existingData.some(
          (item) => item.codigo === this.formData.codigo
        );

        if (codigoExists) {
          alert("Ya existe un artículo con este código. Por favor, elija otro código.");
        } else {
          existingData.push(this.formData);
          localStorage.setItem("inventario", JSON.stringify(existingData));
          alert("Artículo agregado exitosamente.");
        }
      }
    },
    validarCant() {
      const cantidad = parseInt(this.formData.cant, 10);
      if (isNaN(cantidad) || cantidad < 0) {
        this.formErrors.cant = "Por favor, ingrese una cantidad válida mayor o igual a cero.";
        return false;
      } else {
        this.formErrors.cantidad = "";
        return true;
      }
    },
    validarCampo(campo, regex, mensajeError) {
      const valor = this.formData[campo];
      const isValid = regex.test(valor);
      this.formErrors[campo] = isValid ? "" : mensajeError;
      return isValid;
    }
  }
};
</script>

<style scoped>
body {
    font-family: sans-serif;
  margin: 0;
  padding: 0;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

a {
    text-decoration: none;
}

header{
    display: flex;
    height: 50px;
    background-color: rgb(237, 114, 48);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

.logo {
    display: flex;
    align-items: center;
}

.imglogo {
    height: 50px;
    margin-right: 10px;
}

.eleccion {
    width: 50%;
    margin: 80px auto; /* Ajuste la distancia superior según sea necesario */
    padding: 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
}
form {
    display: flex;
    flex-direction: column;
}

label {
    margin-top: 10px;
}

input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.boton {
    width: 50%;
    padding: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}
.mensaje-error{
  font-size: 14px;
  color: rgb(197, 62, 62);
}
.boton:hover {
    background-color: #555;
}

/* Estilo para el pie de página */
footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 10px;
    margin-top: auto;
}
.btn-inicio {
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
</style>