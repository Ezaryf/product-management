import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { AlertService } from '../../services/alert.service';

@Component({ selector: 'app-detail', templateUrl: './detail.component.html' })
export class DetailComponent implements OnInit {
    id!: string;
    alerts: any[] = [];
    total = 0;

    constructor(
        private route: ActivatedRoute,
        private svc: AlertService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id')!;
        this.fetch(1);
    }

    fetch(page: number) {
        this.svc.fetchAlerts(this.id, page).subscribe(r => {
            this.alerts = r.data;
            this.total = r.total;
        });
    }
}
