import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-alert-banner',
    templateUrl: './alert-banner.component.html'
})
export class AlertBannerComponent {
    @Input() message: string = '';
}