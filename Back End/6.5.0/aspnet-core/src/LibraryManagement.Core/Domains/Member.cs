using Abp.Authorization.Users;
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
    [DiscriminatorValue("LM.Member")]
    public class Member : Person
    {
        public decimal Credits { get; set; }

    }
}
