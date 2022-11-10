/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    // {
    //     id   : 'example',
    //     title: 'Employees',
    //     type : 'basic',
    //     icon : 'heroicons_outline:users',
    //     link : '/users'
    // }

    {
        id: 'dashboards',
        title: 'Menu',
        // subtitle: 'Unique dashboard designs',
        type: 'group',
        icon: 'heroicons_outline:users',
        children: [
            // {
            //     id: 'dashboards.project',
            //     title: 'Employees',
            //     type: 'basic',
            //     icon: 'heroicons_outline:users',
            //     link: '/dashboards/project'
            // },
            {
                id      : 'apps.ecommerce',
                title   : 'Employees',
                type    : 'collapsable',
                icon    : 'heroicons_outline:users',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Add Employee',
                        type : 'basic',
                        link : '/add-employee'
                    },
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Employee Management',
                        type : 'basic',
                        link : '/employee'
                    }
                ]
            },
            {
                id      : 'apps.ecommerce',
                title   : 'Role Management',
                type    : 'collapsable',
                icon    : 'heroicons_outline:sun',
                children: [
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Roles',
                        type : 'basic',
                        link : '/roles'
                    },
                    {
                        id   : 'apps.ecommerce.inventory',
                        title: 'Add Role',
                        type : 'basic',
                        link : '/add-role'
                    }
                ]
            },
        ]
    }
];



export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    }
];
