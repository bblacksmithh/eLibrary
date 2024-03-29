﻿using AutoMapper;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreServices.Mapping
{
    public class GenreMappingProfile : Profile
    {
        public GenreMappingProfile()
        {
            CreateMap<GenreDto, Genre>();
            CreateMap<Genre, GenreDto>();
        }
    }
}
