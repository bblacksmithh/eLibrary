using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
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

        public async Task<Transaction> CreateTransactionAsync(TransactionDto input)
        {
            Transaction transaction = new Transaction();
            transaction.Member = await _memberRepository.GetAllIncluding(x => x.User).Where(x => x.Id == input.MemberId).FirstOrDefaultAsync();
            transaction.Cost = input.Cost;
            transaction.Member.Credits -= transaction.Cost;
            if (transaction.Member.Credits < 0) throw new UserFriendlyException("You don't have enough credit");
            await _memberRepository.UpdateAsync(transaction.Member);
            transaction.Librarian = await _librarianRepository.GetAllIncluding(x=>x.User).Where(x=>x.User.Id == input.UserId).FirstOrDefaultAsync();
            transaction.ReturnDate = input.ReturnDate;
            transaction.Book = null;
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
            return transaction;
        }

        public async Task<List<TransactionOutputDto>> GetAllTransactionAsync()
        {
            var transactions = _transactionRepository.GetAllIncluding(x=>x.Librarian.User, y=>y.Member.User).ToList();
            List<TransactionOutputDto> transactionsList = new List<TransactionOutputDto>();
            foreach (var transaction in transactions)
            {
                var booksOnTransaction = _bookOnTransactionRepository.GetAllIncluding(x => x.Book, y =>y .Transaction).Where(x => x.Transaction.Id == transaction.Id).Select(x => x.Book.Title).ToList();
                var output = new TransactionOutputDto();
                output.LibrarianName = transaction.Librarian.User.UserName;
                output.MemberUsername = transaction.Member.User.UserName;
                output.BorrowDate = transaction.BorrowDate;
                output.ReturnDate = transaction.ReturnDate;
                output.BookNames = booksOnTransaction;
                output.Cost = transaction.Cost;
                output.Id = transaction.Id;
                transactionsList.Add(output);

            }
            return transactionsList;
        }

        public async Task<TransactionDto> GetTransactionAsync(Guid id)
        {
            var transaction = _transactionRepository.GetAllIncluding(x => x.Librarian, y => y.Member).FirstOrDefault(x => x.Id == id);
            var response = ObjectMapper.Map<TransactionDto>(transaction);
            return response;
        }
    }
}
