using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookOnTransactionServices.Dtos
{
    [AutoMap(typeof(BookOnTransaction))]
    public class BookOnTransactionDto : AuditedEntityDto<Guid>
    {
        public Guid? BookId { get; set; }
        public Guid? TransactionId { get; set; }
    }
}
