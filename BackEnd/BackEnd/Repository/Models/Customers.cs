using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    public partial class Customers
    {
        public Customers()
        {
            Orders = new HashSet<Orders>();
        }

        [Key]
        [Column("customer_id")]
        public int CustomerId { get; set; }
        [Required]
        [Column("customer_first_name")]
        [StringLength(50)]
        public string CustomerFirstName { get; set; }
        [Required]
        [Column("customer_last_name")]
        [StringLength(50)]
        public string CustomerLastName { get; set; }
        [Column("customer_dni")]
        public int CustomerDni { get; set; }
        [Column("customer_birth_date", TypeName = "date")]
        public DateTime CustomerBirthDate { get; set; }
        [Column("customer_credit_card")]
        public long CustomerCreditCard { get; set; }

        [InverseProperty("Customer")]
        public ICollection<Orders> Orders { get; set; }
    }
}
