import { Component, OnInit } from '@angular/core';
import { SearchInitialInputsService } from 'src/app/services/search-initial-inputs.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  geoCoder: any;
  searchFormGroup: FormGroup;
  searchInput: any;
  advancedSearchToogle = false;

  constructor(private _formBuilder: FormBuilder, private router: Router,private searchInitialInputsService: SearchInitialInputsService) { }

  ngOnInit(): void {
    this.searchInput = this.searchInitialInputsService.ForSaleSearch;
    navigator.geolocation.getCurrentPosition(position => {
      this.searchInput.coordinates = [position.coords.longitude, position.coords.latitude];
    });
    this.searchFormGroup = this._formBuilder.group({
     minPrice: ['', Validators.required],
     maxPrice: ['', Validators.required],
     propertyType: ['', Validators.required],
     bedrooms: ['', Validators.required],
     distanceFromLocation: ['', Validators.required],
    });
    (mapboxgl as any).accessToken = 'pk.eyJ1IjoieG1vdXRheiIsImEiOiJjazVvM3RubzUxMXppM21ydzQ5dDI4ZnY3In0.4gqa8rQR0W0VXixe51JxbA';
    this.geoCoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      countries: 'ma',
      types: 'country,region,place,postcode,locality,neighborhood,address'
    });
    this.geoCoder.addTo('#geocoder');
  }


  searchForSale() {
    this.router.navigate(['/view-for-sale',
        {
        addedd: 'undefined',
        'location0': (this.geoCoder._typeahead.selected)? this.geoCoder._typeahead.selected.center[0]: this.searchInput.coordinates[0],
        'location1': (this.geoCoder._typeahead.selected)? this.geoCoder._typeahead.selected.center[1]: this.searchInput.coordinates[1],
        minPrice: this.searchFormGroup.value.minPrice,
        maxPrice: this.searchFormGroup.value.maxPrice,
        sortedBy: this.searchFormGroup.value.sortedBy,
        bedrooms: this.searchFormGroup.value.bedrooms,
        propertyType: this.searchFormGroup.value.propertyType,
        distanceFromLocation: this.searchFormGroup.value.distanceFromLocation
        }
      ]);
  }

  test() {
    
  }
}
