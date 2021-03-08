using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BackEnd.Repository.Models
{
    public partial class Employees
    {
        public Employees()
        {
            Orders = new HashSet<Orders>();
        }

        [Key]
        [Column("employee_id")]
        public int EmployeeId { get; set; }
        [Required]
        [Column("employee_first_name")]
        [StringLength(50)]
        public string EmployeeFirstName { get; set; }
        [Required]
        [Column("employee_last_name")]
        [StringLength(50)]
        public string EmployeeLastName { get; set; }
        [Required]
        [Column("employee_dni")]
        [StringLength(50)]
        public string EmployeeDni { get; set; }
        [Column("employee_birth_date", TypeName = "date")]
        public DateTime EmployeeBirthDate { get; set; }

        [InverseProperty("Employee")]
        public ICollection<Orders> Orders { get; set; }
    }
}
