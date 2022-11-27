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

@Component({
    selector: 'classic-layout',
    templateUrl: './classic.component.html',
    styleUrls: ['./classic.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ClassicLayoutComponent implements OnInit, OnDestroy {
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
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService,
        private _fuseConfigService: FuseConfigService
    ) {}

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
        this.form = this._fb.group({
            roleId: [''],
        });
        this.getUserInfo();

        this.getNavigations();
        // this.selectedValue = 1
        // this.form.get('roleId').setValue(1);
        // Subscribe to navigation data
        // this._navigationService.navigation$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((navigation: Navigation) => {
        //         this.navigation = navigation;
        //     });

        // // Subscribe to media changes
        // this._fuseMediaWatcherService.onMediaChange$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(({ matchingAliases }) => {
        //         // Check if the screen is small
        //         this.isScreenSmall = !matchingAliases.includes('md');
        //     });
    }

    getNavigations(): void {
        this._navigationService.navigation$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((navigation: Navigation) => {
                console.log('navigations', navigation.default[0].route);
                this.redirectUrl = navigation.default[0].route;

                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ matchingAliases }) => {
                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
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
        this.roles = this.userInfo.roles;
        this.roles.forEach((item) => {
            if (item.selected === true) {
                this.form.get('roleId').setValue(item.id);
                this.selectedRole = item;
            }
        });
        // console.log('user rules', this.roles);
        // console.log('selectedRole1', this.selectedRole);
    }

    onNav(role): void {
        // console.log('ID', id);
        if (this.selectedRole !== role) {
            this.selectedRole = role;
            // console.log('selectedRole2', this.selectedRole);
            // console.log('redirectUrl', this.redirectUrl);
            this._navigationService.switchNavigation(this.form.value).subscribe(res=> {
                console.log('new role', role);
                if (res.success) {
                    console.log('SUCCESS', res);
                    
                    this._navigationService.getNavs().subscribe(res=> {
                        console.log('RES', res);
                        // let newRoles this.roles.
                        this._router.navigateByUrl(this.redirectUrl)
                        
                    });
                    // this.ngOnInit();
                    // this.getUserInfo();
                    // this._router.navigateByUrl('/');
                    // this._router.navigate(['/requisition']).then(()=> {
                    //     window.location.reload()
                    // });
                    // this.reloadComponent();
                }
                
            })
        }
        else {
            console.log('same value');
            
        }
        
        // console.log('nav form value', this.form.value);
        // if (this.selectedRole.id !== this.form.value.roleId) {
        //     console.log('SWITCH');
        // }
        // else {
        //     console.log('Role doesnt change');
        // }

        // this.getNavigations();
        // this._navigationService.get();
    }


    signOut() {
        let scheme: Scheme = 'light';
        this._fuseConfigService.config = { scheme };
        this._authService.signOut();
    }
}
