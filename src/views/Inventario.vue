<template>
<body>
    <header>
        <a href="https://www.uleam.edu.ec/" class="logo">
            <img src="../assets/logouleam.png" alt="Logo Uleam" class="imglogo">
        </a>
        <h3 class="titulo">Gestion de inventario Mobiliario</h3>           
    </header>
    
    <div class="titulo-inventario">
        <router-link to="/" class="btn-inicio">Cerrar Sesión</router-link>
        <h2>Inventario de la Uleam</h2>
        <div class="sesion-info">
        Sesión Iniciada como: {{ getNombreUsuario() }}
      </div>
      <input v-model="busqueda" type="text" placeholder="Buscar..." class="barra-busqueda"><br>
        <router-link to="/agregar" class="btn-agregar">Agregar Articulo</router-link>
    </div>

    <div class="tabla">
    <table class="inventario">
        <thead>
            <tr>
                <th>Nombre del Mobiliario</th>
                <th>Codigo</th>
                <th>Tipo</th>
                <th>Cantidad</th>
                <th>Facultad</th>
                <th>Ubicación</th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="articulo in articulosFiltrados" :key="articulo.codigo">
          <td>
            <router-link :to="{ name: 'DetalleArticulo', params: { codigo: articulo.codigo } }">
              {{ articulo.nombre }}
            </router-link>
          </td>
          <td>{{ articulo.codigo }}</td>
          <td>{{ articulo.tipo }}</td>
          <td>{{ articulo.cant }}</td>
          <td>{{ articulo.fac }}</td>
          <td>{{ articulo.ubi }}</td>
        </tr>
      </tbody>
        </table>
        </div>
    <footer>
        <p>© 2023 Miguel Angel Ortega Giler</p>
    </footer>

</body>
</template>

<script>
export default {
  name: "Inventario",
  data() {
    return {
      busqueda: "", // Variable para almacenar el valor de la barra de búsqueda
    };
  },
  methods: {
    getNombreUsuario() {
      const correoUsuario = localStorage.getItem("correoUsuario");

      if (correoUsuario) {
        const userData = JSON.parse(localStorage.getItem(correoUsuario));
        if (userData) {
          return userData.nombre;
        }
      }

      return "Invitado"; // Valor predeterminado si no se encuentra la información del usuario
    },
  },
  computed: {
    getArticulosInventario() {
      // Obtener los datos del inventario almacenados en localStorage
      const inventarioData = JSON.parse(localStorage.getItem("inventario")) || [];
      return inventarioData;
    },
    // Filtra los artículos según el valor de búsqueda
    articulosFiltrados() {
      const busquedaLower = this.busqueda.toLowerCase();
      return this.getArticulosInventario.filter((articulo) => {
        // Verifica si el nombre o el código contienen la búsqueda
        return (
          articulo.nombre.toLowerCase().includes(busquedaLower) ||
          articulo.codigo.toLowerCase().includes(busquedaLower)
        );
      });
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
.inventario {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

.inventario th, .inventario td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}

.inventario th {
    background-color: #f2f2f2;
}

/* Estilo para el título e input de búsqueda */
.titulo-inventario {
    margin-top: 20px;
    margin: 20px;
}

.titulo-inventario h2 {
    margin-bottom: 10px;
}

.barra-busqueda {
    padding: 5px;
    width: 200px;
    margin: 20px;
}
.tabla{
    margin: 20px;
}
.btn-agregar,
.btn-inicio {
    padding: 5px 10px;
    margin-left: 10px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-agregar:hover{
    background-color: #45a049;
}

</style>