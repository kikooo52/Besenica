using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Besenica.Models
{
    public class Answer : Entity
    {
        public virtual int? CountryId { get; set; }
        public virtual Country Country { get; set; }

        
        public virtual int? AnimalId { get; set; }
        public virtual Animal Animal { get; set; }

        public virtual GameResult GameResult { get; set; }
    }
}