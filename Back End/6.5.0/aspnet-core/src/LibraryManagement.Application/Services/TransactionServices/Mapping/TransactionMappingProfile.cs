using AutoMapper;
using LibraryManagement.Domains;
using LibraryManagement.Services.TransactionServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.TransactionServices.Mapping
{
    public class TransactionMappingProfile : Profile
    {
        public TransactionMappingProfile()
        {
            CreateMap<Transaction, TransactionDto>()
                .ForMember(x => x.LibrarianId, m => m.MapFrom(x => x.Librarian != null ? x.Librarian.Id : (Guid?)null))
                .ForMember(x => x.MemberId, m => m.MapFrom(x => x.Member != null ? x.Member.Id : (Guid?)null))
                .ReverseMap();
            ///
            ///
            ///
            CreateMap<TransactionDto, Transaction>()
                .ForMember(x => x.Member, m => m.Ignore())
                .ForMember(x => x.Librarian, m => m.Ignore())
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Book, m => m.Ignore());
            ///
            ///
            ///
            CreateMap<Transaction, TransactionDto>()
                .ForMember(x => x.LibrarianId, m => m.MapFrom(x => x.Librarian != null ? x.Librarian.Id : (Guid?)null))
                .ForMember(x => x.MemberId, m => m.MapFrom(x => x.Member != null ? x.Member.Id : (Guid?)null));
        }
    }
}
