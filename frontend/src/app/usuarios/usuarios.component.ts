import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProviderService } from '../provider.service';

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
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css'],
})
export class UsuariosComponent implements OnInit {
  
  expandedElement: User | null = null;
  displayedColumns = ['id','nombre', 'email', 'puesto', 'detail'];
  dataSource: User[] = [];
  islockScreen = false;
  paginaActual = 1;
  numeroRegistros: number = 1;

  constructor(private providerService: ProviderService,
              private router: Router ) { }

  ngOnInit(): void {
    this.traerRegistros();
  }


  public cambiarPagina(event: any): void{
    this.paginaActual = event.pageIndex + 1;
    this.traerRegistros();
  }

  public traerRegistros(): void {
    this.islockScreen = true;
    this.providerService.getUsuarios(this.paginaActual).subscribe((res) => {
      this.dataSource = res.data;
      this.numeroRegistros = res.numberpages*50;
      this.islockScreen = false;
    }, (err) => {
      console.log(err);
      this.islockScreen = false;
    });
  }

  public verDetalle(data: User): void {
    this.router.navigate(['/detalle-usuario', { data: JSON.stringify(data) }]);
    console.log(data);
  }
}

