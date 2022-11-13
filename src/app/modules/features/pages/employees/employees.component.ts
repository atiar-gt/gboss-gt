import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  departments = ['Software Development', 'HR', 'Finance', 'Admin'];
  bloodGroups = ['B+', 'B-', 'A', 'A-', 'O+', 'O-', 'AB+', 'AB-']
  employeeData = [
    {
      "employeeCode": "111211",
      "email": "afratul.taohid1211111@gigatechltd.com",
      "name": "Afratul Touhid",
      "mobileNumber": "01673260344",
      "designation": "Mobile Application Developer",
      "payrollDesignation": "Assistant Manager",
      "bloodGroup": "B+",
      "officeName": "Gigatech - Main Office",
      "officeAddress": "Lotus Kamal Tower",
      "sittingLocation": "6th Floor - Left Side"
    },
    {
      "employeeCode": "111212",
      "email": "afratul.taohid1211111@gigatechltd.com",
      "name": "Navid Al Hassan",
      "mobileNumber": "01673260344",
      "designation": "Full Stack Developer",
      "payrollDesignation": "Assistant Manager",
      "bloodGroup": "A+",
      "officeName": "Gigatech - Main Office",
      "officeAddress": "Lotus Kamal Tower",
      "sittingLocation": "6th Floor - Left Side"
    },
    {
      "employeeCode": "111212",
      "email": "afratul.taohid1211111@gigatechltd.com",
      "name": "Shourav Aich",
      "mobileNumber": "01673260344",
      "designation": "Full Stack Developer",
      "payrollDesignation": "Assistant Manager",
      "bloodGroup": "B+",
      "officeName": "Gigatech - Main Office",
      "officeAddress": "Lotus Kamal Tower",
      "sittingLocation": "6th Floor - Left Side"
    },
  ]

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }

  onEmployee(): void {
    this._router.navigateByUrl('employees/add-new');
  }

}
