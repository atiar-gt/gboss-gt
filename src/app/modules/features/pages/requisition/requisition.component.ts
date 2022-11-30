import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { config } from 'rxjs';
import { Requisition } from '../../models/requisition.model';
import { RequisitionService } from '../../services/requisition/requisition.service';
import { RequisitionDetailsComponent } from './requisition-details/requisition-details.component';

@Component({
    selector: 'app-requisition',
    templateUrl: './requisition.component.html',
    styleUrls: ['./requisition.component.scss'],
})
export class RequisitionComponent implements OnInit {
    requisitionData = [
        {
            id: 81,
            employeeCode: '0076',
            email: 'afratul.taohid@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            name: 'MD Afratul Kaoser Taohid',
            mobileNumber: '01673260344',
            designation: 'Mobile Application Developer',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            requisitionProduct: 'Keyboard',
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '16-11-2022',
            status: 'Accepted',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Mouse',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Pending',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Monitor',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Accepted',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Mouse',
            name: 'Navid Al Hassan',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '26-08-2022',
            status: 'Rejected',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Tissue Box',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Rejected',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Mouse',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '04-10-2022',
            status: 'Pending',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Mouse',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Accepted',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Pen',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Pending',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Mouse',
            name: 'Sourav Aich',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Rejected',
        },
        {
            id: 83,
            employeeCode: '0070',
            email: 'hr@gigatechltd.com',
            emailPersonal: null,
            gender: null,
            requisitionProduct: 'Locker',
            name: 'Gigatech HR User',
            mobileNumber: '01673260344',
            designation: 'HR',
            payrollDesignation: 'Assistant Manager',
            supervisorId: null,
            bloodGroup: 'A+',
            dob: null,
            extension: null,
            officeName: 'Gigatech - Main Office',
            officeAddress: 'Lotus Kamal Tower',
            sittingLocation: '6th Floor - Left Side',
            date: '08-11-2022',
            status: 'Pending',
        },
    ];
    requisitions: Requisition[];
    btnName = 'Request Type';
    types = ['Accepted', 'Rejected', 'Pending'];
    pagination: { currentPage: 1; pageCount: 2; dataCount: 12 };
    // success: true,

    constructor(
        public _dialog: MatDialog,
        private _requisitionService: RequisitionService,
        private _confirmationService: FuseConfirmationService
    ) {}

    ngOnInit(): void {
        this.getRequisitions();
    }

    getRequisitions(): void {
        this._requisitionService.getAll().subscribe((res) => {
            if (res.success) {
                this.requisitions = res.data;
                console.log('requisitionData', this.requisitionData);
            }
        });
    }

    onView(requisition: Requisition): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = { requisitionData: requisition };
        dialogConfig.width = '700px';
        dialogConfig.autoFocus = false;
        // dialogConfig.height = '400px';

        const dialogRef = this._dialog.open(
            RequisitionDetailsComponent,
            dialogConfig
        );

        dialogRef.afterClosed().subscribe((data) => {
            if (data) {
                console.log('data to save', data);
                console.log('req', requisition.id);
                this._requisitionService
                    .requisitionSubmit(data, requisition.id)
                    .subscribe((res) => {
                        if (res.success) {
                            this.getRequisitions();
                        }
                    });
            }
        });
    }

    onAccept(data): void {
        let config = {
            title: 'Do you want to Accept?',
            icon: {
                color: 'success' as const,
            },
            actions: {
                confirm: {
                    color: 'primary' as const,
                },
            },
        };

        this._confirmationService
            .open(config)
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    console.log('confirmed');

                    // this.permissionData =
                    //     this.permissionData.filter(
                    //         (item: any) => item.id !== role.id
                    //     );

                    // this._menuPermissionService.delete(role.id).subscribe((res) => {
                    //     this._snackbar.openSnackBar(res.message);
                    // });
                }
            });
    }

    onReject(data): void {
        let config = {
            title: 'Do you want to Reject?',
        };

        this._confirmationService
            .open(config)
            .afterClosed()
            .subscribe((result) => {
                if (result === 'confirmed') {
                    console.log('confirmed');

                    // this.permissionData =
                    //     this.permissionData.filter(
                    //         (item: any) => item.id !== role.id
                    //     );

                    // this._menuPermissionService.delete(role.id).subscribe((res) => {
                    //     this._snackbar.openSnackBar(res.message);
                    // });
                }
            });
    }

    onFilter(name: string): void {
        this.btnName = name;
    }

    tabChanged = (tabChangeEvent: MatTabChangeEvent): void => {
        console.log('tabChangeEvent => ', tabChangeEvent); 
        console.log('index => ', tabChangeEvent.index); 
    }
    
}
