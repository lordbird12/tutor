import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [
    // Redirect empty path to '/dashboards/project'
    { path: '', pathMatch: 'full', redirectTo: 'landing' },

    // Redirect signed in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    { path: 'signed-in-redirect', pathMatch: 'full', redirectTo: 'landing' },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'confirmation-required',
                loadChildren: () =>
                    import(
                        'app/modules/auth/confirmation-required/confirmation-required.module'
                    ).then((m) => m.AuthConfirmationRequiredModule),
            },
            {
                path: 'forgot-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/forgot-password/forgot-password.module'
                    ).then((m) => m.AuthForgotPasswordModule),
            },
            {
                path: 'reset-password',
                loadChildren: () =>
                    import(
                        'app/modules/auth/reset-password/reset-password.module'
                    ).then((m) => m.AuthResetPasswordModule),
            },
            {
                path: 'sign-in',
                loadChildren: () =>
                    import('app/modules/auth/sign-in/sign-in.module').then(
                        (m) => m.AuthSignInModule
                    ),
            },
            {
                path: 'sign-up',
                loadChildren: () =>
                    import('app/modules/auth/sign-up/sign-up.module').then(
                        (m) => m.AuthSignUpModule
                    ),
            },
        ],
    },
    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty',
        },
        children: [
            {
                path: 'sign-out',
                loadChildren: () =>
                    import('app/modules/auth/sign-out/sign-out.module').then(
                        (m) => m.AuthSignOutModule
                    ),
            },
            {
                path: 'unlock-session',
                loadChildren: () =>
                    import(
                        'app/modules/auth/unlock-session/unlock-session.module'
                    ).then((m) => m.AuthUnlockSessionModule),
            },
        ],
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: InitialDataResolver,
        },
        children: [
            {
                path: 'landing',
                loadChildren: () =>
                    import('./modules/landing/landing.module').then(
                        (m) => m.LandingModule
                    ),
            },
            {
                path: 'home',
                loadChildren: () =>
                    import('./modules/admin/pages/home/home.module').then(
                        (m) => m.HomeModule
                    ),
            },

            {
                path: 'website',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/website/page.module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'faq',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/faq/page.module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/tutor/page.module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'student',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/student/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'announcement',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/announcement/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'users',
                canActivate: [],
                children: [
                    {
                        path: '',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/administrator/user/user.module'
                            ).then((m) => m.UserModule),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'profile',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/profile/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'contact',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/contact/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'subject',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/subject/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'course',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/course/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'price',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/price/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'location',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/location/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'video',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/video/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'gallery',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/gallery/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'review',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/review/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'verify',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/verify/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'filter',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/filter/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'statistics',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/statistics/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'topup',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/topup/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'deposit',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/deposit/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },

            {
                path: 'tutor',
                canActivate: [],
                children: [
                    {
                        path: 'withdraw',
                        loadChildren: () =>
                            import(
                                'app/modules/admin/tutor/withdraw/page.Module'
                            ).then((m) => m.Module),
                    },
                ],
            },
            // 404 & Catch all
            {
                path: '404-not-found',
                pathMatch: 'full',
                loadChildren: () =>
                    import(
                        'app/modules/admin/pages/error/error-404/error-404.module'
                    ).then((m) => m.Error404Module),
            },
            { path: '**', redirectTo: '404-not-found' },
        ],
    },
];
