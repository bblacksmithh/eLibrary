using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.GenreOnBookServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.GenreOnBookServices
{
    public class GenreOnBookAppService : AsyncCrudAppService<GenreOnBook, GenreOnBookDto, Guid>, IGenreOnBookAppService
    {
        private readonly IRepository<GenreOnBook, Guid> _repository;
        public GenreOnBookAppService(IRepository<GenreOnBook, Guid> repository) : base(repository)
        {
            _repository = repository;
        }

        public async Task<List<GenreOnBookDto>> GetAllGenreOnBookAsync()
        {
            var genreOnBook = _repository.GetAllIncluding(x=>x.Genre,y=>y.Book);
            var response = ObjectMapper.Map<List<GenreOnBookDto>>(genreOnBook);
            return response;
        }

        public async Task<GenreOnBookDto> GetGenreOnBookAsync(Guid id)
        {
            var genreOnBook = _repository.GetAllIncluding(x => x.Genre, y => y.Book).FirstOrDefault(x=>x.Id == id);
            var response = ObjectMapper.Map<GenreOnBookDto>(genreOnBook);
            return response;
        }
    }
}
