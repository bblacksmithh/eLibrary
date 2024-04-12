using AutoMapper;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.MemberServices.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.MemberServices.Mapping
{
    public class MemberMappingProfile : Profile
    {
        public MemberMappingProfile()
        {
            CreateMap<Member, MemberDto>()
                .ForMember(x => x.Username, m => m.MapFrom(x => x.User != null ? x.User.UserName : null));

            CreateMap<MemberDto, User>()
                .ForMember(x => x.UserName, m => m.MapFrom(x => x.Username))
                .ForMember(x => x.Name, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.Surname, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.EmailAddress, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.Password, m => m.MapFrom(x => x.Password))
                .ForMember(x => x.Id, m => m.Ignore());

            CreateMap<User, MemberDto>()
                .ForMember(x => x.Username, m => m.MapFrom(x => x.UserName));

            CreateMap<MemberDto, Person>()
                .ForMember(x => x.FirstName, m => m.MapFrom(x => x.FirstName))
                .ForMember(x => x.LastName, m => m.MapFrom(x => x.LastName))
                .ForMember(x => x.Email, m => m.MapFrom(x => x.Email))
                .ForMember(x => x.NationalId, m => m.MapFrom(x => x.NationalId))
                .ForMember(x => x.User, m => m.Ignore());

            CreateMap<MemberDto, Member>()
                .ForMember(x => x.Credits, m => m.MapFrom(x => x.Credits))
                .ForMember(p => p.Id, e => e.Ignore());
        }
    }
}
