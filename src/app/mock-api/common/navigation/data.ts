/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';
import { AuthService } from 'app/core/auth/auth.service';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        title: 'ผู้ดูแลระบบ',
        subtitle: 'เมนูหลักการใช้งานสำหรับผู้ดูแลระบบ',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                title: 'การตั้งค่าระบบ',
                type: 'collapsable',
                icon: 'heroicons_outline:cog',
                children: [
                    {
                        title: 'จัดการหน้าเว็บเพจ',
                        type: 'basic',
                        link: '/website/list',
                    },
                    {
                        title: 'คำถามพบบ่อย',
                        type: 'basic',
                        link: '/faq/list',
                    },
                    {
                        title: 'ข่าวสารและกิจกรรม',
                        type: 'basic',
                        link: '/announcement/list',
                    },
                ],
            },
            {
                title: 'ติวเตอร์ในระบบ',
                type: 'basic',
                icon: 'heroicons_outline:academic-cap',
                link: '/tutor/list',
            },
            {
                title: 'นักเรียนในระบบ',
                type: 'basic',
                icon: 'heroicons_outline:users',
                link: '/student/list',
            },
        ],
    },

    {
        title: 'ติวเตอร์',
        subtitle: 'เมนูหลักการใช้งานสำหรับติวเตอร์',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                title: 'ตั้งค่าข้อมูลส่วนตัว',
                type: 'collapsable',
                icon: 'heroicons_outline:user-circle',
                children: [
                    {
                        title: 'แนะนำตัวเอง',
                        type: 'basic',
                        link: '/tutor/profile/list',
                    },
                    {
                        title: 'ข้อมูลการติดต่อ',
                        type: 'basic',
                        link: '/tutor/contact/list',
                    },
                    {
                        title: 'วิชาที่คุณสอน',
                        type: 'basic',
                        link: '/tutor/subject/list',
                    },
                    {
                        title: 'คอร์สเรียน',
                        type: 'basic',
                        link: '/tutor/course/list',
                    },
                    {
                        title: 'ตั้งราคาค่าสอน',
                        type: 'basic',
                        link: '/tutor/price/list',
                    },
                    {
                        title: 'สถานที่สอน',
                        type: 'basic',
                        link: '/tutor/location/list',
                    },
                    {
                        title: 'วีดีโอแนะนำ',
                        type: 'basic',
                        link: '/tutor/video/list',
                    },
                    {
                        title: 'อัลบั้มรูปภาพ',
                        type: 'basic',
                        link: '/tutor/gallery/list',
                    },
                    {
                        title: 'รีวิวนักเรียน',
                        type: 'basic',
                        link: '/tutor/review/list',
                    },
                    {
                        title: 'การยืนยันโปรไฟล์',
                        type: 'basic',
                        link: '/tutor/verify/list',
                    },
                ],
            },
            {
                title: 'โปรโมทโปรไฟล์',
                type: 'collapsable',
                icon: 'heroicons_outline:pencil',
                children: [
                    {
                        title: 'คัดกรองนักเรียน',
                        type: 'basic',
                        link: '/tutor/filter/list',
                    },
                    {
                        title: 'สถิติ',
                        type: 'basic',
                        link: '/tutor/statistics/list',
                    },
                ],
            },
            {
                title: 'เติมเงิน',
                type: 'collapsable',
                icon: 'heroicons_outline:cash',
                children: [
                    {
                        title: 'เติมเงิน',
                        type: 'basic',
                        link: '/tutor/topup/list',
                    },
                    {
                        title: 'ประวัติการเติม',
                        type: 'basic',
                        link: '/tutor/deposit/list',
                    },
                    {
                        title: 'ประวัติการใช้จ่าย',
                        type: 'basic',
                        link: '/tutor/withdraw/list',
                    },
                ],
            },
        ],
    },

    {
        title: 'จัดการส่วนตัว',
        subtitle: 'เมนูหลักการใช้งานสำหรับจัดการส่วนตัว',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [
            {
                title: 'โปรไฟล์สมาขิก',
                type: 'basic',
                link: '/profile',
                icon: 'heroicons_outline:pencil-alt',
            },
            {
                title: 'ออกจากระบบ',
                type: 'basic',
                link: '/sign-out',
                icon: 'heroicons_outline:lock-closed',
            },
        ],
    },
];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        tooltip: 'Dashboards',
        type: 'aside',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        tooltip: 'Apps',
        type: 'aside',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        tooltip: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        tooltip: 'UI',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation',
        tooltip: 'Navigation',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group',
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboards',
        type: 'group',
        icon: 'heroicons_outline:home',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'Apps',
        type: 'group',
        icon: 'heroicons_outline:qrcode',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'heroicons_outline:document-duplicate',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'UI',
        type: 'group',
        icon: 'heroicons_outline:collection',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Misc',
        type: 'group',
        icon: 'heroicons_outline:menu',
        children: [], // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
