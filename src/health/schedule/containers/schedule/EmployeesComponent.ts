import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {ScheduleService} from "../../../shared/schedule/schedule.service";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'employees',
  styleUrls: ['./schedule.component.scss'],
  template: `
    <div class="content">
      <div fxLayout="row wrap" fxLayoutGap="16px grid">
        <div [fxFlex]="(100/gridColumns) + '%'" fxFlex.xs="100%" fxFlex.sm="33%" *ngFor="let employee of employees">
          <mat-card class="mat-elevation-z20">
            <mat-card-header>
              <mat-card-title style="color: #8022b0">{{employee.Name}}</mat-card-title>
            </mat-card-header>
            <img mat-card-image src="https://robohash.org/{{employee.Name}}">
            <mat-card-content>
              <h3 style="color: #8022b0">{{employee.Position}}</h3>
              <p style="color: #8022b0">
                Age: {{employee.Age}}
              </p>
            </mat-card-content>
          </mat-card>
        </div>
      </div>
      <br>
      <a style="margin-left: 7px"
         routerLink=""
         mat-flat-button color="primary"
      >Back To Companies
      </a>
    </div>
    <br>
    <mat-paginator style="margin-left: 7px" [pageSizeOptions]="[3, 6, 9, 18]" showFirstLastButtons
                   [length]="totalAmountOfRecords" [pageSize]="pageSize" (page)="updatePagination($event)"
                   class="mat-elevation-z8">
    </mat-paginator>
    <br>
  `
})
export class EmployeesComponent implements OnInit {
  private ngUnsubscribe = new Subject<void>();
  public employees: any;
  totalAmountOfRecords;
  currentPage = 1;
  pageSize = 3;
  gridColumns = 3;

  constructor(private scheduleService: ScheduleService, private router: Router, private route: ActivatedRoute) {
  }

  updatePagination(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.loadEmployees();
  }

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.route.params.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(params => {
      if (params['id']) {
        console.log(params['id']);
        this.scheduleService.getEmployeeForCompany(params['id'], this.currentPage, this.pageSize)
          .pipe(
            takeUntil(this.ngUnsubscribe)
          )
          .subscribe(data => {
            this.totalAmountOfRecords = JSON.parse(data.headers.get('X-Pagination')).TotalCount;
            this.employees = data.body.$values;
          });
      }
    })
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
