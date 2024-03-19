using AutoMapper;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreOnBookServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreOnBookServices.Mapping
{
    public class GenreOnBookMappingProfile : Profile 
    { 
        public GenreOnBookMappingProfile()
        {
            CreateMap<GenreOnBook, GenreOnBookDto>()
                .ForMember(x => x.BookId, m => m.MapFrom(x => x.Book != null ? x.Book.Id : (Guid?)null))
                .ForMember(x => x.GenreId, m => m.MapFrom(x => x.Genre != null ? x.Genre.Id :(Guid?)null));
                

            CreateMap<GenreOnBookDto, GenreOnBook>()
                .ForMember(x => x.Book, m => m.Ignore())
                .ForMember(x => x.Genre, m => m.Ignore());
        }
    }
}
