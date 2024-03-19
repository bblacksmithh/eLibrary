using Abp.Application.Services;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreOnBookServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreOnBookServices
{
    public interface IGenreOnBookAppService:IApplicationService, IAsyncCrudAppService<GenreOnBookDto, Guid>
    {
        //public Task CreateAsync(GenreOnBookDto input);
        //public Task GetAsyncAsync(GenreOnBookDto input);
        //public Task CreateAsync(GenreOnBookDto input);
        //public Task CreateAsync(GenreOnBookDto input);
        //public Task CreateAsync(GenreOnBookDto input);

    }
}
