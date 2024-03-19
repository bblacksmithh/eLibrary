using AutoMapper;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookServices.Mapping
{
    public class BookMappingProfile : Profile
    {
        public BookMappingProfile()
        {
            CreateMap<Book, BookDto>();
            CreateMap<BookDto, Book>()
                .ForMember(b => b.Id, m => m.Ignore());
        }
    }
}
