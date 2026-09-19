import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { idsvalidos } from './ids';

export const idValido: CanActivateFn = (route) => {
    const router = inject(Router);
    const id = route.paramMap.get('id');

    if (id && idsvalidos.includes(id)) {
        return true;
    }

    router.navigate(['/404']);
    return false;
};