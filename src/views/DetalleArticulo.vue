<template>
    <body>
    <header>
            <a href="https://www.uleam.edu.ec/"  class="logo">
            <img src="../assets/logouleam.png" alt="Logo Uleam" class="imglogo">
        </a>
        <h3 class="titulo">Gestion de inventario Mobiliario</h3>           
    </header>
    <router-link to="/inventario" class="btn-inicio">Regresar</router-link>
    <div class="articulo">
    <div class="botones-container">
        <button class="eliminar-button" @click="eliminarArticulo">Eliminar</button>
        <button v-if="!editando" class="editar-button" @click="activarEdicion">Editar</button>
    </div>
    <div v-if="editando" class="edicion-input-container">
        <label class="espacio1" for="tipo">Tipo:</label>
        <input v-model="formData.tipo" type="text" required>

        <label class="espacio1" for="cantidad">Cantidad:</label>
        <input v-model="formData.cantidad" type="number" required>

        <label class="espacio1" for="facultad">Facultad:</label>
        <input v-model="formData.facultad" type="text" required>

        <label class="espacio1" for="ubicacion">Ubicación:</label>
        <input v-model="formData.ubicacion" type="text" required>
            <div class="botones-container">
                <button class="btn-final" @click="guardarEdicion">Guardar</button>
                <button class="btn-final" @click="cancelarEdicion">Cancelar</button>
            </div>
      </div>

    <h2>Detalle</h2>
    <p><strong>Nombre de Mobiliario:</strong> {{ nombreMobiliario }}</p>
    <p><strong>Codigo:</strong> {{ codigo }}</p>
    <p><strong>Tipo:</strong> {{ tipo }}</p>
    <p><strong>Cantidad:</strong> {{ cant }}</p>
    <p><strong>Facultad:</strong> {{ fac }}</p>
    <p><strong>Ubicación:</strong> {{ ubi }}</p>
  </div>

    <footer>
        <p>© 2023 Miguel Angel Ortega Giler</p>
    </footer>
</body>
</template>

