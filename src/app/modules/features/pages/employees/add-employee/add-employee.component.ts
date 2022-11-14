import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeesService } from 'app/modules/features/services/employees/employees.service';
import { SnackbarComponent } from 'app/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss'],
})
export class AddEmployeeComponent implements OnInit {
  form: FormGroup;
  file_store: FileList;
  display: FormControl = new FormControl('', Validators.required);
  bloodGroups = ['B+', 'B-', 'A', 'A-', 'O+', 'O-', 'AB+', 'AB-'];

  constructor(private _fb: FormBuilder, private _router: Router, private _employeeService: EmployeesService, private _snackbar: SnackbarComponent) { }

  ngOnInit(): void {
    this.form = this._fb.group({
      employeeCode: [''],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      designation: ['', Validators.required],
      payrollDesignation: ['', Validators.required],
      bloodGroup: ['', Validators.required],
      officeName: ['', Validators.required],
      officeAddress: ['', Validators.required],
      sittingLocation: ['', Validators.required],
    });
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : '';
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue('');
    }
  }

  onSubmit(): void {
    console.log(this.form.valid);
    if (this.form.valid) {
      this._employeeService.create(this.form.value).subscribe(res => {
        console.log('res', res);
        this._snackbar.openSnackBar(res.message);
        if (res.success) {
          this._router.navigateByUrl('employees');
        }
  
      })
    }
  }
}
