import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpService {

  /**
   * params types for getting data
   */
  private params = {
    launch_success: '',
    land_success: '',
    launch_year: ''
  };
  
  constructor(private http: HttpClient) { }

  /**
   * method to get data of spacexinfo
   * @returns Observable<any>
   */
  public getResponse(): Observable<any> {
    this.filteredParams();
    const configUrl = 'https://api.spacexdata.com/v3/launches?limit=100';
    return this.http.get(configUrl, {params: this.params});
  }

  /**
   * method to filter and append params for fetching data
   * @param action type of param selected
   * @param value value of selected param
   * @returns void
   */
  public filters(action: string, value: string): void {
    switch(action) {
      case 'launch':
        this.params.launch_success = value;
        break;
      case 'land':
        this.params.land_success = value;
        break;
      case 'year':
        this.params.launch_year = value;
        break;
      default:
        this.params.launch_year = value;
        break;
    }
  }

  /**
   * method to only append params which have values in them
   * @returns void
   */
  private filteredParams(): void {
    for (const value in this.params) {
      this.params[value] === '' ? delete this.params[value] : '';
    }
  }
}
