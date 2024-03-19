using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.TransactionServices.Dtos
{
    public class TransactionDto : AuditedEntityDto<Guid>
    {

        public decimal Cost { get; set; }
        public Guid LibrarianId { get; set; }
        public Guid MemberId { get; set; }
        public DateTime ReturnDate { get; set; }
        public List<Guid> BookIds { get; set; }

    }
}
