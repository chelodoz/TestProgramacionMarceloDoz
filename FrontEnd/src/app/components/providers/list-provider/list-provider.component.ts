import { Component, OnInit } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';
import { ToastrService } from 'ngx-toastr';
import { Provider } from 'src/app/models/provider';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
  styleUrls: ['./list-provider.component.css']
})
export class ListProviderComponent implements OnInit {

  constructor(public providerService : ProviderService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.providerService.getProviders();
  }
  deleteProvider(id : number){
    if(confirm('Confirm delete action')){
      this.providerService.deleteProvider(id).subscribe(data => {
        this.toastr.warning('provider deleted');
        this.providerService.getProviders();
      },
      error=>{
        this.toastr.error('Provider is attach to product','Cannot delete provider');
      })
    }
  }
  editProvider(provider : Provider){
    this.providerService.updateProviderForm(provider);
  }
}

