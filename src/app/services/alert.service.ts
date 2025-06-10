import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AlertModel } from '../models/alert.model';
import { formatDate } from '../shared/utils/date.util';

interface AlertResponse { data: AlertModel[]; total: number; }

@Injectable({ providedIn: 'root' })
export class AlertService {
    private base = `${environment.apiBase}/data/alert/list`;

    constructor(private http: HttpClient) { }

    fetchAlerts(
        id: string,
        page = 1,
        pageSize = 5,
        startDate?: Date,
        endDate?: Date
    ): Observable<AlertResponse> {
        const today = endDate ?? new Date();
        const yesterday = startDate ?? new Date(today.getTime() - 86400000);

        let params = new HttpParams()
            .set('page', String(page))
            .set('pageSize', String(pageSize))
            .set('startDate', formatDate(yesterday))
            .set('endDate', formatDate(today));

        return this.http.get<AlertResponse>(`${this.base}/${id}`, { params });
    }
}
