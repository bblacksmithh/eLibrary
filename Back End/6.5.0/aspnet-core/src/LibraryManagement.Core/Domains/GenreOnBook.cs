using Abp.Domain.Entities.Auditing;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains
{
    public class GenreOnBook : AuditedEntity<Guid>
    {
        /// <summary>
        /// 
        /// </summary>
        public Genre Genre { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Book Book { get; set; }
    }
}
