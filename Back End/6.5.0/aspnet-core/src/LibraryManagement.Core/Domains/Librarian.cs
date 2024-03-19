using Abp.Domain.Entities.Auditing;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains
{
    [DiscriminatorValue("LM.Librarian")]
    public class Librarian : Person
    {
        /// <summary>
        /// 
        /// </summary>
        public string EmployeeNumber { get; set; }
    }
}
