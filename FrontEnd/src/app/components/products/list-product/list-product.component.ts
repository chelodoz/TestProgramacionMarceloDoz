import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  constructor(public productService : ProductService,
    public toastr: ToastrService) { }

  ngOnInit(): void {
    this.productService.getProducts();
  }
  deleteProduct(id : number){
    if(confirm('Confirm delete action')){
      this.productService.deleteProduct(id).subscribe(data => {
        this.toastr.warning('Product deleted');
        this.productService.getProducts();
      },
      error=>{
        this.toastr.error('Product is attach to order','Cannot delete product');
      })
    }
  }
  editProduct(product : Product){
    this.productService.updateProductForm(product);
  }

}
