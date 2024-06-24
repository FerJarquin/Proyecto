import { Routes } from '@angular/router';
import {ClientesComponent} from './pages/clientes/clientes.component'
import {ServiciosComponent} from './pages/servicios/servicios.component'
import {EmpleadosComponent} from './pages/empleados/empleados.component'
import {SolicitudesComponent} from './pages/solicitudes/solicitudes.component'
import {ProgramacionesComponent} from './pages/programaciones/programaciones.component'


export const routes: Routes = [
    {
        path: 'clientes',
        component: ClientesComponent, 
    },
    {
        path: 'servicios',
        component: ServiciosComponent, 
    },
    {
        path: 'empleados',
        component: EmpleadosComponent, 
    },
    {
        path: 'solicitudes',
        component: SolicitudesComponent, 
    }, 
    {
        path: 'programaciones',
        component: ProgramacionesComponent, 
    }
];
