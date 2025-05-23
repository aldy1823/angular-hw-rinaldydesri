import { trigger, state, style, transition, animate, sequence } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import cities from 'cities.json';
import { City } from '../../models/city.model';
import { LocalService } from '../../services/local/local.service';
import { WeatherService } from '../../services/weather/weather.service';
@Component({
  selector: 'app-home',
  standalone: true,
   imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateY(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateY(100%)' }))
      ])
    ]),
    trigger('flyOutIn', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(200)
      ]),
      transition('* => void', [
        animate(200, style({ transform: 'translateY(100%)' }))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  weatherForm!: FormGroup;
  weatherInfo: any = {};
  searchResults: City[] = [];
  bounce:boolean = false;

  favouriteLocations: any = [];

  citiesArray: any = cities;

  formSubmitted = false;
state: any;

  constructor(private fb: FormBuilder, private router: Router, private weatherService: WeatherService, private localService: LocalService) {
    this.weatherForm = this.fb.group({
      city: ['', [Validators.required, Validators.minLength(2)]],
    })
  }

  ngOnInit(): void {
    if (this.weatherForm) {
      this.weatherForm.valueChanges.subscribe((value) => {
        if (value.city.length === 0) {
          this.searchResults = [];
          this.formSubmitted = false;
        }
      }
      );
    }
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    if (existingFavourites) {
      existingFavourites.forEach((city: any) => {
        this.weatherService.getWeatherInfo(city.lat, city.lon).subscribe((res) => {
          this.favouriteLocations.push(res);
        })
      })
    }
  }

  updateSearchQuery(ev?: any) {
    const searchedCity = this.weatherForm.value.city;
    this.filterSearchQuery(searchedCity);
    this.formSubmitted = true;
  }

  filterSearchQuery(searchedCity: any) {
    this.searchResults = this.citiesArray.filter((city: { name: string; }) => city.name.toLowerCase().includes(searchedCity.toLowerCase()));
  }

  getWeatherDetails(lat: string, lng: string) {
    this.weatherService.getWeatherInfo(lat, lng).subscribe((res) => {
    console.log('ini data', res);
    this.weatherInfo = res;
    const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
    if (existingFavourites) {
        existingFavourites.push({ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon });
        this.localService.saveData('favourites', JSON.stringify(existingFavourites));
    } else {
        this.localService.saveData('favourites', JSON.stringify([{ lat: this.weatherInfo.coord.lat, lon: this.weatherInfo.coord.lon }]));
    }
    this.favouriteLocations.push(this.weatherInfo);
    this.formSubmitted = false;
    })
  }

  deleteFavourite(i: any) {
    if (i >= 0 && i < this.favouriteLocations.length) {
      this.favouriteLocations.splice(i, 1);
      const existingFavourites = JSON.parse(this.localService.getData('favourites')!);
      existingFavourites.splice(i, 1);
      this.localService.saveData('favourites', JSON.stringify(existingFavourites));
    }
  }
}