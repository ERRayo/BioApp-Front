// assets
import { IconReport, IconTrendingDown, IconBook, IconUsers, IconSchool, IconCalendar, IconMan, IconUser } from '@tabler/icons';

// constant
const icons = {
    IconReport,
    IconTrendingDown,
    IconBook,
    IconUsers,
    IconSchool,
    IconCalendar,
    IconMan,
    IconUser
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const reportes = {
    id: 'reportes',
    title: 'Reportes',
    caption: 'Institucionales',
    type: 'group',
    children: [
        {
            id: 'asistencia',
            title: 'Asistencia',
            type: 'collapse',
            icon: icons.IconReport,
            children: [
                {
                    id: 'asistencia1',
                    title: 'Profesores',
                    type: 'item',
                    url: '/administracion/reportes/asistencia/profesores',
                    icon: icons.IconBook,
                    breadcrumbs: false
                }
            ]
        }
    ]
};

export default reportes;
