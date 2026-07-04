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
import { Authenticate } from './components/authenticate/authenticate';
import { Register } from './components/registercomponent/register';
import { Shell } from './components/shell/shell';
import { seguridadGuard } from './guard/seguridad-guard';

import { Dietacomponent } from './components/dietacomponent/dietacomponent';
import { Asistentecomponent } from './components/asistentecomponent/asistentecomponent';
import { Hijocomponent } from './components/hijocomponent/hijocomponent';
import { HijoListar } from './components/hijocomponent/hijo-listar/hijo-listar';
import { HijoInsertar } from './components/hijocomponent/hijo-insertar/hijo-insertar';
import { HijoActualizar } from './components/hijocomponent/hijo-actualizar/hijo-actualizar';
import { Ejercicioscomponent } from './components/ejercicioscomponent/ejercicioscomponent';
import { Videoscomponent } from './components/videoscomponent/videoscomponent';
import { Videollamadacomponent } from './components/videollamadacomponent/videollamadacomponent';

import { Consultavirtualcomponent } from './components/consultavirtualcomponent/consultavirtualcomponent';
import { ConsultaVirtualListar } from './components/consultavirtualcomponent/consultavirtual-listar/consultavirtual-listar';
import { ConsultaVirtualInsertar } from './components/consultavirtualcomponent/consultavirtual-insertar/consultavirtual-insertar';
import { ConsultaVirtualActualizar } from './components/consultavirtualcomponent/consultavirtual-actualizar/consultavirtual-actualizar';

import { Educationalcontentcomponent } from './components/educationalcontentcomponent/educationalcontentcomponent';
import { EducationalContentListar } from './components/educationalcontentcomponent/educational-content-listar/educational-content-listar';
import { EducationalContentInsertar } from './components/educationalcontentcomponent/educational-content-insertar/educational-content-insertar';
import { EducationalContentActualizar } from './components/educationalcontentcomponent/educational-content-actualizar/educational-content-actualizar';

import { Recommendedexercisecomponent } from './components/recommendedexercisecomponent/recommendedexercisecomponent';
import { RecommendedExerciseListar } from './components/recommendedexercisecomponent/recommended-exercise-listar/recommended-exercise-listar';
import { RecommendedExerciseInsertar } from './components/recommendedexercisecomponent/recommended-exercise-insertar/recommended-exercise-insertar';
import { RecommendedExerciseActualizar } from './components/recommendedexercisecomponent/recommended-exercise-actualizar/recommended-exercise-actualizar';

import { Alertcomponent } from './components/alertcomponent/alertcomponent';
import { AlertListar } from './components/alertcomponent/alert-listar/alert-listar';
import { AlertInsertar } from './components/alertcomponent/alert-insertar/alert-insertar';
import { AlertActualizar } from './components/alertcomponent/alert-actualizar/alert-actualizar';
import { AlertReporteEstado } from './components/alertcomponent/alert-reporte-estado/alert-reporte-estado';
import { AlertFiltrarCriticas } from './components/alertcomponent/alert-filtrar-criticas/alert-filtrar-criticas';

import { Professionalprofilecomponent } from './components/professionalprofilecomponent/professionalprofilecomponent';
import { ProfessionalProfileListar } from './components/professionalprofilecomponent/professional-profile-listar/professional-profile-listar';
import { ProfessionalProfileInsertar } from './components/professionalprofilecomponent/professional-profile-insertar/professional-profile-insertar';
import { ProfessionalProfileActualizar } from './components/professionalprofilecomponent/professional-profile-actualizar/professional-profile-actualizar';

import { Medicioncomponent } from './components/medicioncomponent/medicioncomponent';
import { MedicionListar } from './components/medicioncomponent/medicion-listar/medicion-listar';
import { MedicionInsertar } from './components/medicioncomponent/medicion-insertar/medicion-insertar';
import { MedicionActualizar } from './components/medicioncomponent/medicion-actualizar/medicion-actualizar';

import { DistrictZonasRiesgo } from './components/districtcomponent/district-zonas-riesgo/district-zonas-riesgo';
import { DistrictPrioridadUbigeo } from './components/districtcomponent/district-prioridad-ubigeo/district-prioridad-ubigeo';
import { DistrictFiltrarDepartamento } from './components/districtcomponent/district-filtrar-departamento/district-filtrar-departamento';

import { MedicionPrioridadImc } from './components/medicioncomponent/medicion-prioridad-imc/medicion-prioridad-imc';
import { MedicionSignosVitales } from './components/medicioncomponent/medicion-signos-vitales/medicion-signos-vitales';
import { MedicionRiesgoNutricional } from './components/medicioncomponent/medicion-riesgo-nutricional/medicion-riesgo-nutricional';
import { MedicionFiltrarUsuario } from './components/medicioncomponent/medicion-filtrar-usuario/medicion-filtrar-usuario';
import { Usercomponent } from './components/usercomponent/usercomponent';
import { UserListar } from './components/usercomponent/user-listar/user-listar';
import { UserInsertar } from './components/usercomponent/user-insertar/user-insertar';
import { UserActualizar } from './components/usercomponent/user-actualizar/user-actualizar';

import { Reportusuariosrol } from './components/reportusuariosrol/reportusuariosrol';
import { Reportusuariosdistrito } from './components/reportusuariosdistrito/reportusuariosdistrito';
import { Reportperfilesespecialidad } from './components/reportperfilesespecialidad/reportperfilesespecialidad';
import { Reportalertasnivelriesgo } from './components/reportalertasnivelriesgo/reportalertasnivelriesgo';
import { Reportconsultasestado } from './components/reportconsultasestado/reportconsultasestado';
import { Reporteshub } from './components/reporteshub/reporteshub';

