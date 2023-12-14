import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReverseApiService {
  private apiUrl = 'https://nominatim.openstreetmap.org/reverse.php?zoom=18&format=jsonv2';

  constructor(private http: HttpClient) {}

  postData(data: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}&lon=${data[0]}&lat=${data[1]}`);
  }
}
