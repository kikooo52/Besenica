using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Besenica.Models
{
    public class Country : Entity
    {
        [Required, Column("Name")]
        [StringLength(100)]
        public virtual string Name { get; set; }

        public virtual string Hint { get; set; }
    }
}