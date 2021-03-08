import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { ToastrService } from 'ngx-toastr';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-list-employee',
  templateUrl: './list-employee.component.html',
  styleUrls: ['./list-employee.component.css']
})
export class ListEmployeeComponent implements OnInit {

  constructor(public employeeService : EmployeeService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees();
  }
  deleteEmployee(id : number){
    if(confirm('Confirm delete action')){
      this.employeeService.deleteEmployee(id).subscribe(data => {
        this.toastr.warning('Employee deleted');
        this.employeeService.getEmployees();
      },
      error=>{
        this.toastr.error('Employee is attach to order','Cannot delete employee');
      })
    }
  }
  editEmployee(employee : Employee){
    this.employeeService.updateEmployeeForm(employee);
  }
}
