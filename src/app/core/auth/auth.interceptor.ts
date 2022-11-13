/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{
    constructor(private _authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const tokenizedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this._authService.authInfo ? this._authService.authInfo.accessToken : null}`
            }
        });

        if (req.url.includes('/sign-in')) {
            return next.handle(req);
        } else {
            return next.handle(tokenizedRequest);

        }


    }
}
