using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using LibraryManagement.Authorization.Users;
using LibraryManagement.Domains;
using LibraryManagement.Services.LibrarianServices.Dtos;
using LibraryManagement.Services.MemberServices.Dto;
using LibraryManagement.Services.PersonServices.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.MemberServices
{
    public class MemberAppService : AsyncCrudAppService<Member, MemberDto, Guid>
    {
        private readonly IRepository<Member, Guid> _memberRepository;
        private readonly UserManager _userManager;

        public MemberAppService(IRepository<Member, Guid> repository, UserManager userManager) : base(repository)
        {
            _memberRepository = repository;
            _userManager = userManager;

        }

        [HttpPost]
        public async Task<MemberDto> CreateMemberAsync(MemberDto input)
        {
            var member = ObjectMapper.Map<Member>(input);
            member.User = await CreateUserAsync(input);

            member = await _memberRepository.InsertAsync(member);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<MemberDto>(member);
        }

        [HttpGet]
        public async Task<List<MemberDto>> GetAllMemberAsync()
        {
            var member = await _memberRepository.GetAllIncluding(x => x.User).ToListAsync();
            return ObjectMapper.Map<List<MemberDto>>(member);
        }

        private async Task<User> CreateUserAsync(MemberDto input)
        {
            var user = ObjectMapper.Map<User>(input);
            if (!string.IsNullOrEmpty(user.NormalizedUserName) && !string.IsNullOrEmpty(user.NormalizedEmailAddress))
                user.SetNormalizedNames();
            CheckErrors(await _userManager.CreateAsync(user, input.Password));
            CurrentUnitOfWork.SaveChanges();
            return user;
        }

        public async Task<Member> AddCreditsAsync(AddCreditsDto input)
        {
            var member = _memberRepository.GetAll().Where(x => x.Id == input.MemberId).FirstOrDefault();
            member.Credits += input.Credits;
            await _memberRepository.UpdateAsync(member);

            return member;
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
