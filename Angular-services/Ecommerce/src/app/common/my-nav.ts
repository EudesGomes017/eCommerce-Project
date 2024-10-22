import { Router } from "@angular/router";

export class MyNav {

  constructor(private router: Router) {}

  isOnProductPage(): boolean {
    return this.router.url.includes('/products') ||
           this.router.url.includes('/category') ||
           this.router.url.includes('/search');
  }
}
