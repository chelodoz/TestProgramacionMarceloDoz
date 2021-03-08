import { Injectable } from '@angular/core';
import { Provider } from '../models/provider';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/Providers/';
  list : Provider[];
  private updateForm = new BehaviorSubject<Provider>({
    providerId: 0
  } as any);
  constructor(private http: HttpClient) { }

     //server querys
  saveProvider(provider: Provider): Observable<Provider> {
    return this.http.post<Provider>(this.myAppUrl + this.myApiUrl, provider);
  }

  deleteProvider(id: number): Observable<Provider> {
    return this.http.delete<Provider>(this.myAppUrl + this.myApiUrl+ id);
  }
  getProviders() {
    this.http.get<Provider>(this.myAppUrl + this.myApiUrl).toPromise()
       .then(data =>{
         this.list = data as unknown as Provider[];
       });
   }
  updateProvider(id: number,provider : Provider): Observable<Provider>{
    return this.http.put<Provider>(this.myAppUrl+this.myApiUrl+id,provider);

  }



//get and update Provider form
  updateProviderForm(provider){
    this.updateForm.next(provider);
  }
  getProvider$():Observable<Provider>{
    return this.updateForm.asObservable();
  }
}
