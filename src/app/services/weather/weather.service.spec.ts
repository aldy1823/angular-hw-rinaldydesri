import { TestBed } from '@angular/core/testing';
import { WeatherService } from './weather.service';
import { HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../environments/environments';
import { testData } from '../../../testing/test-data';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WeatherService]
    });
    service = TestBed.inject(WeatherService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('weatherService should have getWeather function', () => {
    expect(service.getWeatherInfo).toBeTruthy();
  });

  it('getWeatherInfo should use GET to retrieve data', () => {
    service.getWeatherInfo('44.34', '10.99').subscribe();

    const testRequest = httpMock.expectOne('https://api.openweathermap.org/data/2.5/weather?lat=44.34&lon=10.99&appid=2d5ed2f42a6650224e2a6f20047d7b76');

    expect(testRequest.request.method).toEqual('GET');
  });

  it('should return weather data for the given coordinates', () => {
    const lat = '12.34';
    const lng = '56.78';

    service.getWeatherInfo(lat, lng).subscribe((data) => {
      expect(data).toEqual(testData);
    });

    const req = httpMock.expectOne(`${environment.url}?lat=${lat}&lon=${lng}&appid=${environment.api_key}`);
    expect(req.request.method).toBe('GET');
    req.flush(testData);
  });
})