using AutoMapper;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookOnTransactionServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookOnTransactionServices.Mapping
{
    public class BookOnTransactionMappingProfile : Profile
    {
        public BookOnTransactionMappingProfile()
        {
            CreateMap<BookOnTransaction, BookOnTransactionDto>()
                .ForMember(x => x.BookId, m => m.MapFrom(x => x.Book != null ? x.Book.Id : (Guid?)null))
                .ForMember(x => x.TransactionId, m => m.MapFrom(x => x.Transaction != null ? x.Transaction.Id : (Guid?)null));
            ///
            ///
            ///
            CreateMap<BookOnTransactionDto, BookOnTransaction>()
                .ForMember(x => x.Book, m => m.Ignore())
                .ForMember(x => x.Transaction, m => m.Ignore());
        }
    }
}
