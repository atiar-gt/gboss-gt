import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent implements OnInit {
  bloodGroups = ['B+', 'B-', 'A', 'A-', 'O+', 'O-', 'AB+', 'AB-']

  constructor() { }

  ngOnInit(): void {
  }

}
