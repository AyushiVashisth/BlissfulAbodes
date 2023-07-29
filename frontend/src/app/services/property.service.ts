import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  private baseUrl = 'http://localhost:5000/properties';
  sortBy: string = 'price';
  sortOrder: number = 1;

  constructor(private http: HttpClient) {}

  getAllProperties(
    page: number,
    perPage: number,
    nameFilter: string,
    propertyNameFilter: string,
    stateFilter: string,
    sortOrder: number,
    sortField: string,
    propertyAvailabilityFilter: boolean 
  ): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('per_page', perPage.toString())
      .set('sort_by', sortField || this.sortBy)
      .set('sort_order', sortOrder?.toString() || this.sortOrder.toString());

    if (nameFilter) {
      params = params.set('name', nameFilter);
    }

    if (propertyNameFilter) {
      params = params.set('property_name', propertyNameFilter);
    }

    if (stateFilter) {
      params = params.set('state', stateFilter);
    }

    if (propertyAvailabilityFilter !== null) {
      // Convert the boolean value to a string before setting the parameter
      params = params.set(
        'availability',
        propertyAvailabilityFilter.toString()
      );
    }

    return this.http.get<any>(this.baseUrl, { params });
  }
}
