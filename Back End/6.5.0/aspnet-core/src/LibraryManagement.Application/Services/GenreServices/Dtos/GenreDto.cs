using Abp.Application.Services.Dto;
using AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreServices.Dtos
{
    [AutoMap(typeof(Genre))]
    public class GenreDto : AuditedEntityDto<Guid>
    {
        public string GenreName { get; set; }
    }
}
