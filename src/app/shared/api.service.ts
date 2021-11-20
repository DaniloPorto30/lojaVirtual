import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _http: HttpClient) {}

  postProduto(data: any) {
    return this._http.post<any>('http://localhost:3000/produtos', data).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  getProdutos() {
    return this._http.get<any>('http://localhost:3000/produtos').pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  updateProdutos(data: any, id: number) {
    return this._http
      .put<any>('http://localhost:3000/produtos/' + id, data)
      .pipe(
        map((res: any) => {
          return res;
        })
      );
  }
  deleteProdutos(id: number) {
    return this._http.delete<any>('http://localhost:3000/produtos/' + id).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
}
