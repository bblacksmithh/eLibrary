using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.PersonServices.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.PersonServices
{
    public class PersonAppService : ApplicationService, IPersonAppService
    {
        private readonly IRepository<Person, Guid> _personRepository;
        private readonly UserManager _userManager;
 
        public PersonAppService(IRepository<Person, Guid> personRepository, UserManager userManager)
        {
            _personRepository = personRepository;
            _userManager = userManager;
        }

        [HttpPost]
        public async Task<PersonDto> CreateAsync(PersonDto input)
        {
            var person = ObjectMapper.Map<Person>(input);
            person.User = await CreateUserAsync(input);

            person = await _personRepository.InsertAsync(person);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<PersonDto>(person);
        }

        [HttpGet]
        public async Task<PersonDto> GetAsync(Guid id)
        {
            var person = _personRepository.GetAll().FirstOrDefault(x => x.Id == id);
            if (person == null)
            {
                return null;
            }
            return ObjectMapper.Map<PersonDto>(person);
        }

        [HttpGet]
        public async Task<List<PersonDto>> GetAllAsync()
        {
            var persons =   _personRepository.GetAllIncluding(x => x.User);
            if (persons == null)
            {
                return null;
            }
            return ObjectMapper.Map<List<PersonDto>>(persons);
        }

        [HttpPatch]
        public async Task<PersonDto> UpdateAsync(PersonDto input)
        {
            var person = await _personRepository.GetAsync(input.Id);
            if (person == null)
            {
                return null;
            }
            ObjectMapper.Map(input, person);
            person = await _personRepository.UpdateAsync(person);
            CurrentUnitOfWork.SaveChanges();
            return ObjectMapper.Map<PersonDto>(person);
        }

        [HttpDelete]
        public async Task DeleteAsync(Guid id)
        {
            await _personRepository.DeleteAsync(id);
        }
        /// <summary>
        /// Additional functions 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private async Task<User> CreateUserAsync(PersonDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            if (!string.IsNullOrEmpty(user.NormalizedUserName) && !string.IsNullOrEmpty(user.NormalizedEmailAddress))
                user.SetNormalizedNames();
            CheckErrors(await _userManager.CreateAsync(user, input.Password));
            CurrentUnitOfWork.SaveChanges();
            return user;
        }
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
