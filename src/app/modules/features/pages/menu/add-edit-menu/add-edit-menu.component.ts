import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from 'app/modules/features/models/menu.model';
import { MenuService } from 'app/modules/features/services/menu/menu.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-add-edit-menu',
    templateUrl: './add-edit-menu.component.html',
    styleUrls: ['./add-edit-menu.component.scss'],
})
export class AddEditMenuComponent implements OnInit {
    userId: string;
    isChild = false;
    form: FormGroup;
    menus: Menu[];
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    types = [
        { type: 1, name: 'Group' },
        { type: 0, name: 'Item' },
    ];

    constructor(
        private _fb: FormBuilder,
        private _route: ActivatedRoute,
        private _router: Router,
        private _menuService: MenuService,
        private _snackbar: SnackbarComponent
    ) {}

    ngOnInit(): void {
        this.getMenus();
        this.userId = this._route.snapshot.paramMap.get('id');
        if (this.userId) {
            this.setFormData();
        }
        this.form = this._fb.group({
            name: ['', Validators.required],
            code: ['', Validators.required],
            type: ['', Validators.required],
            parentId: [],
            route: ['', Validators.required],
            icon: [''],
        });
    }

    public checkError = (controlName: string, errorName: string) => {
        return this.form.controls[controlName].hasError(errorName);
    };

    onSubmit(): void {
        if (this.form.valid) {
            if (this.userId) {
                this.updateEmployee();
            } else {
                this.addEmployee();
            }
        }
    }

    getMenus() {
        this._menuService.getParentMenus().subscribe((res) => {
            this.menus = res.data;
        });
    }

    navigate(): void {
        this._router.navigateByUrl('menu-management');
    }

    addEmployee(): void {
        this._menuService.create(this.form.value).subscribe((res) => {
            this._snackbar.openSnackBar(res.message);
            if (res.success) {
                this.navigate();
            }
        });
    }

    updateEmployee(): void {
        this._menuService
            .update(this.form.value, +this.userId)
            .subscribe((res) => {
                this._snackbar.openSnackBar(res.message);
                if (res.success) {
                    this.navigate();
                }
            });
    }

    onMenuType(event) {
        if (event.type === 0) {
            this.isChild = true;
            this.form.get('parentId').setValidators(Validators.required);
            this.form.get('parentId').updateValueAndValidity();
        } else {
            this.isChild = false;
            this.form.get('parentId').clearAsyncValidators();
            this.form.get('parentId').updateValueAndValidity();
        }
    }

    validateParentMenu() {}

    setFormData(): void {
        this._menuService
            .getById(+this.userId)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res) => {
                if (res.data.type === 1) {
                    this.isChild = false;
                    this.form.get('parentId').clearAsyncValidators();
                    this.form.get('parentId').updateValueAndValidity();
                } else {
                    this.isChild = true;
                    this.form.get('parentId').setValue(res.data.id);
                    this.form
                        .get('parentId')
                        .setValidators(Validators.required);
                    this.form.get('parentId').updateValueAndValidity();
                }

                this.form.patchValue(res.data);
            });
    }

    ngOnDestroy(): void {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }
}
