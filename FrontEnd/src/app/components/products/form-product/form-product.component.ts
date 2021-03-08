import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ToastrService } from 'ngx-toastr';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css']
})
export class FormProductComponent implements OnInit {
  form: FormGroup;
  suscription : Subscription;
  product : Product;
  productId = 0;


  constructor(private formBuilder: FormBuilder,
    private productService: ProductService,
    public providerService: ProviderService,
    private toastr: ToastrService) {

    this.form = this.formBuilder.group({
      productId:0,
      productName: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      productBrand: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50)]],
      productUnitPrice: ['',[Validators.required,Validators.min(1),Validators.max(99999999)]],
      productExpirationDate: ['',[Validators.required]],
      providerId : [0,[Validators.required,Validators.min(1)]],
      
    })
   }

  ngOnInit(): void {
    this.providerService.getProviders();
    
    this.suscription=this.productService.getProduct$().subscribe(data=>{
      
      this.product = data;
  
      
      
      this.form.patchValue({
        productName : this.product.productName,
        productBrand : this.product.productBrand,
        productUnitPrice : this.product.productUnitPrice,
        providerId : this.product.provider?.providerId,
      });

      if(this.product.productExpirationDate){
        this.form.patchValue({
          productExpirationDate : new Date(this.product.productExpirationDate).toLocaleDateString('fr-CA')
      });
    }
      if(this.product.productId != 0){
      this.productId = this.product.productId;
      }
      

    });
  }
  ngOnDestroy(){
    this.suscription.unsubscribe();
  }
  saveProduct(){
     
    if (this.productId=== 0){
      this.add();
    }
    else{
      this.edit();
    }


  }

  add(){

    const product : Product = {
      productName : this.form.get('productName').value,
      productBrand :  this.form.get('productBrand').value,
      productUnitPrice : this.form.get('productUnitPrice').value,
      productExpirationDate :  this.form.get('productExpirationDate').value,
      providerId : this.form.get('providerId').value
      }
      this.productService.saveProduct(product).subscribe(data =>{
        this.toastr.success('Save succesfully');
        this.productService.getProducts();
        this.form.reset();
        this.form.patchValue({
          providerId : 0,
        });
      })
      
  }

  edit(){
    const product : Product = {
      productId : this.productId,
      productName : this.form.get('productName').value,
      productBrand :  this.form.get('productBrand').value,
      productUnitPrice : this.form.get('productUnitPrice').value,
      productExpirationDate :  this.form.get('productExpirationDate').value,
      providerId : this.form.get('providerId').value
      };
      this.productService.updateProduct(this.productId,product).subscribe(data => {
        this.toastr.info('Updated succesfully');
        this.productService.getProducts();
        this.form.reset();
        this.productId= 0;
        this.form.patchValue({
          providerId : 0,
        });
      })
  }
}

