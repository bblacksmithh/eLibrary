using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Services.MemberServices.Dto
{
    public class AddCreditsDto
    {
        public Guid MemberId { get; set; }
        public decimal Credits { get; set; }
    }
}
