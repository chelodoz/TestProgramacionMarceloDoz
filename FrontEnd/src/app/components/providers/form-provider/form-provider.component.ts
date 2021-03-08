import { Component, OnInit } from '@angular/core';
import { Provider } from 'src/app/models/provider';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProviderService } from 'src/app/services/provider.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-form-provider',
  templateUrl: './form-provider.component.html',
  styleUrls: ['./form-provider.component.css']
})
export class FormProviderComponent implements OnInit {
  form: FormGroup;
  suscription : Subscription;
  provider : Provider;
  providerId = 0;

  constructor(private formBuilder: FormBuilder,
    private providerService: ProviderService,
    private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      providerId:0,
      providerName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
     
    })
   }

  ngOnInit(): void {
    this.suscription=this.providerService.getProvider$().subscribe(data=>{
      
      this.provider = data;
      
      
      this.form.patchValue({
        providerName : this.provider.providerName,
      });
      if(this.provider.providerId != 0){
        this.providerId = this.provider.providerId;
      }
      
    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  saveProvider(){
      console.log("id",this.providerId);
    if (this.providerId=== 0){
      this.add();
    }
    else{
      this.edit();
    }


  }

  add(){

    const provider : Provider = {
      providerName : this.form.get('providerName').value,
   
      }
      this.providerService.saveProvider(provider).subscribe(data =>{
        this.toastr.success('Save succesfully');
        this.providerService.getProviders();
        this.form.reset();
      })
      
  }

  edit(){
    const provider : Provider = {
      providerId : this.providerId,
      providerName : this.form.get('providerName').value
      };
      this.providerService.updateProvider(this.providerId,provider).subscribe(data => {
        this.toastr.info('Updated succesfully');
        this.providerService.getProviders();
        this.form.reset();
        this.providerId= 0;
      })
  }
}
