import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MealsService} from "./meals/meals.service";
import { ListItemComponent } from './components/list-item/list-item.component';



@NgModule({
  declarations: [
    ListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,

  ],
  exports: [
    ListItemComponent
  ],

})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule> {
    return {
      ngModule: SharedModule,
      providers: [
        MealsService
      ]
    };
  }
}
