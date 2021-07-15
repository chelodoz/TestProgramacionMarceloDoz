using System;
using System.Collections.Generic;

#nullable disable

namespace BackEnd.Models
{
    public partial class Employee
    {
        public Employee()
        {
            Orders = new HashSet<Order>();
        }

        public int EmployeeId { get; set; }
        public string EmployeeFirstName { get; set; }
        public string EmployeeLastName { get; set; }
        public string EmployeeDni { get; set; }
        public DateTime EmployeeBirthDate { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
