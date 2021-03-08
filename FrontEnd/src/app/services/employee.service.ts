import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  myAppUrl = 'https://localhost:44371/';
  myApiUrl = 'api/Employees/';
  list : Employee[];
  private updateForm = new BehaviorSubject<Employee>({
    employeeId: 0
  } as any);

  constructor(private http: HttpClient) { }

  //server querys
  saveEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.myAppUrl + this.myApiUrl, employee);
  }

  deleteEmployee(id: number): Observable<Employee> {
    return this.http.delete<Employee>(this.myAppUrl + this.myApiUrl+ id);
  }
  getEmployees() {
   this.http.get<Employee>(this.myAppUrl + this.myApiUrl).toPromise()
      .then(data =>{
        this.list = data as unknown as Employee[];
      });
  }
  updateEmployee(id: number,employee : Employee): Observable<Employee>{
    return this.http.put<Employee>(this.myAppUrl+this.myApiUrl+id,employee);

  }



//get and update employee form
  updateEmployeeForm(employee){
    this.updateForm.next(employee);
  }
  getEmployee$():Observable<Employee>{
    return this.updateForm.asObservable();
  }
}
