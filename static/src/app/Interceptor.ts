import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');
    const update: any = {};

    if (token) {
      update.setHeaders = { Authorization: 'Bearer ' + token };
    }

    const authReq = req.clone(update);

    return next.handle(authReq).pipe(
      tap((err) => {

        if (err.type === 0) {
          // this.router.navigate(['/login']);
        }

        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) this.router.navigate(['/login']);
        }
      })
    );
  }
}
