import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

  selectedProject: string = 'ACME Corp. Backend App';

  constructor() { }

  ngOnInit(): void {
  }

}