import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import {
    FuseNavigationService,
    FuseVerticalNavigationComponent,
} from '@fuse/components/navigation';
import { Navigation } from 'app/core/navigation/navigation.types';
import { NavigationService } from 'app/core/navigation/navigation.service';
import { AuthService } from 'app/core/auth/auth.service';
import { Scheme } from 'app/core/config/app.config';
import { FuseConfigService } from '@fuse/services/config';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';
import { DataService } from 'app/shared/services/data/data.service';

@Component({
    selector: 'classic-layout',
    templateUrl: './classic.component.html',
    styleUrls: ['./classic.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
    message: string;
    isNav = false;
    selectedRole;
    redirectUrl: string;
    form: FormGroup;
    userInfo;
    roles;
    isScreenSmall: boolean;
    navigation: Navigation;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _fb: FormBuilder,
        private _navigationService: NavigationService,
        private _authService: AuthService,
        private _employeeService: EmployeesService,
        private _dataService: DataService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService
    ) {
        // this._dataService.currentMessage.subscribe(
        //     (message) => (this.message = message)
        // );
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for current year
     */
    get currentYear(): number {
        return new Date().getFullYear();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        console.log('classic');

        this.getRoles();
        this.form = this._fb.group({
            roleId: [''],
        });

        this.getNavigations();
        // this._dataService.currentMessage.subscribe(
        //     (message) => (this.message = message)
        // );
    }

    getRoles(): void {
        this._employeeService.getRoles().subscribe((res) => {
            this.roles = res.data;
            this.getUserInfo();
        });
    }

    getNavigations(): void {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                console.log('nav', navigation);

                if (navigation.default.length > 0) {
                    this.redirectUrl = navigation.default[0].route;
                    this.navigation = navigation;
                } else {
                    console.log('navigations doenst exist', this.roles);
                }
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    onLogo(): void {
        this._router.navigate(['/dashboard']);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void {
        this.isNav = !this.isNav;
        // Get the navigation
        const navigation =
            this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(
                name
            );

        if (navigation) {
            // Toggle the opened status
            navigation.toggle();
        }
    }

    getUserInfo(): void {
        this.userInfo = this._authService.authInfo;
        console.log('userInfo', this.userInfo);

        if (this.roles) {
            this.roles.forEach((item) => {
                if (item.selected === true) {
                    this.form.get('roleId').setValue(item.id);
                    this.selectedRole = item;
                    localStorage.setItem('roleId', item.id);
                }
            });
        }
    }

    onNav(role): void {
        if (this.selectedRole !== role) {
            this.selectedRole = role;
            this._navigationService
                .switchNavigation(this.form.value)
                .subscribe((res) => {
                    if (res.success) {
                        this._navigationService.getNavs().subscribe((res) => {
                            // let newRoles this.roles.
                            this._router.navigateByUrl(this.redirectUrl);
                        });
                        // this.ngOnInit();
                        // this.getUserInfo();
                        // this._router.navigateByUrl('/');
                        // this._router.navigate(['/requisition']).then(()=> {
                        //     window.location.reload()
                        // });
                        // this.reloadComponent();
                    }
                });
        }
    }

    signOut() {
        let scheme: Scheme = 'light';
        this._fuseConfigService.config = { scheme };
        this._authService.signOut();
    }
}
