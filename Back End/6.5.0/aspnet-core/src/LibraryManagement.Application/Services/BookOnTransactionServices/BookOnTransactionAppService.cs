using Abp.Application.Services;
using Abp.Domain.Repositories;
using JetBrains.Annotations;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookOnTransactionServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookOnTransactionServices
{
    public class BookOnTransactionAppService : AsyncCrudAppService<BookOnTransaction, BookOnTransactionDto, Guid>
    {
        private readonly IRepository<BookOnTransaction, Guid> _repository;
        public BookOnTransactionAppService(IRepository<BookOnTransaction, Guid> repository) : base(repository)
        {
         _repository = repository;
        }
        public async Task<List<BookOnTransactionDto>> GetAllBookOnTransactionAsync()
        {
            var bookOnTransaction = _repository.GetAllIncluding(x => x.Transaction, y => y.Book);
            var response = ObjectMapper.Map<List<BookOnTransactionDto>>(bookOnTransaction);
            return response;
        }
        public async Task<BookOnTransactionDto> GetBookOnTransactionAsync(Guid id)
        {
            var BookOnTransaction = _repository.GetAllIncluding(x => x.Transaction, y => y.Book).FirstOrDefault(x => x.Id == id);
            var response = ObjectMapper.Map<BookOnTransactionDto>(BookOnTransaction);
            return response;
        }
    }
}
