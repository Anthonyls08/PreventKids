import { Routes } from '@angular/router';
import { Homecomponent } from './components/homecomponent/homecomponent';
import { Tipoalertacomponent } from './components/tipoalertacomponent/tipoalertacomponent';
import { TipoAlertaListar } from './components/tipoalertacomponent/tipo-alerta-listar/tipo-alerta-listar';
import { TipoAlertaInsertar } from './components/tipoalertacomponent/tipo-alerta-insertar/tipo-alerta-insertar';
import { Chatiacomponent } from './components/chatiacomponent/chatiacomponent';
import { ChatIAListar } from './components/chatiacomponent/chat-ia-listar/chat-ia-listar';
import { ChatIAInsertar } from './components/chatiacomponent/chat-ia-insertar/chat-ia-insertar';
import { Districtcomponent } from './components/districtcomponent/districtcomponent';
import { DistrictListar } from './components/districtcomponent/district-listar/district-listar';
import { DistrictInsertar } from './components/districtcomponent/district-insertar/district-insertar';
import { Rolecomponent } from './components/rolecomponent/rolecomponent';
import { RoleListar } from './components/rolecomponent/role-listar/role-listar';
import { RoleInsertar } from './components/rolecomponent/role-insertar/role-insertar';

export const routes: Routes = [
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
            }
        ]
    },
    {
        path: 'district',
        component: Districtcomponent,
        children:[
            {
                path:'listar',
                component:DistrictListar
            },
            {
                path:'nuevo',
                component:DistrictInsertar
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
            }
        ]
    }
];
