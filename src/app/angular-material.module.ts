import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

const modules = [ 
  MatFormFieldModule, 
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule,
  MatToolbarModule
]

@NgModule({
  imports: [...modules],
  exports: modules
})

export class AngularMaterialModule { }