import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Components
import { InstanceMainComponent } from './instance-main/instance-main.component';
import { InstanceCardComponent } from './instance-card/instance-card.component';
import { InstanceDialogComponent } from './instance-dialog/instance-dialog.component';

// Routing module
import { InstanceRoutingModule } from './instance-routing.module';

// Services
import { InstanceService } from './shared/instance.service';
import { MatDialog } from '@angular/material';

// Material module
import {
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatTooltipModule,
  MatButtonModule,
  MatIconModule,
  MatDialogModule,
  MatTabsModule,
  MatFormFieldModule,
  MatInputModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    InstanceRoutingModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  declarations: [
    InstanceMainComponent,
    InstanceCardComponent,
    InstanceDialogComponent
  ],
  exports: [
    InstanceMainComponent,
    InstanceDialogComponent
  ],
  providers: [
    InstanceService
  ],
  entryComponents: [
    InstanceDialogComponent
  ]
})
export class InstanceModule { }
