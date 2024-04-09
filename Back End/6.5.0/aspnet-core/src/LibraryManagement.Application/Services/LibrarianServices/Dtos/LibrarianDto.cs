using Abp.Application.Services.Dto;
using AutoMapper;
using LibraryManagement.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.LibrarianServices.Dtos
{
    public class LibrarianDto : AuditedEntityDto<Guid>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string? NationalId { get; set; }
        public string? EmployeeNumber { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime? RegisterDate { get; set; }
    }
}
