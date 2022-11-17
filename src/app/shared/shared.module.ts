import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsViewComponent } from './components/details-view/details-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { TitleCasePipe } from './pipes/title-case-pipe/title-case.pipe';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule],
    exports: [CommonModule, FormsModule, ReactiveFormsModule],
    declarations: [DetailsViewComponent, TitleCasePipe],
})
export class SharedModule {}