<script>
export default {
  name: "DetalleArticulo",
  data() {
    return {
      // Puedes inicializar estos datos con los valores del artículo recuperado del localStorage
      nombreMobiliario: "",
      codigo: "",
      tipo: "",
      cant: 0,
      fac: "",
      ubi: "",
      // Nuevos datos para la edición
      editando: false,
      formData: {
        tipo: "",
        cantidad: 0,
        facultad: "",
        ubicacion: ""
      }
    };
  },
  created() {
    // Recupera el código del artículo de los parámetros de la ruta
    const codigoArticulo = this.$route.params.codigo;

    // Recupera el artículo del localStorage utilizando el código
    const articulo = this.getArticuloPorCodigo(codigoArticulo);

    // Actualiza los datos del componente con los valores del artículo
    if (articulo) {
      this.nombreMobiliario = articulo.nombre;
      this.codigo = articulo.codigo;
      this.tipo = articulo.tipo;
      this.cant = articulo.cant;
      this.fac = articulo.fac;
      this.ubi = articulo.ubi;

      // Inicializa los datos de formData para la edición
      this.formData.tipo = articulo.tipo;
      this.formData.cantidad = articulo.cant;
      this.formData.facultad = articulo.fac;
      this.formData.ubicacion = articulo.ubi;
    }
  },
  methods: {
    eliminarArticulo() {
    const codigoArticulo = this.$route.params.codigo;

    // Recupera el artículo del localStorage utilizando el código
    const articulo = this.getArticuloPorCodigo(codigoArticulo);

    if (articulo) {
        // Pregunta al usuario antes de eliminar
        const confirmarEliminar = window.confirm(`¿Estás seguro de que quieres eliminar el artículo "${articulo.nombre}"?`);

        if (confirmarEliminar) {
            // Recupera el índice del artículo en el array
            const index = this.getArticuloPorCodigo(codigoArticulo);

            if (index !== -1) {
                // Elimina el artículo del array
                const inventarioData = JSON.parse(localStorage.getItem("inventario")) || [];
                inventarioData.splice(index, 1);

                // Actualiza el localStorage con el nuevo array
                localStorage.setItem("inventario", JSON.stringify(inventarioData));

                // Redirige a la página de inventario después de eliminar
                this.$router.push("/inventario");
            }
        }
    }
},
    getArticuloPorCodigo(codigo) {
      // Recupera el artículo del localStorage utilizando el código
      const inventarioData = JSON.parse(localStorage.getItem("inventario")) || [];
      return inventarioData.find((articulo) => articulo.codigo === codigo);
    },
    //////////////////////////////////////////////////
    activarEdicion() {
      this.editando = true;
    },
    // Método para guardar los cambios de la edición
    guardarEdicion() {
      // Actualiza los datos del componente con los valores editados
      this.tipo = this.formData.tipo;
      this.cant = this.formData.cantidad;
      this.fac = this.formData.facultad;
      this.ubi = this.formData.ubicacion;

      // Actualiza los datos en el localStorage
      const codigoArticulo = this.$route.params.codigo;
      const index = this.getArticuloPorCodigo(codigoArticulo);

      if (index !== -1) {
        const inventarioData = JSON.parse(localStorage.getItem("inventario")) || [];
        inventarioData[index] = {
          ...inventarioData[index],
          tipo: this.formData.tipo,
          cant: this.formData.cantidad,
          fac: this.formData.facultad,
          ubi: this.formData.ubicacion
        };

        localStorage.setItem("inventario", JSON.stringify(inventarioData));
      }

      // Finaliza el modo de edición
      this.editando = false;
    },
    // Método para cancelar la edición
    cancelarEdicion() {
      // Restaura los datos originales
      this.formData.tipo = this.tipo;
      this.formData.cantidad = this.cant;
      this.formData.facultad = this.fac;
      this.formData.ubicacion = this.ubi;

      // Finaliza el modo de edición
      this.editando = false;
    },  
    
  }
};
</script>


<style scoped>
header {
    display: flex;
    height: 50px;
    background-color: rgb(237, 114, 48);
    justify-content: space-between;
    align-items: center;
    padding: 10px;
}

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
input {
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}
a {
    text-decoration: none;
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
    margin: 50px auto; /* Ajusté el margen para que no se vea tan pegado */
    padding: 20px;
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.8);
}

.boton {
    display: inline-block;
    width: 48%; /* Cambié el ancho para que se ajuste mejor */
    padding: 10px;
    margin-top: 10px;
    background-color: #333;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.boton:hover {
    background-color: #555;
}

.edicion-input {
    width: 100%;
    margin-bottom: 10px; /* Añadí un margen inferior */
    padding: 8px;
    box-sizing: border-box;
    border: 1px solid #ccc;
    border-radius: 5px;
}

footer {
    background-color: #333;
    color: white;
    text-align: center;
    padding: 1px;
    margin-top: auto;
}

.titulo {
    margin: 0;
}

.eliminar-button{
    background-color: #f00;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin: 20px 0;
    cursor: pointer;
}
.editar-button {
    background-color: #4CAF50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    margin: 20px 0;
    cursor: pointer;

}
.botones-container {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 10px;
    margin-bottom: 10px;
}
.edicion-input-container {
    display: flex;
    flex-direction: column;
    margin-top: 10px; /* Añade un espacio entre el bloque anterior y este */
}
.espacio1{
    margin-top: 5px;
    margin-bottom: 5px;
}
.btn-final,
.btn-inicio {
    padding: 5px 10px;
    margin: auto;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-final{
    display: flex;
    gap: 10px;
}

.articulo {
    max-width: 500px;
    margin: 0 auto;
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
}

.articulo h2 {
    font-size: 24px;
    margin: 0 0 20px;
}

.articulo p {
    margin: 0 0 10px;
}
</style>

