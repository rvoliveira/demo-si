import { Component } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  directionsService: any;
  directionsDisplay: any;
  destinationPosition: string;
  startPosition: any;
  map: any;
  
  constructor(private geolocation: Geolocation) { }
  
  ionViewDidLoad() {
    this.initializeMap();
  }
  
  initializeMap() {
    this.geolocation.getCurrentPosition()
      .then((resp) => {
        this.directionsService = new google.maps.DirectionsService();
        this.directionsDisplay = new google.maps.DirectionsRenderer();
        this.startPosition = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
        const mapOptions = {
          zoom: 18,
          center: this.startPosition,
        }
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        this.directionsDisplay.setMap(this.map);
        //new google.maps.Marker({position: this.startPosition, map: this.map});
      }).catch((error) => {
        console.log('Erro ao recuperar sua posição', error);
      });
  }

  calculateRoute() {
    if (this.destinationPosition && this.startPosition) {
      const request = {
        // Pode ser uma coordenada (LatLng), uma string ou um lugar
        origin: this.startPosition,
        destination: this.destinationPosition,
        travelMode: 'DRIVING'
      };
      this.traceRoute(this.directionsService, this.directionsDisplay, request);
    }
  }

  traceRoute(service: any, display: any, request: any) {
    service.route(request, function (result, status) {
      if (status == 'OK') {
        display.setDirections(result);
      }
    });
  }

}
