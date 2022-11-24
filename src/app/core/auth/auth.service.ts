import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthUtils } from 'app/core/auth/auth.utils';
import { UserService } from 'app/core/user/user.service';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _authenticated: boolean = false;

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,
        private _router: Router
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for access token
     */
    set accessToken(token: string) {
        localStorage.setItem('accessToken', token);
    }

    get accessToken(): string {
        return localStorage.getItem('accessToken') ?? '';
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Forgot password
     *
     * @param email
     */
    forgotPassword(email: string): Observable<any> {
        return this._httpClient.post('api/auth/forgot-password', email);
    }

    /**
     * Reset password
     *
     * @param password
     */
    resetPassword(password: string): Observable<any> {
        return this._httpClient.post('api/auth/reset-password', password);
    }

    /**
     * Sign in
     *
     * @param credentials
     */
    // signIn(credentials: { email: string; password: string }): Observable<any>
    // {
    //     // Throw error, if the user is already logged in
    //     if ( this._authenticated )
    //     {
    //         return throwError('User is already logged in.');
    //     }

    //     return this._httpClient.post('api/auth/sign-in', credentials).pipe(
    //         switchMap((response: any) => {

    //             // Store the access token in the local storage
    //             this.accessToken = response.accessToken;

    //             // Set the authenticated flag to true
    //             this._authenticated = true;

    //             // Store the user on the user service
    //             this._userService.user = response.user;

    //             // Return a new observable with the response
    //             return of(response);
    //         })
    //     );
    // }
    signIn(resource): Observable<HttpResponse<any>> {
        return this._httpClient.post<any>(`${environment.baseUrl}/auth/login`, { ...resource }, { observe: 'response' });
    }


    /**
     * Sign in using the access token
     */
    signInUsingToken(): Observable<any> {
        // Sign in using the token
        return this._httpClient.post('api/auth/sign-in-with-token', {
            accessToken: this.accessToken
        }).pipe(
            catchError(() =>

                // Return false
                of(false)
            ),
            switchMap((response: any) => {

                // Replace the access token with the new one if it's available on
                // the response object.
                //
                // This is an added optional step for better security. Once you sign
                // in using the token, you should generate a new one on the server
                // side and attach it to the response object. Then the following
                // piece of code can replace the token with the refreshed one.
                if (response.accessToken) {
                    this.accessToken = response.accessToken;
                }

                // Set the authenticated flag to true
                this._authenticated = true;

                // Store the user on the user service
                this._userService.user = response.user;

                // Return true
                return of(true);
            })
        );
    }

    setAuthInfoInLocalStorage(accessToken, res?): void {
        let data = res.body.data;
        console.log('token', accessToken);
        console.log('data', data);

        localStorage.clear();
        localStorage.setItem('auth', JSON.stringify({
            accessToken,
            id: data.id,
            name: data.name,
            email: data.email,
            mobileNumber: data.mobileNumber,
            designation: data.designation,
            payrollDesignation: data.payrollDesignation,
            roles: data.roles,
            loggedIn: res.success,
            // loggedIn: true
        }));
        this._authenticated = true;
    }

    get authInfo(): any {
        return JSON.parse(localStorage.getItem('auth'));
    }

    get loggedInStatus(): boolean {
        return this.authInfo;
    }

    getMenu() {
        return this._httpClient.get(`${environment.baseUrl}/employee/menus`);
    }


    /**
     * Sign out
     */
    signOut(): Observable<any> {
        // Remove the access token from the local storage
        localStorage.clear();

        // Set the authenticated flag to false
        this._authenticated = false;

        this._router.navigate(['/sign-in']);

        // Return the observable
        return of(true);
    }

    /**
     * Sign up
     *
     * @param user
     */
    signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
        return this._httpClient.post('api/auth/sign-up', user);
    }

    /**
     * Unlock session
     *
     * @param credentials
     */
    unlockSession(credentials: { email: string; password: string }): Observable<any> {
        return this._httpClient.post('api/auth/unlock-session', credentials);
    }

    /**
     * Check the authentication status
     */
    check(): Observable<boolean> {
        // Check if the user is logged in
        if (this._authenticated) {
            return of(true);
        }

        // Check the access token availability
        if (!this.accessToken) {
            return of(false);
        }

        // Check the access token expire date
        if (AuthUtils.isTokenExpired(this.accessToken)) {
            return of(false);
        }

        // If the access token exists and it didn't expire, sign in using it
        return this.signInUsingToken();
    }
}
