using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookServices.Dtos;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookServices
{
    public class BookAppService : AsyncCrudAppService<Book, BookDto, Guid>, IBookAppService
    {
        private readonly IRepository<Book,Guid> _bookRepository;
        private readonly IRepository<Genre,Guid> _genreRepository;
        private readonly IRepository<GenreOnBook, Guid> _genreOnBookRepository;
        public BookAppService(IRepository<Book, Guid> repository, IRepository<Genre, Guid> genreRepository, IRepository<GenreOnBook, Guid> genreonBookRepository) : base(repository)
        {
            _bookRepository = repository;
            _genreRepository = genreRepository;
            _genreOnBookRepository = genreonBookRepository;
        }

        public override async Task<BookDto> CreateAsync(BookDto input)
        {
            var book =  ObjectMapper.Map<Book>(input);
            book = await _bookRepository.InsertAsync(book);
            CurrentUnitOfWork.SaveChanges();
            if (input.GenreIds.Any())
            {
                foreach(var genreId in input.GenreIds)
                {
                    var genre =  await _genreRepository.GetAsync(genreId);
                    var genreBook = new GenreOnBook
                    {
                        Book = book,
                        Genre = genre,
                    };
                    await _genreOnBookRepository.InsertAsync(genreBook);
                }
                CurrentUnitOfWork.SaveChanges();
            }
            return ObjectMapper.Map<BookDto>(book);
        }

        [HttpGet]
        public async Task<List<BookDto>> GetBooksByGenreAsync(Guid genreId)
        {
            var books = _genreOnBookRepository.GetAllIncluding(x => x.Genre, x => x.Book)
                .Where(x=>x.Genre.Id == genreId).Select(x=>x.Book); 
        
            return ObjectMapper.Map<List<BookDto>>(books);
        }
    }
}
