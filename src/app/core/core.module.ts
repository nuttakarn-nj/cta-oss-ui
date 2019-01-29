import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { PageHeaderComponent } from './page-header/page-header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';

// Material Modules
import {
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatIconModule,
} from '@angular/material';

@NgModule({
  imports: [
    RouterModule,
    CommonModule,

    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
  ],

  declarations: [PageHeaderComponent, SidenavListComponent],

  providers: [],

  exports: [PageHeaderComponent, SidenavListComponent],
})

export class CoreModule { }
