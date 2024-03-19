using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookServices.Dtos
{
    [AutoMap(typeof(Book))]
    public class BookDto : AuditedEntityDto<Guid>
    {
        public string Title { get; set; }
        public string Author { get; set; }
        public string ISBN { get; set; }
        public string Condition { get; set; }
        public List<Guid> GenreIds { get; set; }
    }
}
