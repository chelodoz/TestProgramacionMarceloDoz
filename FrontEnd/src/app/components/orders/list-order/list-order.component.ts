import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { PdfMakeWrapper,Table,Txt,Columns} from 'pdfmake-wrapper';
import { ITable} from 'pdfmake-wrapper/lib/interfaces';


@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {

  constructor(public orderService : OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrders();
  }

  generatePDF(order : any){
    console.log(order);
    var date_new = new Date(order.orderSaleDate);
    const pdf = new PdfMakeWrapper();
    pdf.add( 
      new Columns([ 'Company S.A\n\n', '']).fontSize(24).end,
    );
    pdf.add( 
      new Columns([ '7 Bay Meadows St.','Date: '+ date_new.toLocaleDateString('en-GB') ]).fontSize(14).end,
    );
    pdf.add( 
      new Columns([ 'Olive Branch','Invoice #: '+order.orderId  ]).fontSize(14).end,
    );
    pdf.add( 
      new Columns([ 'MS 38654\n\n','' ]).fontSize(14).end,
    );

    pdf.add( 
      new Columns([ 'From \n\n', 'To \n\n' ]).fontSize(12).color("grey").end,
    );
    pdf.add( 
      new Columns([ 'Employee', 'Customer' ]).fontSize(16).bold().end,
    );
    pdf.add( 
      new Columns([ 'Code: '+order.employee.employeeId, 'Name: '+order.customer.customerFirstName+" "+order.customer.customerLastName ]).fontSize(14).end,
    );
    pdf.add( 
      new Columns([ 'Name: '+order.employee.employeeFirstName+' '+order.employee.employeeLastName,'']).fontSize(14).end,
    );
   
    pdf.add( 
      new Columns([ '\n\n', '\n\n']).fontSize(14).end,
    );

    
      pdf.add( 
        // new Txt('Hello world!').bold().italics().end,
         this.createItemTable(order)
       );

       pdf.add( 
        new Table([
          ['','','',''],
          ['',' ','','$ '+order.orderTotalPrice.toFixed(2)],
          ['','','','']
        ])
        .widths([225,75,75,75])
        .layout('lightHorizontalLines')
        .end

      );
    pdf.create().open();

  }

  createItemTable(data: ITable){
      return new Table([
        ['PRODUCT','UNIT PRICE','QUANTITY','TOTAL'],
        ...this.extractData(data)
      ])
      .widths([225,75,75,75])
      .layout('lightHorizontalLines')
      .end
  }

  extractData(data){
    return data.orderDetails.map(row =>[row.product.productName +" "+ row.product.productBrand,'$ '+row.orderDetailUnitPrice.toFixed(2),
      row.orderDetailQuantity,'$ '+(row.orderDetailUnitPrice*row.orderDetailQuantity).toFixed(2)]);
  }

}
