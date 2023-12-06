import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/Inicio.vue'
import InicioSesion from '../views/InicioSesion.vue'
import Registro from '../views/Registro.vue'
import Inventario from '../views/Inventario.vue'
import Agregar from '../views/Agregar.vue'
import DetalleArticulo from '../views/DetalleArticulo.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // el path "/" define que es lo primero que se va a cargar al entrar a la pagina
      name: 'inicio', //Ergo la pagina "Home" es la que se cargara cuando se abra la pagina
      component: Inicio
    },
    {
      path: '/sesion',
      name: 'inicio_sesion',
      component: InicioSesion
    },
    {
      path: '/registro',
      name: 'registro',
      component: Registro
    },
    {
      path: '/inventario',
      name: 'inventario',
      component: Inventario,
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: Agregar
    },
    {
      path: '/detalle-articulo/:codigo', // Utiliza un parámetro dinámico para el código del artículo
      name: 'DetalleArticulo',
      component: DetalleArticulo
    }
  
  ]
})
export default router
