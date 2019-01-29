import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Material modules
import { MatButtonModule } from '@angular/material';
import { MatCardModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatSnackBarModule } from '@angular/material';
import { MatTabsModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/';
import { MatChipsModule } from '@angular/material';

// Services
import { MatSnackBar, MatDialog } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule
  ],

  declarations: [
  ],

  exports: [
    CommonModule,
    FormsModule,
    HttpModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatChipsModule
  ],

})
export class MaterialModule {
  constructor() { }
}
