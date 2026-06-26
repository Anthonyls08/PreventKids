import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Tipoalertacomponent } from './components/tipoalertacomponent/tipoalertacomponent';
import { TipoAlertaListar } from './components/tipoalertacomponent/tipo-alerta-listar/tipo-alerta-listar';
import { TipoAlertaInsertar } from './components/tipoalertacomponent/tipo-alerta-insertar/tipo-alerta-insertar';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { ChatIAListar } from './components/chatiacomponent/chat-ia-listar/chat-ia-listar';
import { ChatIAInsertar } from './components/chatiacomponent/chat-ia-insertar/chat-ia-insertar';
import { TipoAlertaActualizar } from './components/tipoalertacomponent/tipo-alerta-actualizar/tipo-alerta-actualizar';
import { ChatIAActualizar } from './components/chatiacomponent/chat-ia-actualizar/chat-ia-actualizar';
import { Districtcomponent } from './components/districtcomponent/districtcomponent';
import { DistrictListar } from './components/districtcomponent/district-listar/district-listar';
import { DistrictInsertar } from './components/districtcomponent/district-insertar/district-insertar';

import { DitrictActualizar } from './components/districtcomponent/ditrict-actualizar/ditrict-actualizar';

import { Rolecomponent } from './components/rolecomponent/rolecomponent';
import { RoleListar } from './components/rolecomponent/role-listar/role-listar';
import { RoleInsertar } from './components/rolecomponent/role-insertar/role-insertar';
import { RoleActualizar } from './components/rolecomponent/role-actualizar/role-actualizar';
import { Tipocontenidocomponent } from './components/tipocontenidocomponent/tipocontenidocomponent';
import { TipocontenidoListar } from './components/tipocontenidocomponent/tipocontenido-listar/tipocontenido-listar';
import { TipocontenidoInsertar } from './components/tipocontenidocomponent/tipocontenido-insertar/tipocontenido-insertar';
import { TipocontenidoActualizar } from './components/tipocontenidocomponent/tipocontenido-actualizar/tipocontenido-actualizar';

import { Especialidadcomponent } from './components/especialidadcomponent/especialidadcomponent';
import { EspecialidadListar } from './components/especialidadcomponent/especialidad-listar/especialidad-listar';
import { EspecialidadInsertar } from './components/especialidadcomponent/especialidad-insertar/especialidad-insertar';
import { EspecialidadActualizar } from './components/especialidadcomponent/especialidad-actualizar/especialidad-actualizar';
import { Physicallimitationcomponent } from './components/physicallimitationcomponent/physicallimitationcomponent';
import { PhysicalLimitationListar } from './components/physicallimitationcomponent/physical-limitation-listar/physical-limitation-listar';
import { PhysicalLimitationInsertar } from './components/physicallimitationcomponent/physical-limitation-insertar/physical-limitation-insertar';
import { PhysicalLimitationActualizar } from './components/physicallimitationcomponent/physical-limitation-actualizar/physical-limitation-actualizar';

import { Landing } from './components/landing/landing';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { Shell } from './components/shell/shell';
import { authGuard } from './core/auth-guard';

import { Dietacomponent } from './components/dietacomponent/dietacomponent';
import { Ejercicioscomponent } from './components/ejercicioscomponent/ejercicioscomponent';
import { Videoscomponent } from './components/videoscomponent/videoscomponent';
import { Videollamadacomponent } from './components/videollamadacomponent/videollamadacomponent';

import { Consultavirtualcomponent } from './components/consultavirtualcomponent/consultavirtualcomponent';
import { ConsultaVirtualListar } from './components/consultavirtualcomponent/consultavirtual-listar/consultavirtual-listar';
import { ConsultaVirtualInsertar } from './components/consultavirtualcomponent/consultavirtual-insertar/consultavirtual-insertar';
import { ConsultaVirtualActualizar } from './components/consultavirtualcomponent/consultavirtual-actualizar/consultavirtual-actualizar';

export const routes: Routes = [
    {
        path: '',
        component: Landing
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'app',
        component: Shell,
        canActivate: [authGuard],
        children: [
    {
        path: '',
        redirectTo: 'homes',
        pathMatch: 'full'
    },
    {
        path: 'homes',
        component: Homecomponent
    },
    {
        path: 'dieta',
        component: Dietacomponent
    },
    {
        path: 'ejercicios',
        component: Ejercicioscomponent
    },
    {
        path: 'videos',
        component: Videoscomponent
    },
    {
        path: 'videollamada',
        component: Videollamadacomponent
    },
    {
        path: 'tipos-alerta',
        component: Tipoalertacomponent,
        children:[
            {
                path:'listar',
                component:TipoAlertaListar
            },
            {
                path:'nuevo',
                component:TipoAlertaInsertar
            },
            {
                path:'edits/:id',
                component:TipoAlertaActualizar
            }
        ]
    },
    {
        path: 'chatia',
        component: Chatiacomponent,
        children:[
            {
                path:'listar',
                component:ChatIAListar
            },
            {
                path:'nuevo',
                component:ChatIAInsertar
            },
            {
                path:'edits/:id',
                component:ChatIAActualizar
            }
        ]
    },
    {
        path: 'district',
        component: Districtcomponent,
        children:[
            {
                path:'listar',
                component: DistrictListar 
            },
            {
                path:'nuevo',
                component: DistrictInsertar
            },
            {
                path:'actualizar/:id',
                component: DitrictActualizar 
            }
        ]
    },
    {
        path: 'roles',
        component: Rolecomponent,
        children:[
            {
                path:'listar',
                component:RoleListar
            },
            {
                path:'nuevo',
                component:RoleInsertar
            },
            {
                path:'edits/:id',
                component:RoleActualizar
            }
        ]
    },
    {
    path: 'tipos-contenido',
    component: Tipocontenidocomponent,
    children:[
        {
            path:'listar',
            component: TipocontenidoListar
        },
        {
            path:'nuevo',
            component: TipocontenidoInsertar
        },
        {
            path:'edits/:id',
            component: TipocontenidoActualizar
        }
    ]
},
{
    path: 'specialties',
    component: Especialidadcomponent,
    children:[
        {
            path:'listar',
            component: EspecialidadListar
        },
        {
            path:'nuevo',
            component: EspecialidadInsertar
        },
        {
            path:'edits/:id',
            component: EspecialidadActualizar
        }
    ]
},
{
    path: 'limitacion-fisica',
    component: Physicallimitationcomponent,
    children:[
        {
            path:'listar',
            component: PhysicalLimitationListar
        },
        {
            path:'nuevo',
            component: PhysicalLimitationInsertar
        },
        {
            path:'edits/:id',
            component: PhysicalLimitationActualizar
        }
    ]
},
{
    path: 'consultas-virtuales',
    component: Consultavirtualcomponent,
    children:[
        {
            path:'listar',
            component: ConsultaVirtualListar
        },
        {
            path:'nuevo',
            component: ConsultaVirtualInsertar
        },
        {
            path:'edits/:id',
            component: ConsultaVirtualActualizar
        }
    ]
}
        ]
    }
];

