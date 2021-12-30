import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Produto } from '../produto.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

 /*Produto Service */
 addProduto(pro : Produto): Observable<Produto> {
  return this.http.post<Produto>(environment.addproURL,pro);
}

getAllProduto(): Observable<Produto[]>{
  return this.http.get<Produto[]>(environment.getproURL);
}

updateProduto(pro :Produto) : Observable<Produto>{
  return this.http.put<Produto>(environment.updatproUrl, pro);
}

deleteProduto(pro : Produto) : Observable<Produto> {
  return this.http.delete<Produto>(environment.deletproUrl+'/'+pro.id);
}

}
