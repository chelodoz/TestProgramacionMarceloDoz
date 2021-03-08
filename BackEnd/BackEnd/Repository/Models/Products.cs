using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    public partial class Products
    {
        public Products()
        {
            OrderDetails = new HashSet<OrderDetails>();
        }

        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }
        [Required]
        [Column("product_name")]
        [StringLength(50)]
        public string ProductName { get; set; }
        [Required]
        [Column("product_brand")]
        [StringLength(50)]
        public string ProductBrand { get; set; }
        [Column("product_expiration_date", TypeName = "date")]
        public DateTime ProductExpirationDate { get; set; }
        [Column("product_unit_price")]
        public double ProductUnitPrice { get; set; }
        [Column("provider_id")]
        public int ProviderId { get; set; }

        [ForeignKey("ProviderId")]
        [InverseProperty("Products")]
        public Providers Provider { get; set; }
        [InverseProperty("Product")]
        public ICollection<OrderDetails> OrderDetails { get; set; }
    }
}
