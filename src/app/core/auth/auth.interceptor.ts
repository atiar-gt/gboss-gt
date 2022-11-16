/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthService } from 'app/core/auth/auth.service';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private _authService: AuthService, private _router: Router) {}

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const tokenizedRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${
                    this._authService.authInfo
                        ? this._authService.authInfo.accessToken
                        : null
                }`,
            },
        });

        // if (req.url.includes('/sign-in')) {
        //     return next.handle(req);
        // } else {
        //     return next.handle(tokenizedRequest);
        // }

        return next.handle(tokenizedRequest).pipe(
            tap((event: HttpEvent<any>) => {}),
            catchError((error: HttpErrorResponse) => {
                if (error.status === 403) {
                    localStorage.clear();
                    this._router.navigate(['/sign-in']).then((r) => r);
                    // this.snackbar.openSnackBar(
                    //     'You are inactive for last 30 minutes'
                    // );
                } else if (error.status === 401) {
                    this._router.navigate(['/sign-in']).then((r) => r);
                }

                return throwError(error);
            })
        );
    }
}
