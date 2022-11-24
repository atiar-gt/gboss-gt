import { Component, OnInit } from '@angular/core';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { config } from 'rxjs';

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

    types = ['Accepted', 'Rejected', 'Pending']
    pagination: { currentPage: 1; pageCount: 2; dataCount: 12 };
    // success: true,

    constructor(private _confirmationService: FuseConfirmationService) {}

    ngOnInit(): void {}

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
}
