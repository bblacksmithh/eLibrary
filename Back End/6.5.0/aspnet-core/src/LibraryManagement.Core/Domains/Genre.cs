using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains
{
    public class Genre : AuditedEntity<Guid>
    {
        public string GenreName { get; set; }
    }
}
