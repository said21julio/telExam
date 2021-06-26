import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProviderService } from '../provider.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  private regexAlfabetico = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
  private regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
  private regexFecha = /\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])*/;
  private regexAlfaNumerico = /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;

  public nuevaHabilidadForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexAlfabetico)]);
  public habilidadesData: any[] = []
  public islockScreen = false;

  public nombreForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexAlfabetico)]);
  public emailForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexEmail)]);
  public puestoForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexAlfabetico)]);
  public fechanacimientoForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexFecha)]);
  public domicilioForm = new FormControl('',[ Validators.required, Validators.pattern(this.regexAlfaNumerico)]);
  public habilidadesForm = new FormControl('', [Validators.required]);
  public usuarioForm: FormGroup;

  constructor(private providerService: ProviderService,
              private _snackBar: MatSnackBar) {
                this.usuarioForm = this.createForm();
              }

  ngOnInit(): void {
    this.cargarHabilidades();   
    console.log(this.usuarioForm.controls); 
  }

  public agregarUsuario(): void {
    if(this.usuarioForm.invalid) {
      return;
    }
    this.islockScreen = true;
    this.providerService.createUsuarios({
        nombre: this.nombreForm.value,
        email: this.emailForm.value,
        puesto: this.puestoForm.value,
        fechaNacimiento: this.fechanacimientoForm.value,
        domicilio: this.domicilioForm.value,
        habilidades : this.habilidadesForm.value,
      }).subscribe(async () => {
        this.usuarioForm.reset();
        this.toast('Se agrego correctamente el usuario', 'success');
        this.islockScreen = false;
      }, () => {
        this.toast('Ocurrió un error vuelva a intentarlo más tarde', 'error');
        this.islockScreen = false;
      });
    
  }

  public agregarHabilidad(): void {
    if(this.nuevaHabilidadForm.invalid) {
      return;
    }
    this.islockScreen = true;
    this.providerService.createHabilidad({habilidad : this.nuevaHabilidadForm.value}).subscribe(async () => {
      await this.cargarHabilidades();
      this.toast('Se agrego correctamente la habilidad', 'success');
      this.nuevaHabilidadForm.reset();
      this.islockScreen = false;
    }, () => {
      this.toast('Ocurrió un error vuelva a intentarlo más tarde', 'error');
      this.islockScreen = false;
    });
  }

  private toast(mensaje: string, clase: string) {
    this._snackBar.open(mensaje, '', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3 * 1000,
      panelClass: [clase]
    });
  }

  private async cargarHabilidades(): Promise<void> {
    this.habilidadesData = await this.providerService.getHabilidades().toPromise();
  }

  private createForm(): FormGroup {
    return new FormGroup({
      nombreForm: this.nombreForm,
      emailForm: this.emailForm,
      puestoForm: this.puestoForm,
      fechanacimientoForm: this.fechanacimientoForm,
      domicilioForm: this.domicilioForm,
      habilidadesForm: this.habilidadesForm
    });
  }

}
