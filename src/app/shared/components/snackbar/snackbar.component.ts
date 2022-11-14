import {Component, Injectable, OnInit} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-snackbar',
    templateUrl: './snackbar.component.html',
    styleUrls: ['./snackbar.component.scss']
})
@Injectable({
    providedIn: 'root'
})
export class SnackbarComponent implements OnInit {

    constructor(private _snackBar: MatSnackBar) {
    }

    ngOnInit(): void {
    }

    openSnackBar(message): void {
        this._snackBar.open(message, 'close', {
            duration: 5000,
            panelClass: ['success-dialog', 'white'],
            horizontalPosition: 'end',
            verticalPosition: 'bottom',
        });
    }
}
