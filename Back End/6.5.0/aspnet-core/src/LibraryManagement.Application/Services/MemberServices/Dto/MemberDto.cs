using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.MemberServices.Dto
{
    public class MemberDto : AuditedEntityDto<Guid>
    {
        public string FirstName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string LastName { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Email { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string? NationalId { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Username { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public DateTime? RegisterDate { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public decimal Credits { get; set; }
        
        

    }
}
