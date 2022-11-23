import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FuseConfigService } from '@fuse/services/config';
import { AppConfig, Scheme } from 'app/core/config/app.config';

@Component({
    selector: 'app-dark-mode-toggle',
    templateUrl: './dark-mode-toggle.component.html',
    styleUrls: ['./dark-mode-toggle.component.scss'],
})
export class DarkModeToggleComponent implements OnInit {
    darkMode = false;
    scheme: Scheme = 'dark';
    modeMessage: string;
    config: AppConfig;
    constructor(private _fuseConfigService: FuseConfigService) {}
    
    ngOnInit(): void {
        this._fuseConfigService.config$.subscribe((config: AppConfig) => {
            // Store the config
            this.config = config;
            console.log('CON222', this.config);
            if (this.config.scheme === 'light') {
                this.darkMode = false;
                this.modeMessage = 'Change to Night Mode';
            } else {
                this.darkMode = true;
                this.modeMessage = 'Change to Day Mode';
            }
        });
    }

    setScheme(): void {
        if (this.config.scheme === 'light') {
            this.scheme = 'dark';
            this.darkMode = true;
            this.modeMessage = 'Change to Day Mode';
        } else {
            this.darkMode = false;
            this.scheme = 'light';
            this.modeMessage = 'Change to Night Mode';
        }
        this._fuseConfigService.config = { scheme: this.scheme };
    }
}
