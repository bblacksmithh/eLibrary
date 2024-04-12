using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreOnBookServices.Dtos
{
    [AutoMap(typeof(GenreOnBook))]
    public class GenreOnBookDto : EntityDto<Guid>
    {
            public Guid? GenreId { get; set; }
            public Guid? BookId { get; set; }
    }
}
