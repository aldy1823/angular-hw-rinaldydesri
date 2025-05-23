import { TestBed } from '@angular/core/testing';

import { LocalService } from './local.service';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalService);

    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : ' ';
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };

    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('localService should have saveData function', () => {
    expect(service.saveData).toBeTruthy();
  });
  it('localService should have getData function', () => {
    expect(service.getData).toBeTruthy();
  });
  it('localService should have removeData function', () => {
    expect(service.removeData).toBeTruthy();
  });
  it('localService should have clearData function', () => {
    expect(service.clearData).toBeTruthy();
  });

  it('should store the location in localStorage',
    () => {
      service.saveData('storage', '{lon: 12.34, lat: 56.78}');
      expect(localStorage.getItem('storage')).toEqual('{lon: 12.34, lat: 56.78}');
    });

  it('should return stored location from localStorage',
    () => {
      localStorage.setItem('storage', '{lon: 12.34, lat: 56.78}');
      expect(service.getData('storage')).toEqual('{lon: 12.34, lat: 56.78}');
    });
});