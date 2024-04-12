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
    public class BookOutputDto
    {
        public Book book { get; set; }
        public List<String> GenreNames { get; set; }
    }
}
