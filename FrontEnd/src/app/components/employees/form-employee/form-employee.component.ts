import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css']
})
export class FormEmployeeComponent implements OnInit, OnDestroy {
  form: FormGroup;
  suscription : Subscription;
  employee : Employee;
  employeeId = 0;

  constructor(private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      id:0,
      name: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      surname: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      dni: ['',[Validators.required,Validators.min(10000000),Validators.max(99999999)]],
      birthdate: ['',[Validators.required]],
      
    })
   }

  ngOnInit(): void {

    this.form.reset();

    this.suscription=this.employeeService.getEmployee$().subscribe(data=>{
      
      this.employee = data;
      
      
      this.form.patchValue({
        name : this.employee.employeeFirstName,
        surname : this.employee.employeeLastName,
        dni : this.employee.employeeDni
      });
      if(this.employee.employeeBirthDate){
        this.form.patchValue({
          birthdate : new Date(this.employee.employeeBirthDate).toLocaleDateString('fr-CA')
      });
      }
      if(this.employee.employeeId != 0){
        this.employeeId = this.employee.employeeId;
      }
      
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  saveEmployee(){

    if (this.employeeId=== 0){
      this.add();
    }
    else{
      this.edit();
    }


  }

  add(){

    const employee : Employee = {
      employeeFirstName : this.form.get('name').value,
      employeeLastName :  this.form.get('surname').value,
      employeeDni : this.form.get('dni').value,
      employeeBirthDate :  this.form.get('birthdate').value
      }
      this.employeeService.saveEmployee(employee).subscribe(data =>{
        this.toastr.success('Save succesfully');
        this.employeeService.getEmployees();
        this.form.reset();
      })
      
  }

  edit(){
    const employee : Employee = {
      employeeId : this.employeeId,
      employeeFirstName : this.form.get('name').value,
      employeeLastName :  this.form.get('surname').value,
      employeeDni : this.form.get('dni').value,
      employeeBirthDate :  this.form.get('birthdate').value
      };
      this.employeeService.updateEmployee(this.employeeId,employee).subscribe(data => {
        this.toastr.info('Updated succesfully');
        this.employeeService.getEmployees();
        this.form.reset();
        this.employeeId= 0;
      })
  }

  resetForm(){
    this.form.reset();
    this.employeeId=0;
  }
}
