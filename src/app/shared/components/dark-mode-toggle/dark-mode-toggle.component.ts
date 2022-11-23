import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { Scheme } from 'app/core/config/app.config';

@Component({
    selector: 'app-dark-mode-toggle',
    templateUrl: './dark-mode-toggle.component.html',
    styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
    darkMode = false;
    scheme: Scheme = 'dark';
    modeMessage = 'Change to Night Mode'
    
    constructor(private _fuseConfigService: FuseConfigService) {}
    
    ngOnInit(): void {}
    
    setScheme(scheme: Scheme): void {
        if (scheme === 'light') {
            this.scheme = 'dark';
            this.modeMessage = 'Change to Night Mode'
        } else {
            this.modeMessage = 'Change to Day Mode'
            this.scheme = 'light';
        }
        this._fuseConfigService.config = { scheme };
    }
}
