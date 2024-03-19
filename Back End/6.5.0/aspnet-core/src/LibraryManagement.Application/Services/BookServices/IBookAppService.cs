using Abp.Application.Services;
using LibraryManagement.Services.BookServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.BookServices
{
    public interface IBookAppService : IAsyncCrudAppService<BookDto, Guid>
    {
    }
}
