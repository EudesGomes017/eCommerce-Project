import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const router = inject(Router)
  const token = sessionStorage.getItem('token') // ou localStorage.getItem('token') se preferir

  if (token) {
    return true // O usuário está autenticado
  } else {
    // Redireciona para a página de login se não estiver autenticado
    router.navigate(['/login'])
  }

  return false; // O usuário não está autenticado
};
