using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    [Table("Order_details")]
    public partial class OrderDetails
    {
        [Key]
        [Column("order_detail_id")]
        public int OrderDetailId { get; set; }
        [Column("order_id")]
        public int OrderId { get; set; }
        [Column("product_id")]
        public int ProductId { get; set; }
        [Column("order_detail_quantity")]
        public int OrderDetailQuantity { get; set; }
        [Column("order_detail_unit_price")]
        public double OrderDetailUnitPrice { get; set; }

        [ForeignKey("OrderId")]
        [InverseProperty("OrderDetails")]
        public Orders Order { get; set; }
        [ForeignKey("ProductId")]
        [InverseProperty("OrderDetails")]
        public Products Product { get; set; }
    }
}
