import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface User {
  id: number;
  nombre: string;
  email: string;
  puesto: string;
  domicilio: string;
  fechanacimiento: Date;
  habilidades: string;
}

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  currentUser: User = {
    id: 0,
    nombre: '',
    email: '',
    puesto: '',
    domicilio: '',
    fechanacimiento: new Date,
    habilidades: '',
  };
  constructor(private route: ActivatedRoute, ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentUser = JSON.parse(params['data']);
      console.log(this.currentUser);
    });
  }

}
