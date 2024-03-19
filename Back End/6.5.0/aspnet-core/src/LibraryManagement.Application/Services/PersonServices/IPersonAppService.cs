using Abp.Application.Services;
using LibraryManagement.Services.PersonServices.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.PersonServices
{
    public interface IPersonAppService : IApplicationService
    {
        public Task<PersonDto> CreateAsync(PersonDto input);
        public Task<PersonDto> GetAsync(Guid id);
        public Task<List<PersonDto>> GetAllAsync();
        public Task<PersonDto> UpdateAsync(PersonDto input);
        public Task DeleteAsync(Guid id);


    }
}
