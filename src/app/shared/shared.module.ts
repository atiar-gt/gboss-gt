import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DarkModeToggleComponent } from './components/dark-mode-toggle/dark-mode-toggle.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule, DarkModeToggleComponent],
    declarations: [
    DarkModeToggleComponent
  ],
})
export class SharedModule {}
