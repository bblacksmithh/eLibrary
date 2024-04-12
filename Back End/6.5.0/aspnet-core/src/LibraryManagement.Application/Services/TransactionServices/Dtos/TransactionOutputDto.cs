using Abp.Application.Services.Dto;
using Abp.Domain.Entities.Auditing;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.TransactionServices.Dtos
{
    public class TransactionOutputDto : EntityDto<Guid>
    {
        public String LibrarianName {  get; set; }
        public String MemberUsername { get; set; }
        public List<String> BookNames { get; set; }
        public DateTime BorrowDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public decimal Cost { get; set; }

    }
}
