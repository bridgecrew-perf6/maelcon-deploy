import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

  descargarDB(){
    console.log('Descargando archivo DB');
  }

}
