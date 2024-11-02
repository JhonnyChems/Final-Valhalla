import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SolicitarCodeComponent } from './components/solicitar-code/solicitar-code.component';
import { RecuperarpassComponent } from './components/recuperarpass/recuperarpass.component';
import { AboutComponent } from './components/about/about.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ContactComponent } from './components/contact/contact.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ServiciosComponent } from './components/servicios/servicios.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ProductosComponent } from './components/productos/productos.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CarritoComponent } from './components/carrito/carrito.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent,
        title:"Home"
    },
    {
        path:"login",
        component:LoginComponent,
        title:"Login"
    },
    {
        path:"solicitarcode",
        component:SolicitarCodeComponent,
        title:"SolicitarCode"
    },
    {
        path:"recuperarpass",
        component:RecuperarpassComponent,
        title:"RecuperarPass"
    },
    {
        path:"about",
        component:AboutComponent,
        title:"About"
    },
    {
        path: "registro",
        component: RegistroComponent,
        title:"Registro"
    },
    {
        path: "contact",
        component: ContactComponent,
        title: "Contacto"
    },
    {
        path: "dashboard",
        component: DashboardComponent,
        title: "Dashboard"
    },
    {
        path: "inicio",
        component: InicioComponent,
        title: "Inicio"
    },
    {
        path: "carrito",
        component: CarritoComponent,
        title: "Carrito"
    },
    {
        path: "servicios",
        component: ServiciosComponent,
        title: "Servicios"
    },
    {
        path: "usuarios",
        component: UsuariosComponent,
        title: "Usuarios"
    },
    {
        path: "productos",
        component: ProductosComponent,
        title: "Productos"
    }
];
