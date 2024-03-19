using Abp.Application.Services;
using Abp.Domain.Repositories;
using LibraryManagement.Domains;
using LibraryManagement.Services.BookServices.Dtos;
using LibraryManagement.Services.PersonServices.Dtos;
using LibraryManagement.Services.TransactionServices.Dtos;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace LibraryManagement.Services.TransactionServices
{
    public class TransactionAppService : AsyncCrudAppService<Transaction, TransactionDto, Guid>, ITransactionAppService
    {
        private readonly IRepository<Transaction, Guid> _transactionRepository;
        private readonly IRepository<Book, Guid> _bookRepository;
        private readonly IRepository<BookOnTransaction, Guid> _bookOnTransactionRepository;
        private readonly IRepository<Member, Guid> _memberRepository;
        private readonly IRepository<Librarian, Guid> _librarianRepository;
        public TransactionAppService(IRepository<Transaction, Guid> transactionRepository, IRepository<Book, Guid> bookRepository, IRepository<BookOnTransaction, Guid> bookOnTransactionRepository,
            IRepository<Member, Guid> memberRepository, IRepository<Librarian, Guid> librarianRepository) : base(transactionRepository)
        {
            _transactionRepository = transactionRepository;
            _bookRepository = bookRepository;
            _bookOnTransactionRepository = bookOnTransactionRepository;
            _memberRepository = memberRepository;
            _librarianRepository = librarianRepository;
        }

        public async Task<TransactionDto> CreateTransactionAsync(TransactionDto input)
        {
            var transaction = ObjectMapper.Map<Transaction>(input);
            transaction.Member = await _memberRepository.GetAllIncluding(x => x.User).Where(x => x.Id == input.MemberId).FirstOrDefaultAsync();
            transaction.Librarian = await _librarianRepository.GetAllIncluding(x=>x.User).Where(x=>x.Id == input.LibrarianId).FirstOrDefaultAsync();
            transaction = await _transactionRepository.InsertAsync(transaction);
            CurrentUnitOfWork.SaveChanges();
            if (input.BookIds.Any())
            {
                foreach (var BookId in input.BookIds)
                {
                    var book = await _bookRepository.GetAsync(BookId);
                    var BookOnTransaction = new BookOnTransaction()
                    {
                        Book = book,
                        Transaction = transaction
                    };
                    await _bookOnTransactionRepository.InsertAsync(BookOnTransaction);
                }
                CurrentUnitOfWork.SaveChanges();
            }

            return ObjectMapper.Map<TransactionDto>(transaction);
        }

        public async Task<List<TransactionDto>> GetAllTransactionAsync()
        {
            var transaction = _transactionRepository.GetAllIncluding(x => x.Librarian, y => y.Member);
            var response = ObjectMapper.Map<List<TransactionDto>>(transaction);
            return response;
        }

        public async Task<TransactionDto> GetTransactionAsync(Guid id)
        {
            var transaction = _transactionRepository.GetAllIncluding(x => x.Librarian, y => y.Member).FirstOrDefault(x => x.Id == id);
            var response = ObjectMapper.Map<TransactionDto>(transaction);
            return response;
        }
    }
}
