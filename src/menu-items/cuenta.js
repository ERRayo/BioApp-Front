// assets
import { IconSettings, IconLogout } from '@tabler/icons';

// constant
const icons = { IconSettings, IconLogout };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
    id: 'sample-docs-roadmap',
    title: 'Cuenta',
    type: 'group',
    children: [
        {
            id: 'cuenta1',
            title: 'Ajustes',
            type: 'item',
            url: '/cuenta/ajustes',
            icon: icons.IconSettings,
            breadcrumbs: false
        },
        {
            id: 'cuenta2',
            title: 'Cerrar sesion',
            type: 'item',
            url: '/pages/login/login3',
            icon: icons.IconLogout,
            breadcrumbs: false
        }
    ]
};

export default other;
