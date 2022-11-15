import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject, tap } from 'rxjs';
import { Navigation } from 'app/core/navigation/navigation.types';
import { AuthService } from '../auth/auth.service';
import { cloneDeep } from 'lodash';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class NavigationService {
    private _navigation: ReplaySubject<Navigation> =
        new ReplaySubject<Navigation>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _authService: AuthService
    ) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for navigation
     */
    get navigation$(): Observable<Navigation> {
        return this._navigation.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all navigation data
     */
    // get(): Observable<Navigation> {
    //     const isClient: number = this._authService.authInfo.is_client;
    //     return this._httpClient.get<Navigation>('api/common/navigation').pipe(
    //         tap((navigation) => {
    //             this._navigation.next(navigation);
    //         })
    //     );
    // }
    get(): Observable<Navigation> {
        const userId: number = this._authService.authInfo.id;
        return this._httpClient
            .get<any>(`${environment.baseUrl}/employee/role/menu`)
            .pipe(
                tap((res) => {
                    
                    console.log('res success', res.success);
                    if (res.success) {
                        //defautlNavigation
                        const defaultData = cloneDeep(res.data);
                        const _defaultNavigation = defaultData.map((item) => {
                            item.id = item.id.toString();
                            return item;
                        });

                        _defaultNavigation.forEach((item) => {
                            if ('children' in item && item.children.length) {
                                item.children.forEach((ele) => {
                                    ele.id = item.id + '.' + ele.id;
                                    if (ele.type === 'item') {
                                        ele.type = 'basic';
                                    }
                                });
                            }
                        });

                        //compactNavigation
                        const compactData = cloneDeep(res.data);
                        const _compactNavigation: FuseNavigationItem[] =
                            compactData.map((item: FuseNavigationItem) => {
                                item.id.toString();
                                item.children = [];
                                return item;
                            });

                        //futuristicNavigation
                        const futuristicData = cloneDeep(res.data);
                        const _futuristicNavigation: FuseNavigationItem[] =
                            futuristicData.map((item: FuseNavigationItem) => {
                                item.id = item.id.toString();
                                item.children = [];
                                return item;
                            });

                        //horizontalNavigation
                        const horizontalData = cloneDeep(res.data);
                        const _horizontalNavigation: FuseNavigationItem[] =
                            horizontalData.map((item: FuseNavigationItem) => {
                                item.id = item.id.toString();
                                item.children = [];
                                return item;
                            });

                        // Fill compact navigation children using the default navigation
                        _compactNavigation.forEach((compactNavItem) => {
                            _defaultNavigation.forEach((defaultNavItem) => {
                                if (defaultNavItem.id === compactNavItem.id) {
                                    compactNavItem.children = cloneDeep(
                                        defaultNavItem.children
                                    );
                                }
                            });
                        });

                        // Fill futuristic navigation children using the default navigation
                        _futuristicNavigation.forEach((futuristicNavItem) => {
                            _defaultNavigation.forEach((defaultNavItem) => {
                                if (
                                    defaultNavItem.id === futuristicNavItem.id
                                ) {
                                    futuristicNavItem.children = cloneDeep(
                                        defaultNavItem.children
                                    );
                                }
                            });
                        });

                        // Fill horizontal navigation children using the default navigation
                        _horizontalNavigation.forEach((horizontalNavItem) => {
                            _defaultNavigation.forEach((defaultNavItem) => {
                                if (
                                    defaultNavItem.id === horizontalNavItem.id
                                ) {
                                    horizontalNavItem.children = cloneDeep(
                                        defaultNavItem.children
                                    );
                                }
                            });
                        });

                        const navData = {
                            compact: cloneDeep(_compactNavigation),
                            default: cloneDeep(_defaultNavigation),
                            futuristic: cloneDeep(_futuristicNavigation),
                            horizontal: cloneDeep(_horizontalNavigation),
                        };
                        this._navigation.next(navData);
                    }
                    else {
                        console.log(res);
                        
                    }
                })
            );
    }
}
