import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CargarScriptsService {
  constructor() {}

  carga(archivos: string[]) {
    for (let archivo of archivos) {
      let script = document.createElement('script');
      script.src = '/' + archivo + '.js';
      const body = document.getElementsByTagName('body')[0];
      body.appendChild(script);
    }
  }
}
