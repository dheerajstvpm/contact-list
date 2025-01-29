import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'contacts',
        pathMatch: 'full',
    },
    {
        path: 'contacts',
        loadComponent: () =>
            import('./components/contacts-list/contacts-list.component').then((c) => c.ContactsListComponent),
    },
    {
        path: 'details',
        loadComponent: () =>
            import('./components/contact-details/contact-details.component').then((c) => c.ContactDetailsComponent),
    },
];
