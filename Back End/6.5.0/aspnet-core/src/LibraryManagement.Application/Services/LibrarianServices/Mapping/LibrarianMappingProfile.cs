using Abp.Localization;
using AutoMapper;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.LibrarianServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.LibrarianServices.Mapping
{
    public class LibrarianMappingProfile : Profile
    {
        public LibrarianMappingProfile()
        {

            CreateMap<Librarian, LibrarianDto>()
                .ForMember(x => x.Username, m => m.MapFrom(x => x.User != null ? x.User.UserName : null));
      
  
            CreateMap<LibrarianDto, User>()
                .ForMember(x => x.UserName, m => m.MapFrom(x => x.Username))
                //////.ForMember(x => x.Password, m => m.MapFrom(x => x.Password))
                .ForMember(x => x.EmailAddress, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.Name, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.Surname, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.Id, m => m.Ignore());
            ///
            ///
            ///
            CreateMap<LibrarianDto, Person>()
                .ForMember(x => x.FirstName, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.LastName, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.Email, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.NationalId, m => m.MapFrom(x => x.NationalId))
                .ForMember(x => x.User, m => m.Ignore());
  
            ///
            ///
            ///
            CreateMap<LibrarianDto, Librarian>()
                .ForMember(x => x.EmployeeNumber, m => m.MapFrom(x => x.EmployeeNumber))
                .ForMember(l => l.Id, m => m.Ignore());
        }
    }
}
