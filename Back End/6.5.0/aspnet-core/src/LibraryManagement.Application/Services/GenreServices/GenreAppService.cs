using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreServices
{
    public class GenreAppService : AsyncCrudAppService<Genre, GenreDto, Guid>, IGenreAppService
    {
        public GenreAppService(IRepository<Genre, Guid> repository) : base(repository)
        {
        }
    }
}
