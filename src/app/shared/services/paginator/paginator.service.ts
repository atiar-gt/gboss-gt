import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Sort } from '@angular/material/sort';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaginatorService {

  _onTableDataChange: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  tableChangeEvent: BehaviorSubject<any> = new BehaviorSubject<any>(
    {
      // currentPage: 1,
      page: 1,
      // dataCount: 3,
      // order_by: 'desc',
      // order_by_field: 'created_at',
    }
  );

  private _page: any;
  private _sort: any;

  constructor(http: HttpClient) {
    // super(http, '');
  }

  setTableData(totalCount): void {
    console.log('total count', totalCount);
    
    this._onTableDataChange.next(totalCount);
  }


  onPageChange($event: PageEvent): void {
    console.log('event', $event);

    this._page = { pageNumber: $event.pageIndex, pageSize: $event.pageSize };
    const PageEventChange = {
      page: $event.pageIndex + 1
      // order_by: this._sort ? this._sort.order_by : 'asc',
      // order_by_field: this._sort ? this._sort.order_by_field : '',
    };
    this.tableChangeEvent.next(PageEventChange);
  }

  onSortChange($event: Sort): void {
    this._sort = { order_by: $event.direction, order_by_field: $event.active };
    const PageEventChange = {
      per_page: this._page ? this._page.pageSize : 5,
      page: this._page ? this._page.pageNumber : 0,
      order_by: $event.direction,
      order_by_field: $event.active,
    };
    this.tableChangeEvent.next(PageEventChange);
  }
}
