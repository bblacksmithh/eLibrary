using Abp.Application.Services;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using AutoMapper;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.LibrarianServices.Dtos;
using LibraryManagement.Services.PersonServices.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.LibrarianServices
{
    public class LibrarianAppService : AsyncCrudAppService<Librarian, LibrarianDto, Guid>, ILibrarianAppService
    {
        private readonly IRepository<Librarian, Guid> _librarianRepository;
        private readonly UserManager _userManager;

        public LibrarianAppService(IRepository<Librarian, Guid> repository, UserManager userManager) : base(repository)
        {
            _librarianRepository = repository;
            _userManager = userManager;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        [AbpAllowAnonymous]
        [HttpPost]
        public async Task<LibrarianDto> CreateLibrarianAsync(LibrarianDto input)
        {
            var librarian = ObjectMapper.Map<Librarian>(input);
            librarian.User = await CreateUserAsync(input);

            librarian = await _librarianRepository.InsertAsync(librarian);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<LibrarianDto>(librarian);
        }

        [HttpGet]
        public async Task<List<LibrarianDto>> GetAllLibrarianAsync()
        {
            var librarian = await _librarianRepository.GetAllIncluding(x => x.User).ToListAsync();
            return ObjectMapper.Map<List<LibrarianDto>>(librarian);
        }


        /// <summary>
        /// 
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private async Task<User> CreateUserAsync(LibrarianDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            if (!string.IsNullOrEmpty(user.NormalizedUserName) && !string.IsNullOrEmpty(user.NormalizedEmailAddress))
                user.SetNormalizedNames();
            CheckErrors(await _userManager.CreateAsync(user, input.Password));
            CurrentUnitOfWork.SaveChanges();
            return user;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="identityResult"></param>
        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
