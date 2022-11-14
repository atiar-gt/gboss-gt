import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { Employee } from '../../models/employee.model';
import { EmployeesService } from '../../services/employees/employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  departments = ['Software Development', 'HR', 'Finance', 'Admin'];
  bloodGroups = ['B+', 'B-', 'A', 'A-', 'O+', 'O-', 'AB+', 'AB-'];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  // employeeData = [
  //   {
  //     "employeeCode": "111211",
  //     "email": "afratul.taohid1211111@gigatechltd.com",
  //     "name": "Afratul Touhid",
  //     "mobileNumber": "01673260344",
  //     "designation": "Mobile Application Developer",
  //     "payrollDesignation": "Assistant Manager",
  //     "bloodGroup": "B+",
  //     "officeName": "Gigatech - Main Office",
  //     "officeAddress": "Lotus Kamal Tower",
  //     "sittingLocation": "6th Floor - Left Side"
  //   },
  //   {
  //     "employeeCode": "111212",
  //     "email": "afratul.taohid1211111@gigatechltd.com",
  //     "name": "Navid Al Hassan",
  //     "mobileNumber": "01673260344",
  //     "designation": "Full Stack Developer",
  //     "payrollDesignation": "Assistant Manager",
  //     "bloodGroup": "A+",
  //     "officeName": "Gigatech - Main Office",
  //     "officeAddress": "Lotus Kamal Tower",
  //     "sittingLocation": "6th Floor - Left Side"
  //   },
  //   {
  //     "employeeCode": "111212",
  //     "email": "afratul.taohid1211111@gigatechltd.com",
  //     "name": "Shourav Aich",
  //     "mobileNumber": "01673260344",
  //     "designation": "Full Stack Developer",
  //     "payrollDesignation": "Assistant Manager",
  //     "bloodGroup": "B+",
  //     "officeName": "Gigatech - Main Office",
  //     "officeAddress": "Lotus Kamal Tower",
  //     "sittingLocation": "6th Floor - Left Side"
  //   },
  // ]
  employeeData: Employee[] = [];

  constructor(private _router: Router, private _employeeService: EmployeesService, private _snackbar: SnackbarComponent, private _confirmationService: FuseConfirmationService) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  onEmployee(): void {
    this._router.navigateByUrl('employees/add-new');
  }

  getEmployees(): void {
    // this._service.getAll().subscribe({
    //   next(res) {
    //     this.employeeData = res.data;
    //     console.log('res', this.employeeData)
    //   },
    //   error(err) {
    //     console.log(err);

    //   },
    // })
    this._employeeService.getAll().pipe(takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.employeeData = res.data;
    })
  }

  onEdit(employee: Employee) {
    this._router.navigateByUrl(`employees/edit/${employee.id}`);
  }

  applyFilter(value) {
    console.log('value', value);
    this._employeeService.filterByValue(value).pipe((debounceTime(500)), takeUntil(this._unsubscribeAll)).subscribe(res => {
      this.employeeData = res.data;
    })

  }

  onDelete(employee: Employee) {
    console.log('delete', employee);
    this._confirmationService.open().afterClosed().subscribe(result => {
      console.log('result', result);
      if (result === 'confirmed') {
        this.employeeData = this.employeeData.filter(
          (item: any) => item.id !== employee.id
        );

        this._employeeService.delete(employee.id).subscribe(res => {
          console.log('rest', res);
          this._snackbar.openSnackBar(res.message);
        });
      }
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }


}
