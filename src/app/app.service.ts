import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getToken(): Observable<any> {
    console.log('metodo pesquisa foi chamado');
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: max-line-length
    return this.http.get(`http://localhost:4200/api/dts/datasul-rest/resources/login?username=super&password=hFG6ihTXl1PTTLM7UbpGtLAl64E%3D`,
    {responseType: 'text'});
  }

  getPedidos(): Observable<any> {
    console.log('methodo getPedidos foi chamado')
    return this.http.get('http://localhost:4200/api/dts/datasul-rest/resources/prg/mla/v1/decisao');
  }

  postPedidos(ordem, decisao): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const options = { headers };
    // tslint:disable-next-line: max-line-length
    return this.http.post(`http://localhost:4200/api/dts/datasul-rest/resources/prg/mla/v1/decisao?ordem=${ordem}&decisao=${decisao}`, options );

  }
}
