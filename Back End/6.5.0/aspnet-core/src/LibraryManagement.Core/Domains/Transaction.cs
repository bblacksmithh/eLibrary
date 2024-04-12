using Abp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains
{
    public class Transaction : Entity<Guid>
    {
        /// <summary>
        /// 
        /// </summary>
        public decimal Cost { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Book Book { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Librarian Librarian { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public Member Member { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime BorrowDate { get; set; } = DateTime.Now;
        /// <summary>
        /// 
        /// </summary>
        public DateTime ReturnDate { get; set; }
    }
}
