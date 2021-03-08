import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from 'src/app/models/product';
import { OrderService } from 'src/app/services/order.service';
import { OrderDetail } from 'src/app/models/orderdetail';


@Component({
  selector: 'app-product-select',
  templateUrl: './product-select.component.html',
  styleUrls: ['./product-select.component.css']
})
export class ProductSelectComponent implements OnInit {
  form: FormGroup;
  product: Product;
  constructor(private formBuilder: FormBuilder, public productService: ProductService, public orderService : OrderService) {

    this.form = this.formBuilder.group({
      id:[0, [Validators.required,Validators.min(1)]],
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]],
      expirationdate: ['', [Validators.required]],
      unitprice: ['', [Validators.required]],
      quantity: ['', [Validators.required,Validators.min(1)]],
      providerid: 0,
      providername: ['', [Validators.required]],

    })
  }

  ngOnInit(): void {
    this.productService.getProducts();
  }
  updatePrice(id: number) {

  
    if(id>0){
      this.form.patchValue({
        id:this.productService.list.filter(item => item.productId == id)[0].productId,
        name: this.productService.list.filter(item => item.productId == id)[0].productName,
        brand: this.productService.list.filter(item => item.productId == id)[0].productBrand,
        expirationdate: new Date(this.productService.list.filter(item => item.productId == id)[0].productExpirationDate).toLocaleDateString('en-GB'),
        unitprice: this.productService.list.filter(item => item.productId == id)[0].productUnitPrice,
        providername: this.productService.list.filter(item => item.productId == id)[0].provider.providerName,
        providerid: this.productService.list.filter(item => item.productId == id)[0].provider.providerId,
      });
    }
    



    

  }
  addProduct() {
    const orderItem =  {
      productId: this.form.get('id').value,
      productName: this.form.get('name').value,
      productBrand: this.form.get('brand').value,
      productExpirationDate: this.form.get('expirationdate').value,
      productUnitPrice: this.form.get('unitprice').value,
      providerName: this.form.get('providername').value,
      providerId: this.form.get('providerid').value,
      orderQuantity:  this.form.get('quantity').value,
    }
    const orderDetail : OrderDetail =  {
      productId: this.form.get('id').value,
      orderDetailQuantity:  this.form.get('quantity').value,
      orderDetailUnitPrice:  this.form.get('unitprice').value,
    }
    
    
    if(this.orderService.orderItems.filter(item => item.productId == orderItem.productId).length === 0){
     //add order objects into orderitems array
      this.orderService.orderItems.push(orderItem);
      this.orderService.orderDetail.push(orderDetail);
    }
    else{
      //edit order objects array 
      var objIndex = this.orderService.orderItems.findIndex(item => item.productId == orderItem.productId);
      this.orderService.orderItems[objIndex].orderQuantity = this.form.get('quantity').value;
      this.orderService.orderDetail[objIndex].orderDetailQuantity= this.form.get('quantity').value;
    }
    
    this.orderService.updateTotal();
   
    this.form.reset();
    this.form.patchValue({
      id: 0   
    });
  }

}
