using System;
using System.Collections.Generic;

#nullable disable

namespace BackEnd.Models
{
    public partial class Provider
    {
        public Provider()
        {
            Products = new HashSet<Product>();
        }

        public int ProviderId { get; set; }
        public string ProviderName { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
