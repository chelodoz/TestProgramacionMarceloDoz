using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    public partial class Orders
    {
        public Orders()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        [Key]
        [Column("order_id")]
        public int OrderId { get; set; }
        [Column("customer_id")]
        public int CustomerId { get; set; }
        [Column("employee_id")]
        public int EmployeeId { get; set; }
        [Column("order_sale_date", TypeName = "date")]
        public DateTime OrderSaleDate { get; set; }
        [Column("order_total_price")]
        public double OrderTotalPrice { get; set; }

        [ForeignKey("CustomerId")]
        [InverseProperty("Orders")]
        public Customers Customer { get; set; }
        [ForeignKey("EmployeeId")]
        [InverseProperty("Orders")]
        public Employees Employee { get; set; }
        [InverseProperty("Order")]
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
