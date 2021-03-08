import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, Observable } from 'rxjs';

import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/Products/';
  list : Product[];
  private updateForm = new BehaviorSubject<Product>({
    productId:0,
    provider:{
      providerId:0
    }
  } as any);

  constructor(private http: HttpClient) { }

 //server querys
  getProducts() {
    this.http.get<Product>(this.myAppUrl + this.myApiUrl).toPromise()
       .then(data =>{
         this.list = data as unknown as Product[];
       });
   }

  
  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.myAppUrl + this.myApiUrl, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(this.myAppUrl + this.myApiUrl+ id);
  }

  updateProduct(id: number,product : Product): Observable<Product>{
    return this.http.put<Product>(this.myAppUrl+this.myApiUrl+id,product);

  }



//get and update Product form
  updateProductForm(product){
    this.updateForm.next(product);
  }
  getProduct$():Observable<Product>{
    return this.updateForm.asObservable();
  }
  
  
}
