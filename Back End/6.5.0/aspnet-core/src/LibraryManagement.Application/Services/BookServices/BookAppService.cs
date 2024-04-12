using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookServices.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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

        [HttpGet]
        public async Task<List<BookDto>> GetTopTwelveBooksAsync()
        {
            var books = _bookRepository.GetAll();
            var topBooks = books.OrderByDescending(x => x.Rating).Take(12).ToList();

            return ObjectMapper.Map<List<BookDto>>(topBooks);
        }

        [HttpGet]
        public async Task<List<BookDto>> GetTrendingBooksAsync()
        {
            var books = _bookRepository.GetAll();
            var topBooks = books.OrderByDescending(x => x.Rating).Take(20).ToList();

            return ObjectMapper.Map<List<BookDto>>(topBooks);
        }

        [HttpDelete]
        public async Task<BookDto> DeleteBookAsync(Guid id)
        {   
            var book = Repository.GetAll().FirstOrDefault(x => x.Id == id);
            var response = ObjectMapper.Map<BookDto>(book);
            await _genreOnBookRepository.DeleteAsync(x => x.Book.Id == id);
            await Repository.DeleteAsync(x => x.Id == id);
            return response;
        }

        [HttpGet]
        public async Task<BookDto> GetBookAsync(Guid id)
        {
            var book = _bookRepository.GetAllIncluding().FirstOrDefault(x => x.Id==id);
            var genres = _genreOnBookRepository.GetAllIncluding(x => x.Genre).Where(x=>x.Book.Id == id);
            var response = ObjectMapper.Map<BookDto>(book);
            return response;
        }

        [HttpGet]
        public async Task<List<BookDto>> SearchBooksAsync(string searchTerm)
        {
            // Assuming you want to search by book title
            var books = await _bookRepository.GetAllListAsync(x => x.Title.ToUpper().Contains(searchTerm.ToUpper()));

            return ObjectMapper.Map<List<BookDto>>(books);
        }

        [HttpGet]
        public async Task<List<BookOutputDto>> GetAllBooksAsync()
        {
            var books = await _bookRepository.GetAllListAsync();
             List<BookOutputDto> bookList = new List<BookOutputDto>();
            foreach (var book in books)
            {
                var bookGenre = _genreOnBookRepository.GetAllIncluding(x => x.Genre, y => y.Book).Where(x => x.Book.Id == book.Id).Select(x=>x.Genre).ToList();
                var bookoutput = new BookOutputDto();
                bookoutput.book = book;
                bookoutput.GenreNames = bookGenre.Select(a=>a.GenreName).ToList();

                bookList.Add(bookoutput);
            }
            return bookList;
        }
    }
}
