using AutoMapper;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.PersonServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.PersonServices.Mapping
{
    public class PersonMappingProfile : Profile
    {
        public PersonMappingProfile()
        {

            CreateMap<PersonDto, User>()
               .ForMember(x => x.Name, m => m.MapFrom(x => x.FirstName))
               .ForMember(x => x.EmailAddress, m => m.MapFrom(x => x.Email))
               .ForMember(x => x.Password, m => m.MapFrom(x => x.Password))
               .ForMember(x => x.Surname, m => m.MapFrom(x => x.LastName))
               .ForMember(x => x.UserName, m => m.MapFrom(x => x.Username))
               .ForMember(user => user.Id, m => m.Ignore());

            CreateMap<PersonDto, Person>()
                .ForMember(x => x.FirstName, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.LastName, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.Email, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.NationalId, m => m.MapFrom(x => x.NationalId))
                .ForMember(x => x.RegisterDate, m => m.Ignore())
                .ForMember(x => x.Id, m => m.Ignore());

            CreateMap<Person, PersonDto>()
                .ForMember(x => x.FirstName, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.LastName, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.Email, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.NationalId, m => m.MapFrom(x => x.NationalId))
                .ForMember(x => x.RegisterDate, m => m.MapFrom(x => x.RegisterDate))
                .ForMember(x => x.UserId, m => m.MapFrom(x => x.User != null ? x.User.Id : (long?) null));

        }
}
    }
