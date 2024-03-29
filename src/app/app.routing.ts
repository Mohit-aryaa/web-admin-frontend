/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Route } from '@angular/router';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';

// @formatter:off
// tslint:disable:max-line-length
export const appRoutes: Route[] = [

    // Redirect empty path to '/example'
    {path: '', pathMatch : 'full', redirectTo: 'dashboard'},

    // Redirect signed in user to the '/example'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboard'},

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.module').then(m => m.AuthSignUpModule)}
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.module').then(m => m.AuthSignOutModule)},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [
            {path: 'dashboard', loadChildren: () => import('app/modules/admin/dashboard/dashboard.module').then(m => m.DashboardModule)},
            {path: 'users-roles', loadChildren: () => import('app/modules/admin/user/user.module').then(m => m.UserModule)},
            {path: 'products', loadChildren: () => import('app/modules/admin/products/products.module').then(m => m.ProductsModule)},
            {path: 'add-product', loadChildren: () => import('app/modules/admin/add-product/add-product.module').then(m => m.AddProductModule)},
            {path: 'edit-product/:id', loadChildren: () => import('app/modules/admin/add-product/add-product.module').then(m => m.AddProductModule)},
            {path: 'categories', loadChildren: () => import('app/modules/admin/categories/categories.module').then(m => m.CategoriesModule)},
            {path: 'sub-child-Category', loadChildren: () => import('app/modules/admin/sub-child-category/sub-child-category.module').then(m => m.SubChildCategoryModule)},
            {path: 'brands', loadChildren: () => import('app/modules/admin/brand/brand.module').then(m => m.BrandModule)},
            {path: 'vendors', loadChildren: () => import('app/modules/admin/vendor/vendor.module').then(m => m.VendorModule)},
            {path: 'add-vendor', loadChildren: () => import('app/modules/admin/add-vendor/add-vendor.module').then(m => m.AddVendorModule)},
            {path: 'edit-vendor/:id', loadChildren: () => import('app/modules/admin/add-vendor/add-vendor.module').then(m => m.AddVendorModule)},
            {path: 'services', loadChildren: () => import('app/modules/admin/services/services.module').then(m => m.ServicesModule)},
            {path: 'sub-categories', loadChildren: () => import('app/modules/admin/sub-categories/sub-categories.module').then(m => m.SubCategoriesModule)},
            {path: 'stocklow', loadChildren: () => import('app/modules/admin/stocklow/stocklow.module').then(m => m.StocklowModule)},
            {path: 'stock-logs', loadChildren: () => import('app/modules/admin/stock-logs/stock-logs.module').then(m => m.StockLogsModule)},
            {path: 'bundle-products', loadChildren: () => import('app/modules/admin/bundle-products/bundle-products.module').then(m => m.BundleProductsModule)},
            {path: 'add-bundle-product', loadChildren: () => import('app/modules/admin/add-bundle-product/add-bundle-product.module').then(m => m.AddBundleProductModule)},
            {path: 'edit-bundle-product/:id', loadChildren: () => import('app/modules/admin/add-bundle-product/add-bundle-product.module').then(m => m.AddBundleProductModule)},
            {path: 'shipping', loadChildren: () => import('app/modules/admin/shipping/shipping.module').then(m => m.ShippingModule)},
            {path: 'questions', loadChildren: () => import('app/modules/admin/questions/questions.module').then(m => m.QuestionsModule)},
            {path: 'add-Service', loadChildren: () => import('app/modules/admin/add-services/add-services.module').then(m => m.AddServiceModule)},
            {path: 'add-Service', loadChildren: () => import('app/modules/admin/add-services/add-services.module').then(m => m.AddServiceModule)},
            {path: 'consultant', loadChildren: () => import('app/modules/admin/consultant/consultant.module').then(m => m.ConsultantModule)},
            {path: 'consultant', loadChildren: () => import('app/modules/admin/consultant/consultant.module').then(m => m.ConsultantModule)},
            {path: 'coupons', loadChildren: () => import('app/modules/admin/coupon/coupon.module').then(m => m.CouponModule)},
            {path: 'customers-groups', loadChildren: () => import('app/modules/admin/custmor-groups/Custmor-groups.module').then(m => m.CustmorGroupsModule)},
            {path: 'notifications', loadChildren: () => import('app/modules/admin/notifications/notifications.module').then(m => m.NotificationsModule)},
        ]
    }
];
