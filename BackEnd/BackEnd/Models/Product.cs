using System;
using System.Collections.Generic;

#nullable disable

namespace BackEnd.Models
{
    public partial class Product
    {
        public Product()
        {
            OrderDetails = new HashSet<OrderDetail>();
        }

        public int ProductId { get; set; }
        public string ProductName { get; set; }
        public string ProductBrand { get; set; }
        public DateTime ProductExpirationDate { get; set; }
        public double ProductUnitPrice { get; set; }
        public int ProviderId { get; set; }

        public virtual Provider Provider { get; set; }
        public virtual ICollection<OrderDetail> OrderDetails { get; set; }
    }
}
