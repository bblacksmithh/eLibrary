using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LibraryManagement.Domains.Attributes
{
    public class DiscriminatorValue : Attribute
    {
        public object Value { get; set; }
        public DiscriminatorValue(object Value)
        {
            this.Value = Value;
        }
    }
}
