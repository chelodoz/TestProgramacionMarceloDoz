using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    public partial class Providers
    {
        public Providers()
        {
            Products = new HashSet<Products>();
        }

        [Key]
        [Column("provider_id")]
        public int ProviderId { get; set; }
        [Required]
        [Column("provider_name")]
        [StringLength(50)]
        public string ProviderName { get; set; }

        [InverseProperty("Provider")]
        public ICollection<Products> Products { get; set; }
    }
}
