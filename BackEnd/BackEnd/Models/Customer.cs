using System;
using System.Collections.Generic;

#nullable disable

namespace BackEnd.Models
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public int CustomerId { get; set; }
        public string CustomerFirstName { get; set; }
        public string CustomerLastName { get; set; }
        public int CustomerDni { get; set; }
        public DateTime CustomerBirthDate { get; set; }
        public long CustomerCreditCard { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