import { RecommendedExerciseConteoDificultad } from './components/recommendedexercisecomponent/recommended-exercise-conteo-dificultad/recommended-exercise-conteo-dificultad';
import { RecommendedExerciseFiltrarDuracion } from './components/recommendedexercisecomponent/recommended-exercise-filtrar-duracion/recommended-exercise-filtrar-duracion';
import { PhysicalLimitationConteoCategoria } from './components/physicallimitationcomponent/physical-limitation-conteo-categoria/physical-limitation-conteo-categoria';
import { PhysicalLimitationFiltrarIntensidad } from './components/physicallimitationcomponent/physical-limitation-filtrar-intensidad/physical-limitation-filtrar-intensidad';
import { EducationalContentConteoTipo } from './components/educationalcontentcomponent/educational-content-conteo-tipo/educational-content-conteo-tipo';
import { EducationalContentFiltrarTipo } from './components/educationalcontentcomponent/educational-content-filtrar-tipo/educational-content-filtrar-tipo';
export const routes: Routes = [
    {
        path: '',
        component: Landing
    },
    {
        path: 'login',
        component: Authenticate
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'app',
        component: Shell,
        canActivate: [seguridadGuard],
        canActivateChild: [seguridadGuard],
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
        path: 'asistente',
        component: Asistentecomponent
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
            },
            {
                path:'reporte-zonas-riesgo',
                component: DistrictZonasRiesgo
            },
            {
                path:'reporte-prioridad-ubigeo',
                component: DistrictPrioridadUbigeo
            },
            {
                path:'reporte-filtrar-departamento',
                component: DistrictFiltrarDepartamento
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
    path: 'alertas',
    component: Alertcomponent,
    children: [
        {
            path: 'listar',
            component: AlertListar
        },
        {
            path: 'nuevo',
            component: AlertInsertar
        },
        {
            path: 'edits/:id',
            component: AlertActualizar
        },
        {
            path: 'reporte-conteo-estado',
            component: AlertReporteEstado
        },
        {
            path: 'reporte-filtrar-criticas',
            component: AlertFiltrarCriticas
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
        },
        {
            path:'reporte-conteo-categoria',
            component: PhysicalLimitationConteoCategoria
        },
        {
            path:'reporte-filtrar-intensidad',
            component: PhysicalLimitationFiltrarIntensidad
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
},
{
    path: 'contenido-educativo',
    component: Educationalcontentcomponent,
    children:[
        {
            path:'listar',
            component: EducationalContentListar
        },
        {
            path:'nuevo',
            component: EducationalContentInsertar
        },
        {
            path:'edits/:id',
            component: EducationalContentActualizar
        },
        {
            path:'reporte-conteo-tipo',
            component: EducationalContentConteoTipo
        },
        {
            path:'reporte-filtrar-tipo',
            component: EducationalContentFiltrarTipo
        }
    ]
},
{
    path: 'ejercicio-recomendado',
    component: Recommendedexercisecomponent,
    children:[
        {
            path:'listar',
            component: RecommendedExerciseListar
        },
        {
            path:'nuevo',
            component: RecommendedExerciseInsertar
        },
        {
            path:'edits/:id',
            component: RecommendedExerciseActualizar
        },
        {
            path:'reporte-conteo-dificultad',
            component: RecommendedExerciseConteoDificultad
        },
        {
            path:'reporte-filtrar-duracion',
            component: RecommendedExerciseFiltrarDuracion
        }
    ]
},
{
    path: 'perfil-profesional',
    component: Professionalprofilecomponent,
    children:[
        {
            path:'listar',
            component: ProfessionalProfileListar
        },
        {
            path:'nuevo',
            component: ProfessionalProfileInsertar
        },
        {
            path:'edits/:id',
            component: ProfessionalProfileActualizar
        }
    ]
},
{
    path: 'hijos',
    component: Hijocomponent,
    children:[
        {
            path:'listar',
            component: HijoListar
        },
        {
            path:'nuevo',
            component: HijoInsertar
        },
        {
            path:'edits/:id',
            component: HijoActualizar
        }
    ]
},
{
    path: 'mediciones',
    component: Medicioncomponent,
    children:[
        {
            path:'listar',
            component: MedicionListar
        },
        {
            path:'nuevo',
            component: MedicionInsertar
        },
        {
            path:'edits/:id',
            component: MedicionActualizar
        },
        {
            path:'reporte-prioridad-imc',
            component: MedicionPrioridadImc
        },
        {
            path:'reporte-signos-vitales',
            component: MedicionSignosVitales
        },
        {
            path:'reporte-riesgo-nutricional',
            component: MedicionRiesgoNutricional
        },
        {
            path:'reporte-filtrar-usuario',
            component: MedicionFiltrarUsuario
        }
    ]
},
{
    path: 'users',
    component: Usercomponent,
    children:[
        {
            path:'listar',
            component: UserListar
        },
        {
            path:'nuevo',
            component: UserInsertar
        },
        {
            path:'edits/:id',
            component: UserActualizar
        }
    ]
},
{
    path: 'reportes',
    component: Reporteshub
},
{
    path: 'reportes/usuarios-por-rol',
    component: Reportusuariosrol
},
{
    path: 'reportes/usuarios-por-distrito',
    component: Reportusuariosdistrito
},
{
    path: 'reportes/perfiles-por-especialidad',
    component: Reportperfilesespecialidad
},
{
    path: 'reportes/alertas-por-nivelriesgo',
    component: Reportalertasnivelriesgo
},
{
    path: 'reportes/consultas-por-estado',
    component: Reportconsultasestado
}
        ]
    }
];

