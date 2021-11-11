/* tslint:disable:max-line-length */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },
    {
        id: 'users',
        title: 'Users',
        type: 'basic',
        icon: 'heroicons_outline:user-add',
        link: '/users-roles',
    },
    {
        id: 'allProducts',
        title: 'Products',
        type: 'collapsable',
        icon: 'heroicons_outline:color-swatch',
        children: [
            {
                id: 'products',
                title: 'Products',
                type: 'basic',
                icon: '',
                link: '/products',
            },
            {
                id: 'bundledProducts',
                title: 'Bundled Products',
                type: 'basic',
                icon: '',
                link: '/bundle-products',
            },
            {
                id: 'stockLow',
                title: 'Out of stock',
                type: 'basic',
                icon: '',
                link: '/stocklow',
            },
            {
                id: 'stockLogs',
                title: 'Stock Logs',
                type: 'basic',
                icon: '',
                link: '/stock-logs',
            },
            {
                id: 'questions',
                title: 'Questions',
                type: 'basic',
                icon: '',
                link: '/questions',
            },
            {
                id: 'shipping',
                title: 'Shipping Charges',
                type: 'basic',
                icon: '',
                link: '/shipping',
            },
        ]
    },
    {
        id: 'services',
        title: 'Services',
        type: 'basic',
        icon: 'heroicons_outline:document',
        link: '/services'
    },
    {
        id: 'sale',
        title: 'sale',
        type: 'collapsable',
        icon: 'heroicons_outline:color-swatch',
        children: [
            {
                id: '',
                title: 'Authorized Orders',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: '',
                title: 'Cancelled Orders',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: '',
                title: 'Create Orders',
                type: 'basic',
                icon: '',
                link: '',
            },
        ]
    },
    {
        id: 'abandoncart',
        title: 'Abandpn Cart',
        type: 'basic',
        icon: 'heroicons_outline:document',
        link: ''
    },
    {
        id: 'categories',
        title: 'Categories',
        type: 'collapsable',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'category',
                title: 'Category',
                type: 'basic',
                icon: '',
                link: '/categories',
            },
            {
                id: 'subCategories',
                title: 'Sub-Categories',
                type: 'basic',
                icon: '',
                link: '/sub-categories'
            },
            {
                id: 'childCategory',
                title: 'Child Categorys',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'brands',
                title: 'Brands',
                type: 'basic',
                icon: '',
                link: '/brands'
            },
        ]
    },
    {
        id: 'enquires',
        title: 'Enquires',
        type: 'collapsable',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'simpleEnquires',
                title: 'Simple Enquirs',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'bulkEnquires',
                title: 'Bulk Enquires',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'consultants',
        title: 'Consultant',
        type: 'collapsable',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'consultantList',
                title: 'Consultant List',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'payToConsultants',
                title: 'Pay To Consultants',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'consultantCategory',
                title: 'Consultant Category',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'serviceCategories',
                title: 'Service Categories',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'cities',
                title: 'Cities',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'notifications',
        title: 'Notifications',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'customersGroups',
        title: 'Customer Groups',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'consultations',
        title: 'Consultations',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'prescriptions',
        title: 'prescriptions',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'coupons',
        title: 'Coupons',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'ticket',
        title: 'Ticket ',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'reports',
        title: 'Reports',
        type: 'collapsable',
        icon: 'heroicons_outline:document',
        children: [
            {
                id: 'sales',
                title: 'Sales',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'products',
                title: 'Products',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'coupons',
                title: 'Coupons',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'cashbacks',
                title: 'CashBacks',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'affilates',
                title: 'Affilates',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'vendorsReports',
                title: 'Vendors',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'productCompare',
                title: 'Product Compare',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'productStock',
                title: 'Product Stock',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'productWishes',
                title: 'Product Wishes',
                type: 'basic',
                icon: '',
                link: ''
            }
        ]
    },
    {
        id: 'vendors',
        title: 'Vendors',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'vendorsList',
                title: 'vendorsList',
                type: 'basic',
                icon: '',
                link: '/vendors',
            },
            {
                id: 'payToVendor',
                title: 'Pay To Vendor',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'packagePayments',
                title: 'Package Payments',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'vendorPackages',
                title: 'Vendor Packages',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'vendorSliders',
                title: 'Vendors sliders',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'usersData',
        title: 'Users Data',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'customers',
                title: 'customers',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'walletLoads',
                title: 'wallet Loads',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'reviews',
                title: 'Reviews',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'reviewQuestions',
                title: 'reviewQuestions',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'referals',
                title: 'Referals',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'search',
                title: 'Search',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'contact',
        title: 'Contact Messages',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'newsLetters',
                title: 'Newsletters',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'contactMessages',
                title: 'Conatct Messages',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'blog',
        title: 'Blogs',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'allBlogs',
                title: 'All Blogs',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'categories',
                title: 'Categories',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'comments',
                title: 'Comments',
                type: 'basic',
                icon: '',
                link: ''
            }
        ]
    },
    {
        id: 'sideBanner',
        title: 'Side Banner',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'firstBanner',
                title: 'First Banner',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'secondBanner',
                title: 'Second Banner',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'affilates',
        title: 'Affilates',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: '',
    },
    {
        id: 'settings',
        title: 'Settings',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'sliders',
                title: 'Silders',
                type: 'collapsable',
                icon: '',
                children: [
                    {
                        id: 'websiteSlider',
                        title: 'Website Silder',
                        type: 'collapsable',
                        icon: '',
                        link: '',
                    },
                    {
                        id: 'mobileSilder',
                        title: 'Mobile Slider',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                ]
            },
            {
                id: 'displaySettings',
                title: 'Display Settings',
                type: 'collapsable',
                icon: '',
                children: [
                    {
                        id: 'contactPage',
                        title: 'Contact Page',
                        type: 'collapsable',
                        icon: '',
                        link: '',
                    },
                    {
                        id: 'footer',
                        title: 'Footer',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'logo',
                        title: 'Logo',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'favicon',
                        title: 'Favicon',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'fonts',
                        title: 'Fonts',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'preloader',
                        title: 'PreLoader',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                ]
            },
            {
                id: 'siteSettings',
                title: 'Site Settings',
                type: 'collapsable',
                icon: '',
                children: [
                    {
                        id: 'generalSettings',
                        title: 'general Settings',
                        type: 'collapsable',
                        icon: '',
                        link: '',
                    },
                    {
                        id: 'emailTemplates',
                        title: 'Email Templates',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'thirdPartySettings',
                        title: 'Third Party Settings',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'buildPages',
                        title: 'Build Pages',
                        type: 'collapsable',
                        icon: '',
                        link: '',
                    },
                    {
                        id: 'setDefaultImages',
                        title: 'Set Default Images',
                        type: 'basic',
                        icon: '',
                        link: ''
                    },
                    {
                        id: 'importExport',
                        title: 'Import Export',
                        type: 'basic',
                        icon: '',
                        link: ''
                    }
                ]
            },
        ]
    },
    {
        id: 'business',
        title: 'Business',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'activation',
                title: 'Activation',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'paymentMethod',
                title: 'Payment Method',
                type: 'basic',
                icon: '',
                link: ''
            },
            {
                id: 'currency',
                title: 'Currency',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'faqs',
                title: 'Faqs',
                type: 'basic',
                icon: '',
                link: ''
            },
        ]
    },
    {
        id: 'staffs',
        title: 'Staffs',
        type: 'collapsable',
        icon: 'heroicons_outline:identification',
        children: [
            {
                id: 'allStaffs',
                title: 'All Staffs',
                type: 'basic',
                icon: '',
                link: '',
            },
            {
                id: 'staffPermissions',
                title: 'Staff Permissions',
                type: 'basic',
                icon: '',
                link: ''
            }
        ]
    },
    {
        id: 'gallery',
        title: 'Gallery',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'seo',
        title: 'SEO',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },
    {
        id: 'language',
        title: 'Language',
        type: 'basic',
        icon: 'heroicons_outline:identification',
        link: ''
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },

];
export const futuristicNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },

];
export const horizontalNavigation: FuseNavigationItem[] = [
    {
        id: 'example',
        title: 'Example',
        type: 'basic',
        icon: 'heroicons_outline:chart-pie',
        link: '/example'
    },


];
