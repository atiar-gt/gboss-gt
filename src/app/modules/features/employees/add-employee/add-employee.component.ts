import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  file_store: FileList;
  display: FormControl = new FormControl("", Validators.required);
  bloodGroups = ['B+', 'B-', 'A', 'A-', 'O+', 'O-', 'AB+', 'AB-']

  constructor() { }

  ngOnInit(): void {
  }

  handleFileInputChange(l: FileList): void {
    this.file_store = l;
    if (l.length) {
      const f = l[0];
      const count = l.length > 1 ? `(+${l.length - 1} files)` : "";
      this.display.patchValue(`${f.name}${count}`);
    } else {
      this.display.patchValue("");
    }
  }


}
