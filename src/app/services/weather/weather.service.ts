import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WeatherData } from '../../models/weather-api-response.model';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeatherInfo(lat: string, lng: string): Observable<WeatherData> {
    return this.http.get<WeatherData>(`${environment.url}?lat=${lat}&lon=${lng}&appid=${environment.api_key}`);
  }
}