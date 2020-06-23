import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { starComponent } from './star.component';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@NgModule({
  declarations: [starComponent],
  imports: [CommonModule],
  exports: [starComponent, CommonModule, FormsModule],
})
export class SharedModule {}
