import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { PaginatorService } from 'app/shared/services/paginator/paginator.service';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

    totalCount;
    constructor( private paginatorService: PaginatorService) { }

    ngOnInit(): void {
        this.paginatorService._onTableDataChange.subscribe( (res) => {
            if (res) {
                res
                this.totalCount = res;
            }
            return;
        });
    }
    onPageChange($event: PageEvent): void {        
        this.paginatorService.onPageChange($event);
    }

}
