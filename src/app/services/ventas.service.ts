import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Sale, SaleDetail } from '../interfaces/objects.interface';
import { environment } from '../../environments/environment'
import { UsuariosService } from './usuarios.service';
import { Cliente } from '../interfaces/characters.interface';

@Injectable({
  providedIn: 'root'
})
export class VentasService {
  private bUA = environment.baseUrl;
  public _usuarioActual = this.US._usuarioActual;
  public _userToken=this.US._userToken;
  public _ventaActual = '';
  public _clientes=[];
  public _ventas=[]
  public _detallesVenta:SaleDetail[]=[]
  public datosVentAct:any;

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this._userToken
  });

  constructor(private US:UsuariosService, private http:HttpClient) {
    this.obtenerVentas();
    this.obtenerClientes();
   }

  clientData:Cliente = {
    ID_CLIENTE: 0,
    NOMBRE_CLIENTE: '',
    RTN: '',
    DIRECCION_CLIENTE: '',
    TELEFONO_CLIENTE: ''
  }

  saleData:Sale = {
    ID_PAGO: 0,
    ID_USUARIO: 0,
    ID_CLIENTE: 0,
    DESCRIPCION: ''
  }

  //funcion para crear Cliente
  crearCliente( data:Cliente): Observable<any>{
    return this.http.post<Cliente>(`${this.bUA}/module/sales/client`, data);
  }

  //funcion para actualizar Cliente
  actualizarCliente( data:Cliente, id:any): Observable<any>{
    return this.http.put<Cliente>(`${this.bUA}/module/sales/client/${id}`, data);
  }

  //funcion para obtener Clientes
  obtenerClientes(){
    this.http.get<Cliente>(`${this.bUA}/module/sales/client`).subscribe((resp) => {
      //console.log('clientes',resp['usuario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._clientes=resp['usuario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener un Cliente en especifico
  obtenerCliente(id:any): Observable<any>{
    return this.http.get<Cliente>(`${this.bUA}/module/sales/client/${id}`);
  }

  //funcion para crear encabezado de Venta
  crearVentaEncabezado( data:any): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/sales/saleHeader`, data);
  }

  //funcion para actualizar encabezado Venta
  actualizarVentaEncabezado( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/sales/saleHeader/${id}`, data);
  }

  //funcion para obtener detalles de ventas
  obtenerDetalleVentas(): Observable<any>{
    return this.http.get<Sale>(`${this.bUA}/module/sales/saleDetail`);
  }

  //funcion para obtener un detalle de Venta en especifico
  obtenerDetalleVenta(id:any){
    this.http.get<any>(`${this.bUA}/module/sales/saleDetail/${id}`).subscribe((resp) => {
      console.log('detallesVenta',resp['usuario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._detallesVenta=resp['usuario'];
      }else{
        this._detallesVenta=[]
        //console.log('no',resp);
      }
    });
  }

  //funcion para añadir un producto a un detalle de venta
  anadirProducto( data:any, id:any ): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, data);
  }

  //funcion para actualizar un producto de un detalle de venta
  actualizarProducto( data:any, id:any): Observable<any>{
    return this.http.put<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, data);
  }

  //funcion para eliminar producto de una venta
  eliminarProducto( data:any, id:any): Observable<any>{
    return this.http.delete<any>(`${this.bUA}/module/sales/addProduct2Sale/${id}`, {body:data})
  }

  //funcion para procesar una venta
  procesarVenta( data:any, id:any ): Observable<any>{
    return this.http.post<any>(`${this.bUA}/module/sales/sale/${id}`, data);
  }

  //funcion para obtener ventas
  obtenerVentas(){
    return this.http.get<any>(`${this.bUA}/module/sales/sale`).subscribe((resp) => {
      //console.log('ventas',resp['usuario']);
      if(resp['mensaje'][0]['CODIGO']==1){
        this._ventas=resp['usuario'];
      }else{
        //console.log('no',resp);
      }
    });
  }

  //funcion para obtener ventas
  obtenerListaVentas(): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/sales/sale`);
  }

  //funcion para obtener una Venta completa
  obtenerVentaCompleta(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/sales/saleFull/${id}`);
  }

  //funcion para obtener una Venta
  obtenerVenta(id:any): Observable<any>{
    return this.http.get<any>(`${this.bUA}/module/sales/sale/${id}`);
  }

  //funcion para eliminar una venta
  eliminarVenta( data:any, id:any): Observable<any>{
    return this.http.delete<any>(`${this.bUA}/module/sales/sale/${id}`, {body:data})
  }

}
