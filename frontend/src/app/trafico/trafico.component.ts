import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../provider.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-trafico',
  templateUrl: './trafico.component.html',
  styleUrls: ['./trafico.component.css']
})
export class TraficoComponent implements OnInit {

  diasArreglo: string[] = [];
  filas: any[] = [];
  numeroRegistros: number = 1;
  radiobaseForm = new FormControl('');
  regionForm = new FormControl('');
  paginaActual = 1;
  radiobaseActual = 'NA';
  regionActual = 'NA';
  islockScreen = false;
  constructor(private providerService: ProviderService) { }

  ngOnInit(): void {
    this.traerTodosLosRegistros();
    this.getDiasArreglo();
  }

  public getDiasArreglo(): void {
    const diaUNIX: number = 86400000;
    let fecha: any = new Date();
    let fechaAInsertar: any = new Date(1624597636598);
    let cadenaAInsertar = '';
    for( let dia=0; dia<30; dia++) {
      fechaAInsertar =  new Date(fecha.getTime() - (dia*diaUNIX));
      cadenaAInsertar = fechaAInsertar.toString().split(' ')[2] + '-' + fechaAInsertar.toString().split(' ')[1];
      this.diasArreglo.push(cadenaAInsertar);
    }
  }

  public cambiarPagina(event: any): void{
    this.paginaActual = event.pageIndex + 1;
    this.traerRegistros();
  }

  public buscarPorRadiobase(): void{
    this.paginaActual = 1;

    this.radiobaseActual = this.radiobaseForm.value.length > 0 ? this.radiobaseForm.value : 'NA';
    this.regionActual = 'NA';
    this.traerRegistros();
  }
  
  public buscarPorRegion(): void{
    this.paginaActual = 1;
    this.radiobaseActual = 'NA';
    this.regionActual = this.regionForm.value.length > 0 ? this.regionForm.value : 'NA';
    this.traerRegistros();
  }

  public traerTodosLosRegistros(): void {
    this.paginaActual = 1;
    this.radiobaseActual = 'NA';
    this.regionActual = 'NA';
    this.traerRegistros();
  }

  public traerRegistros(): void {
    this.islockScreen = true;
    this.providerService.getTrafico(this.paginaActual, this.radiobaseActual,  this.regionActual).subscribe((res) => {
      this.filas = res.data;
      this.numeroRegistros = res.numberpages*50;
      this.islockScreen = false;
    }, (err) => {
      console.log(err);
      this.islockScreen = false;
    });
  }
}
