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
            ///
            ///
            ///
            CreateMap<TransactionDto, Transaction>()
                .ForMember(x => x.Member, m => m.Ignore())
                .ForMember(x => x.Librarian, m => m.Ignore())
                .ForMember(x => x.Id, m => m.Ignore())
                .ForMember(x => x.Book, m => m.Ignore())
                .ForMember(x => x.ReturnDate, m => m.Ignore())
                .ForMember(x => x.Cost, m => m.Ignore())
                .ForMember(x => x.BorrowDate, m => m.Ignore())
                ;
        }
    }
}
