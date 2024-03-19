using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Services.GenreServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreServices
{
    public interface IGenreAppService : IAsyncCrudAppService<GenreDto, Guid>
    {
    }
}
