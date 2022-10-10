// assets
import { IconReport, IconBook, IconUsers, IconSchool, IconCalendar, IconMan, IconUser, IconDatabase, IconFileImport } from '@tabler/icons';

// constant
const icons = {
    IconReport,
    IconBook,
    IconUsers,
    IconSchool,
    IconCalendar,
    IconMan,
    IconUser,
    IconDatabase,
    IconFileImport
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const administracion = {
    id: 'administracion',
    title: 'Administración',
    caption: 'Del sistema',
    type: 'group',
    children: [
        {
            id: 'administrar',
            title: 'Catálogos',
            type: 'collapse',
            icon: icons.IconDatabase,
            children: [
                {
                    id: 'administrar2',
                    title: 'Profesores',
                    type: 'item',
                    url: '/administracion/catalogos/profesores',
                    icon: icons.IconMan,
                    breadcrumbs: false
                },
                {
                    id: 'administrar3',
                    title: 'Materias',
                    type: 'item',
                    url: '/administracion/catalogos/materias',
                    icon: icons.IconBook,
                    breadcrumbs: false
                },
                {
                    id: 'administrar4',
                    title: 'Grupos',
                    type: 'item',
                    url: '/administracion/catalogos/grupos',
                    icon: icons.IconUsers,
                    breadcrumbs: false
                },
                {
                    id: 'administrar5',
                    title: 'Periodo académico',
                    type: 'item',
                    url: '/administracion/catalogos/periodos',
                    icon: icons.IconCalendar,
                    breadcrumbs: false
                },
                {
                    id: 'administrar6',
                    title: 'Plan de estudio',
                    type: 'item',
                    url: '/administracion/catalogos/carreras',
                    icon: icons.IconSchool,
                    breadcrumbs: false
                },
                {
                    id: 'administrar7',
                    title: 'Prefectos',
                    type: 'item',
                    url: '/administracion/catalogos/prefectos',
                    icon: icons.IconMan,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default administracion;
