using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreServices.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreServices
{
    public class GenreAppService : AsyncCrudAppService<Genre, GenreDto, Guid>, IGenreAppService
    {
        private readonly IRepository<GenreOnBook,Guid> _genreBookRepository;
        public GenreAppService(IRepository<Genre, Guid> repository, IRepository<GenreOnBook, Guid> genreBookRepository) : base(repository)
        {
            _genreBookRepository = genreBookRepository;
        }

        [HttpDelete]
        public async Task DeleteGenreAsync(Guid id)
        {
            await _genreBookRepository.DeleteAsync(a => a.Genre.Id == id);
            await Repository.DeleteAsync(x => x.Id == id);

        }
    }
}
