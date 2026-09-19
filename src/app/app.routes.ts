import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: ':id/:numero',
        component: AppComponent
    },
    {
        path: '',
        component: AppComponent
    }
];