using Abp.Domain.Entities.Auditing;
using JetBrains.Annotations;
using LibraryManagement.Authorization.Users;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains
{
    public class Person : AuditedEntity<Guid>
    {
        [StringLength(50)]
        public string FirstName { get; set; }
        [StringLength(50)]
        public string LastName { get; set; }
        [StringLength(100)]
        public string Email { get; set; }
        [StringLength(13)]
        public string NationalId { get; set; }
        public DateTime RegisterDate { get; set; } = DateTime.Now;
        public User User { get; set; }
    }
}
