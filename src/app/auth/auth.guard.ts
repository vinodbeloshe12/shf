import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise(resolve => {
      this.loginService.getUserDetails().subscribe((res: any) => {
        if (res && res.value) {
          // resolve(true);
          if (res && res.data && res.data.accesslevel == "1") {
            resolve(true)
          } else {
            if (location.pathname != "/order" && location.pathname != "/users" && location.pathname != "/category" && location.pathname != "/add-blog" && location.pathname != "/slider") {
              resolve(true);
            } else {
              this.router.navigate(['/popup']);
              resolve(false);
            }
          }
        } else {
          this.router.navigate(['/popup']);
          resolve(false);
        }
      }, error => {
        this.router.navigate(['/popup']);
        resolve(false);
      });
    });
  }
}
