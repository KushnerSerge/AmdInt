import {Component, Input, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {Subject, takeUntil} from "rxjs";
import {ScheduleService} from "../../../shared/schedule/schedule.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-generic-list',
  styles: [],
  template: `
    <div *ngIf="!listCompany">
    <span #loading>
           </span>
      <span *ngIf="!loading.innerHTML.trim()">
        <img
          src="https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e4762fh6sr1b4z70csyd48mkljxhgr0nxz16glgr1ig&rid=giphy.gif"
        />
    </span>
    </div>

    <div *ngIf="listCompany?.length === 0">
      There are no records to display
    </div>
    <table *ngIf="listCompany && listCompany.length > 0" mat-table [dataSource]="listCompany"
           class="mat-elevation-z8 table-index">
      <ng-container matColumnDef="name">
        <th mat-header-cell *matHeaderCellDef>Name</th>
        <td mat-cell *matCellDef="let element">{{element.name}}</td>
      </ng-container>
      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef>Actions</th>
        <td mat-cell *matCellDef="let element">
          <a
            routerLink="{{element.id}}"
            mat-flat-button color="primary"
          >
            Employees
          </a>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="columnsToDisplay"></tr>
      <tr mat-row *matRowDef="let row; columns: columnsToDisplay"></tr>
    </table>

    <mat-paginator [pageSizeOptions]="[5, 10, 20, 50]" showFirstLastButtons
                   [length]="totalAmountOfRecords" [pageSize]="pageSize" (page)="updatePagination($event)"
                   class="mat-elevation-z8">
    </mat-paginator>
  `
})
export class GenericListComponent implements OnInit {

  private ngUnsubscribe = new Subject<void>();
  public listCompany: any;

  columnsToDisplay = ['name', 'actions'];
  totalAmountOfRecords = 23;
  currentPage = 1;
  pageSize = 5;

  constructor(private scheduleService: ScheduleService) {
  }

  ngOnInit(): void {
    this.loadCompanies();
  }

  loadCompanies() {
    this.scheduleService.getCompanies(this.currentPage, this.pageSize)
      .pipe(
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe(data => {
        this.listCompany = data.body.$values;
        this.totalAmountOfRecords = JSON.parse(data.headers.get('X-Pagination')).TotalCount;
      });
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadCompanies();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
